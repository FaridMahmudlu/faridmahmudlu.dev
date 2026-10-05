import workerUrl from './formations.worker.ts?worker&url';
import { FORMATIONS, type FormationId } from './ids';
import { FRAG, VERT } from './shaders';

export type Tier = 'high' | 'mid' | 'low';

export interface SignalOptions {
  tier: Tier;
  reducedMotion: boolean;
  /** Formation visible on load; generated first so the first frame comes early. */
  first: number;
  /** Called once the first formation is on the GPU. */
  onReady?: () => void;
}

type TrustedTypesWindow = Window & {
  trustedTypes?: { createPolicy(name: string, rules: { createScriptURL(url: string): string }): { createScriptURL(url: string): string } };
};

/**
 * The CSP enforces Trusted Types, so a Worker URL must come from a policy.
 * This policy (allow-listed in the CSP as `signal-worker`) only accepts
 * same-origin script URLs.
 */
function workerScriptUrl(url: string): string {
  const tt = (window as TrustedTypesWindow).trustedTypes;
  if (!tt) return url;
  const policy = tt.createPolicy('signal-worker', {
    createScriptURL(input) {
      const resolved = new URL(input, location.href);
      if (resolved.origin !== location.origin) throw new TypeError('blocked cross-origin worker');
      return resolved.href;
    },
  });
  return policy.createScriptURL(url);
}

async function generateFormations(n: number, first: number, deliver: (f: number, data: Float32Array) => void) {
  try {
    const worker = new Worker(workerScriptUrl(workerUrl));
    let received = 0;
    worker.onmessage = (e: MessageEvent<{ f: number; data: Float32Array }>) => {
      deliver(e.data.f, e.data.data);
      if (++received === FORMATIONS.length) worker.terminate();
    };
    worker.postMessage({ n, first });
  } catch {
    // Workers unavailable: build on the main thread, yielding between formations.
    const { buildFormation } = await import('./formations');
    const order = [first, ...FORMATIONS.map((_, i) => i).filter((i) => i !== first)];
    for (const f of order) {
      deliver(f, buildFormation(f, n));
      await new Promise((r) => setTimeout(r, 0));
    }
  }
}

export interface SignalEngine {
  /** Scroll state: blend from formation `from` to `to` by `mix` (0..1). */
  setStage(from: number, to: number, mix: number): void;
  /** Pointer in normalised device coordinates; `active` fades the effect in/out. */
  setPointer(x: number, y: number, active: boolean): void;
  setMotion(enabled: boolean): void;
  /** Draws one frame. Returns false when nothing needed to be drawn. */
  frame(timeMs: number): boolean;
  dispose(): void;
}

const PARTICLES: Record<Tier, number> = { high: 32768, mid: 20480, low: 12288 };
const TEX_WIDTH = 256;
const CAM_Z = 7;
const FOV = (35 * Math.PI) / 180;

/** Placement of each formation in the viewport. x is a fraction of the visible half-width. */
interface Placement {
  x: number;
  y: number;
  rx: number;
  ry: number;
  spin: number;
  sway: number;
  scale: number;
  bright: number;
}

const P = (x: number, y: number, rx: number, ry: number, spin: number, sway: number, scale: number, bright = 1): Placement => ({
  x, y, rx, ry, spin, sway, scale, bright,
});

const WIDE: Record<FormationId, Placement> = {
  core: P(0.4, 0.26, 0.28, 0, 0.07, 0, 0.76),
  wave: P(0.5, 0, 0, 0, 0.18, 0, 1.0, 0.9),
  data: P(0.5, 0.16, 0.22, -0.45, 0, 0.18, 0.88),
  auth: P(0.52, 0.16, 0.25, 0, 0.11, 0, 0.86),
  backend: P(0.52, 0.14, 0.5, 0.7, 0.05, 0, 0.86),
  interface: P(0.49, 0.17, 0.08, -0.3, 0, 0.22, 0.82),
  ai: P(0.53, 0.17, 0.06, -0.25, 0, 0.3, 0.92),
  production: P(0.5, 0.14, 0.42, 0, 0.09, 0, 0.88),
  field: P(0, 0, 0, 0, 0.012, 0, 1, 0.5),
  point: P(0.42, 0.18, 0, 0, 0, 0.1, 1.0),
};

/** Portrait / small screens: formations sit in the upper-middle "stage" and scale with width. */
const NARROW: Record<FormationId, Placement> = {
  core: P(0, 0.24, 0.28, 0, 0.07, 0, 0.7, 0.85),
  wave: P(0, 0.3, 0, 0, 0.18, 0, 0.9, 0.85),
  data: P(0, 0.36, 0.22, -0.3, 0, 0.15, 0.82),
  auth: P(0, 0.36, 0.25, 0, 0.11, 0, 0.84),
  backend: P(0, 0.34, 0.5, 0.7, 0.05, 0, 0.82),
  interface: P(0, 0.36, 0.08, -0.15, 0, 0.18, 0.74),
  ai: P(0, 0.34, 0.06, -0.2, 0, 0.25, 0.88),
  production: P(0, 0.34, 0.42, 0, 0.09, 0, 0.86),
  field: P(0, 0, 0, 0, 0.012, 0, 1, 0.45),
  point: P(0, 0.3, 0, 0, 0, 0.1, 0.9),
};

/* ───────────── Minimal column-major mat4 helpers ───────────── */
type M4 = Float32Array;

function perspective(out: M4, fovy: number, aspect: number, near: number, far: number) {
  const f = 1 / Math.tan(fovy / 2);
  const nf = 1 / (near - far);
  out.fill(0);
  out[0] = f / aspect;
  out[5] = f;
  out[10] = (far + near) * nf;
  out[11] = -1;
  out[14] = 2 * far * near * nf;
}

/** Model matrix = T(x,y,0) · Ry(ry) · Rx(rx) · S(s) */
function model(out: M4, x: number, y: number, rx: number, ry: number, s: number) {
  const cx = Math.cos(rx), sx = Math.sin(rx);
  const cy = Math.cos(ry), sy = Math.sin(ry);
  out[0] = cy * s; out[1] = 0; out[2] = -sy * s; out[3] = 0;
  out[4] = sy * sx * s; out[5] = cx * s; out[6] = cy * sx * s; out[7] = 0;
  out[8] = sy * cx * s; out[9] = -sx * s; out[10] = cy * cx * s; out[11] = 0;
  out[12] = x; out[13] = y; out[14] = 0; out[15] = 1;
}

function view(out: M4, ex: number, ey: number) {
  // Camera at (ex, ey, CAM_Z) looking at the origin (small-angle parallax: translation only).
  out.fill(0);
  out[0] = 1; out[5] = 1; out[10] = 1; out[15] = 1;
  out[12] = -ex; out[13] = -ey; out[14] = -CAM_Z;
}

function compile(gl: WebGL2RenderingContext, type: number, src: string) {
  const sh = gl.createShader(type)!;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS) && !gl.isContextLost()) {
    throw new Error(gl.getShaderInfoLog(sh) ?? 'shader compile error');
  }
  return sh;
}

export function createSignal(canvas: HTMLCanvasElement, opts: SignalOptions): SignalEngine | null {
  const gl = canvas.getContext('webgl2', {
    alpha: true,
    antialias: false,
    depth: false,
    stencil: false,
    premultipliedAlpha: true,
    preserveDrawingBuffer: false,
    powerPreference: opts.tier === 'high' ? 'high-performance' : 'default',
  });
  if (!gl) return null;

  const n = PARTICLES[opts.tier];
  const rows = n / TEX_WIDTH;
  const maxTex = gl.getParameter(gl.MAX_TEXTURE_SIZE) as number;
  if (rows * FORMATIONS.length > maxTex) return null;

  let program: WebGLProgram;
  let vao: WebGLVertexArrayObject;
  let texture: WebGLTexture;
  let loc: Record<string, WebGLUniformLocation | null> = {};
  let lost = false;

  /** Formation buffers kept CPU-side so a lost WebGL context can be restored. */
  const formations = new Map<number, Float32Array>();
  const rand = new Float32Array(n * 4);
  for (let i = 0; i < rand.length; i++) rand[i] = Math.random();

  function init() {
    program = gl!.createProgram()!;
    gl!.attachShader(program, compile(gl!, gl!.VERTEX_SHADER, VERT));
    gl!.attachShader(program, compile(gl!, gl!.FRAGMENT_SHADER, FRAG));
    gl!.linkProgram(program);
    if (!gl!.getProgramParameter(program, gl!.LINK_STATUS) && !gl!.isContextLost()) {
      throw new Error(gl!.getProgramInfoLog(program) ?? 'program link error');
    }
    gl!.useProgram(program);

    const names = [
      'uData', 'uWidth', 'uRows', 'uFrom', 'uTo', 'uMix', 'uTime', 'uFlow', 'uDrift', 'uProj', 'uView',
      'uModelA', 'uModelB', 'uBrightA', 'uBrightB', 'uPointer', 'uAspect', 'uSize', 'uFocus',
    ];
    loc = Object.fromEntries(names.map((nm) => [nm, gl!.getUniformLocation(program, nm)]));

    vao = gl!.createVertexArray()!;
    gl!.bindVertexArray(vao);
    const buf = gl!.createBuffer();
    gl!.bindBuffer(gl!.ARRAY_BUFFER, buf);
    gl!.bufferData(gl!.ARRAY_BUFFER, rand, gl!.STATIC_DRAW);
    const aRand = gl!.getAttribLocation(program, 'aRand');
    gl!.enableVertexAttribArray(aRand);
    gl!.vertexAttribPointer(aRand, 4, gl!.FLOAT, false, 0, 0);

    texture = gl!.createTexture()!;
    gl!.activeTexture(gl!.TEXTURE0);
    gl!.bindTexture(gl!.TEXTURE_2D, texture);
    gl!.pixelStorei(gl!.UNPACK_ALIGNMENT, 1);
    gl!.texImage2D(gl!.TEXTURE_2D, 0, gl!.RGBA32F, TEX_WIDTH, rows * FORMATIONS.length, 0, gl!.RGBA, gl!.FLOAT, null);
    for (const [f, data] of formations) upload(f, data);
    gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MIN_FILTER, gl!.NEAREST);
    gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MAG_FILTER, gl!.NEAREST);
    gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_S, gl!.CLAMP_TO_EDGE);
    gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_T, gl!.CLAMP_TO_EDGE);

    gl!.uniform1i(loc.uData!, 0);
    gl!.uniform1i(loc.uWidth!, TEX_WIDTH);
    gl!.uniform1i(loc.uRows!, rows);
    gl!.uniform1f(loc.uFocus!, CAM_Z);

    gl!.disable(gl!.DEPTH_TEST);
    gl!.enable(gl!.BLEND);
    gl!.blendFunc(gl!.ONE, gl!.ONE);
    gl!.clearColor(0, 0, 0, 0);
  }

  function upload(f: number, data: Float32Array) {
    gl!.bindTexture(gl!.TEXTURE_2D, texture);
    gl!.texSubImage2D(gl!.TEXTURE_2D, 0, 0, f * rows, TEX_WIDTH, rows, gl!.RGBA, gl!.FLOAT, data);
  }

  init();

  void generateFormations(n, opts.first, (f, data) => {
    formations.set(f, data);
    if (!lost) upload(f, data);
    dirty = true;
    if (formations.size === 1) opts.onReady?.();
  });

  /* ───────────── State ───────────── */
  const proj = new Float32Array(16);
  const viewM = new Float32Array(16);
  const modelA = new Float32Array(16);
  const modelB = new Float32Array(16);

  let motion = !opts.reducedMotion;
  let from = 0, to = 0, mix = 0;
  let dirty = true;
  let width = 0, aspect = 1, halfW = 1;
  let dprCap = opts.tier === 'low' ? 1.5 : 2;
  let dpr = 1;
  let drawCount = n;
  const pointer = { x: 0, y: 0, tx: 0, ty: 0, strength: 0, target: 0 };
  let clock = 0;
  let lastTime = -1;
  let slowFrames = 0;
  let sampled = 0;

  function resize() {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    dpr = Math.min(window.devicePixelRatio || 1, dprCap);
    const pw = Math.max(1, Math.round(w * dpr));
    const ph = Math.max(1, Math.round(h * dpr));
    if (pw !== canvas.width || ph !== canvas.height) {
      canvas.width = pw;
      canvas.height = ph;
    }
    width = w;
    aspect = w / Math.max(1, h);
    halfW = Math.tan(FOV / 2) * CAM_Z * aspect;
    perspective(proj, FOV, aspect, 0.1, 60);
    gl!.viewport(0, 0, pw, ph);
    dirty = true;
  }

  const ro = new ResizeObserver(resize);
  ro.observe(canvas);
  resize();

  const onLost = (e: Event) => {
    e.preventDefault();
    lost = true;
  };
  const onRestored = () => {
    init();
    resize();
    lost = false;
    dirty = true;
  };
  canvas.addEventListener('webglcontextlost', onLost);
  canvas.addEventListener('webglcontextrestored', onRestored);

  const isWide = () => aspect >= 1.15 && width >= 900;

  const applyPlacement = (out: M4, f: number, t: number) => {
    const id = FORMATIONS[f]!;
    const wide = isWide();
    const p = (wide ? WIDE : NARROW)[id];
    // On narrow viewports, shrink formations so they fit the visible width.
    const fit = wide || id === 'field' ? 1 : Math.min(1, Math.max(0.42, halfW / 1.75));
    const ry = p.ry + (motion ? p.spin * t + p.sway * Math.sin(t * 0.35) : 0);
    model(out, p.x * halfW, p.y * 2.2, p.rx, ry, p.scale * fit);
    return p.bright;
  };

  return {
    setStage(f, t, m) {
      const snapped = opts.reducedMotion ? (m < 0.5 ? 0 : 1) : m;
      if (f !== from || t !== to || Math.abs(snapped - mix) > 1e-4) {
        from = f;
        to = t;
        mix = snapped;
        dirty = true;
      }
    },
    setPointer(x, y, active) {
      pointer.tx = x;
      pointer.ty = y;
      pointer.target = active && motion ? 1 : 0;
    },
    setMotion(enabled) {
      motion = enabled && !opts.reducedMotion;
      if (!motion) pointer.target = 0;
      dirty = true;
    },
    frame(timeMs) {
      if (lost) return false;
      const dt = lastTime < 0 ? 16 : Math.min(64, timeMs - lastTime);
      lastTime = timeMs;
      if (motion) clock += dt / 1000;

      // The pointer field swells while the cursor moves and settles when it rests.
      const moved = Math.hypot(pointer.tx - pointer.x, pointer.ty - pointer.y);
      pointer.x += (pointer.tx - pointer.x) * 0.1;
      pointer.y += (pointer.ty - pointer.y) * 0.1;
      const goal = pointer.target * Math.min(1, 0.35 + moved * 18);
      pointer.strength += (goal - pointer.strength) * 0.05;
      const pointerMoving = pointer.strength > 0.002;

      if (!motion && !dirty && !pointerMoving) return false;
      if (formations.size === 0) return false;

      // Formations still being generated fall back to one that is ready.
      const fallback = formations.has(opts.first) ? opts.first : formations.keys().next().value!;
      const fA = formations.has(from) ? from : fallback;
      const fB = formations.has(to) ? to : fA;

      // Adaptive quality: if frames stay slow, lower resolution, then particle count.
      if (motion && sampled < 240) {
        sampled++;
        if (dt > 24) slowFrames++;
        if (sampled % 60 === 0) {
          if (slowFrames > 30) {
            if (dprCap > 1) {
              dprCap = Math.max(1, dprCap - 0.5);
              resize();
            } else {
              drawCount = Math.max(4096, Math.floor(drawCount * 0.7));
            }
          }
          slowFrames = 0;
        }
      }

      const brightA = applyPlacement(modelA, fA, clock);
      const brightB = applyPlacement(modelB, fB, clock);
      view(viewM, pointer.x * 0.18 * pointer.strength, pointer.y * 0.12 * pointer.strength);

      gl!.useProgram(program);
      gl!.bindVertexArray(vao);
      gl!.uniformMatrix4fv(loc.uProj!, false, proj);
      gl!.uniformMatrix4fv(loc.uView!, false, viewM);
      gl!.uniformMatrix4fv(loc.uModelA!, false, modelA);
      gl!.uniformMatrix4fv(loc.uModelB!, false, modelB);
      gl!.uniform1i(loc.uFrom!, fA);
      gl!.uniform1i(loc.uTo!, fB);
      gl!.uniform1f(loc.uMix!, mix);
      gl!.uniform1f(loc.uTime!, clock);
      gl!.uniform1f(loc.uFlow!, opts.reducedMotion ? 0 : 1);
      gl!.uniform1f(loc.uDrift!, motion ? 1 : 0);
      gl!.uniform1f(loc.uBrightA!, brightA);
      gl!.uniform1f(loc.uBrightB!, brightB);
      gl!.uniform3f(loc.uPointer!, pointer.x, pointer.y, pointer.strength);
      gl!.uniform1f(loc.uAspect!, aspect);
      gl!.uniform1f(loc.uSize!, (width < 700 ? 1.9 : 2.1) * dpr);

      gl!.clear(gl!.COLOR_BUFFER_BIT);
      gl!.drawArrays(gl!.POINTS, 0, drawCount);
      dirty = false;
      return true;
    },
    dispose() {
      ro.disconnect();
      canvas.removeEventListener('webglcontextlost', onLost);
      canvas.removeEventListener('webglcontextrestored', onRestored);
      gl!.getExtension('WEBGL_lose_context')?.loseContext();
    },
  };
}
