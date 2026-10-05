/**
 * Procedural particle formations — one per chapter of the story.
 * Every formation writes N particles as (x, y, z, emphasis) into a shared
 * Float32Array that is uploaded once to the GPU as an RGBA32F texture.
 * Emphasis (0..1) tints a particle towards the signal colour.
 */

import { FORMATIONS, type FormationId } from './ids';

type Vec3 = [number, number, number];
type Emit = (x: number, y: number, z: number, w: number) => void;
type Rand = () => number;

export function mulberry32(seed: number): Rand {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const TAU = Math.PI * 2;

const gauss = (r: Rand) => {
  const u = 1 - r();
  const v = r();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(TAU * v);
};

const onSphere = (r: Rand, radius: number): Vec3 => {
  const u = r() * 2 - 1;
  const th = r() * TAU;
  const s = Math.sqrt(1 - u * u);
  return [s * Math.cos(th) * radius, u * radius, s * Math.sin(th) * radius];
};

const inBall = (r: Rand, radius: number): Vec3 => onSphere(r, radius * Math.cbrt(r()));

const rotX = ([x, y, z]: Vec3, a: number): Vec3 => [x, y * Math.cos(a) - z * Math.sin(a), y * Math.sin(a) + z * Math.cos(a)];
const rotY = ([x, y, z]: Vec3, a: number): Vec3 => [x * Math.cos(a) + z * Math.sin(a), y, -x * Math.sin(a) + z * Math.cos(a)];
const rotZ = ([x, y, z]: Vec3, a: number): Vec3 => [x * Math.cos(a) - y * Math.sin(a), x * Math.sin(a) + y * Math.cos(a), z];

const lerp3 = (a: Vec3, b: Vec3, t: number): Vec3 => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];

const bezier = (p0: Vec3, p1: Vec3, p2: Vec3, p3: Vec3, t: number): Vec3 => {
  const it = 1 - t;
  const a = it * it * it;
  const b = 3 * it * it * t;
  const c = 3 * it * t * t;
  const d = t * t * t;
  return [
    a * p0[0] + b * p1[0] + c * p2[0] + d * p3[0],
    a * p0[1] + b * p1[1] + c * p2[1] + d * p3[1],
    a * p0[2] + b * p1[2] + c * p2[2] + d * p3[2],
  ];
};

/** Pick a part index from cumulative weights. */
const pick = (r: Rand, weights: number[]) => {
  let u = r() * weights.reduce((s, w) => s + w, 0);
  for (let i = 0; i < weights.length; i++) {
    u -= weights[i]!;
    if (u <= 0) return i;
  }
  return weights.length - 1;
};

const jitter = (r: Rand, p: Vec3, s: number): Vec3 => [p[0] + gauss(r) * s, p[1] + gauss(r) * s, p[2] + gauss(r) * s];

/* ───────────────────────── Formations ───────────────────────── */

/** Hero: a transmitter — dense shell, core, and tilted orbit rings. */
function core(emit: Emit, n: number, r: Rand) {
  const rings = [
    { radius: 1.42, tilt: [1.22, 0.3, 0] as Vec3, w: 1 },
    { radius: 1.62, tilt: [1.75, -0.55, 0.2] as Vec3, w: 0.12 },
    { radius: 1.86, tilt: [1.4, 0.95, -0.15] as Vec3, w: 0.12 },
  ];
  for (let i = 0; i < n; i++) {
    const part = pick(r, [50, 12, 30, 8]);
    if (part === 0) {
      const p = onSphere(r, 1 + gauss(r) * 0.018);
      emit(p[0], p[1], p[2], r() < 0.03 ? 1 : 0);
    } else if (part === 1) {
      const p = inBall(r, 0.6);
      emit(p[0], p[1], p[2], 0.25);
    } else if (part === 2) {
      const ring = rings[Math.floor(r() * rings.length)]!;
      const a = r() * TAU;
      let p: Vec3 = [Math.cos(a) * ring.radius, gauss(r) * 0.012, Math.sin(a) * ring.radius];
      p = rotZ(rotY(rotX(p, ring.tilt[0]), ring.tilt[1]), ring.tilt[2]);
      emit(p[0], p[1], p[2], ring.w);
    } else {
      const p = inBall(r, 2.6);
      emit(p[0], p[1], p[2], 0);
    }
  }
}

/** Origin: a vertical carrier signal with braided strands — the path downward. */
function wave(emit: Emit, n: number, r: Rand) {
  const strands = 5;
  for (let i = 0; i < n; i++) {
    const part = pick(r, [64, 22, 14]);
    const y = (r() * 2 - 1) * 2.7;
    if (part === 0) {
      const s = Math.floor(r() * strands);
      const phase = (s / strands) * TAU;
      const amp = 0.32 + 0.22 * Math.sin(y * 0.9 + s);
      const k = 2.4;
      const x = Math.sin(y * k + phase) * amp + gauss(r) * 0.012;
      const z = Math.cos(y * k + phase) * amp * 0.7 + gauss(r) * 0.012;
      emit(x, y, z, 0.05);
    } else if (part === 1) {
      const packet = (y * 1.6 + 10) % 1 < 0.14;
      emit(gauss(r) * 0.01, y, gauss(r) * 0.01, packet ? 1 : 0.35);
    } else {
      const p: Vec3 = [gauss(r) * 0.55, y, gauss(r) * 0.55];
      emit(p[0], p[1], p[2], 0);
    }
  }
}

/** L01 Data: three tables floating in space, joined by relation curves. */
function data(emit: Emit, n: number, r: Rand) {
  const tables = [
    { c: [-0.85, 0.5, 0.25] as Vec3, w: 1.15, rows: 6, ry: 0.18 },
    { c: [0.8, 0.95, -0.45] as Vec3, w: 1.0, rows: 5, ry: -0.22 },
    { c: [0.45, -0.75, 0.4] as Vec3, w: 1.25, rows: 7, ry: 0.08 },
  ];
  const rowH = 0.16;
  const tablePoint = (ti: number, u: number, v: number): Vec3 => {
    const t = tables[ti]!;
    const local: Vec3 = [(u - 0.5) * t.w, -v * rowH * t.rows + (rowH * t.rows) / 2, 0];
    const p = rotY(local, t.ry);
    return [p[0] + t.c[0], p[1] + t.c[1], p[2] + t.c[2]];
  };
  const relations: [number, number, number, number][] = [
    [0, 2, 1, 3],
    [0, 4, 2, 1],
    [1, 4, 2, 5],
  ];
  for (let i = 0; i < n; i++) {
    const part = pick(r, [70, 20, 10]);
    if (part === 0) {
      const ti = Math.floor(r() * tables.length);
      const t = tables[ti]!;
      const kind = pick(r, [22, 50, 20, 8]);
      if (kind === 0) {
        // header band, densely filled
        const p = tablePoint(ti, r(), r() * 0.9 / t.rows);
        emit(p[0], p[1], p[2] + gauss(r) * 0.01, 0.45);
      } else if (kind === 1) {
        // row separators
        const row = 1 + Math.floor(r() * t.rows);
        const p = tablePoint(ti, r(), row / t.rows);
        emit(p[0], p[1], p[2], 0);
      } else if (kind === 2) {
        // side borders
        const p = tablePoint(ti, r() < 0.5 ? 0 : 1, r());
        emit(p[0], p[1], p[2], 0);
      } else {
        // primary-key column markers
        const row = Math.floor(r() * t.rows);
        const p = tablePoint(ti, 0.08, (row + 0.5) / t.rows);
        const q = jitter(r, p, 0.012);
        emit(q[0], q[1], q[2], 0.9);
      }
    } else if (part === 1) {
      const [a, ra, b, rb] = relations[Math.floor(r() * relations.length)]!;
      const ta = tables[a]!;
      const tb = tables[b]!;
      const p0 = tablePoint(a, 1, (ra + 0.5) / ta.rows);
      const p3 = tablePoint(b, 0, (rb + 0.5) / tb.rows);
      const p1: Vec3 = [p0[0] + 0.7, p0[1], p0[2] + 0.2];
      const p2: Vec3 = [p3[0] - 0.7, p3[1], p3[2] + 0.2];
      const p = bezier(p0, p1, p2, p3, r());
      emit(p[0] + gauss(r) * 0.006, p[1] + gauss(r) * 0.006, p[2], 1);
    } else {
      const p = inBall(r, 2.4);
      emit(p[0], p[1], p[2], 0);
    }
  }
}

/** L02 Auth: an armillary lock — protected core inside interlocking rings. */
function auth(emit: Emit, n: number, r: Rand) {
  const rings = [
    { radius: 1.08, tilt: [Math.PI / 2, 0, 0] as Vec3 },
    { radius: 1.08, tilt: [Math.PI / 2, Math.PI / 2, 0] as Vec3 },
    { radius: 1.08, tilt: [0, 0, 0] as Vec3 },
    { radius: 1.42, tilt: [1.1, 0.6, 0.4] as Vec3 },
    { radius: 1.42, tilt: [2.0, -0.6, -0.4] as Vec3 },
  ];
  for (let i = 0; i < n; i++) {
    const part = pick(r, [14, 8, 58, 14, 6]);
    if (part === 0) {
      const p = inBall(r, 0.36);
      emit(p[0], p[1], p[2], 1);
    } else if (part === 1) {
      const p = onSphere(r, 0.62);
      emit(p[0], p[1], p[2], 0.2);
    } else if (part === 2) {
      const ring = rings[Math.floor(r() * rings.length)]!;
      const a = r() * TAU;
      const band = (r() - 0.5) * 0.07;
      let p: Vec3 = [Math.cos(a) * (ring.radius + band * 0.3), band, Math.sin(a) * (ring.radius + band * 0.3)];
      p = rotZ(rotY(rotX(p, ring.tilt[0]), ring.tilt[1]), ring.tilt[2]);
      const tick = Math.abs(((a / TAU) * 24) % 1) < 0.06;
      emit(p[0], p[1], p[2], tick ? 0.8 : 0.04);
    } else if (part === 3) {
      const p = onSphere(r, 1.85);
      emit(p[0], p[1], p[2], 0);
    } else {
      const p = inBall(r, 2.6);
      emit(p[0], p[1], p[2], 0);
    }
  }
}

/** L03 Backend: a rack of service slabs with request streams running through. */
function backend(emit: Emit, n: number, r: Rand) {
  const levels = 5;
  const size = 1.75;
  const gap = 0.46;
  const streams: [number, number][] = Array.from({ length: 7 }, (_, k) => {
    const rr = mulberry32(900 + k);
    return [(rr() - 0.5) * size * 0.8, (rr() - 0.5) * size * 0.8];
  });
  for (let i = 0; i < n; i++) {
    const part = pick(r, [78, 16, 6]);
    if (part === 0) {
      const lv = Math.floor(r() * levels);
      const y = (lv - (levels - 1) / 2) * gap;
      const kind = pick(r, [52, 34, 14]);
      if (kind === 0) {
        const g = 22;
        const gx = (Math.floor(r() * (g + 1)) / g - 0.5) * size;
        const gz = (r() - 0.5) * size;
        const swap = r() < 0.5;
        emit(swap ? gx : gz, y, swap ? gz : gx, 0);
      } else if (kind === 1) {
        const t = r() * 4;
        const side = Math.floor(t);
        const u = (t - side - 0.5) * size;
        const h = size / 2;
        const p: Vec3 = side === 0 ? [u, y, -h] : side === 1 ? [h, y, u] : side === 2 ? [-u, y, h] : [-h, y, -u];
        emit(p[0], p[1] + gauss(r) * 0.006, p[2], 0.15);
      } else {
        const [sx, sz] = streams[Math.floor(r() * streams.length)]!;
        const p = jitter(r, [sx, y, sz], 0.03);
        emit(p[0], p[1], p[2], 0.85);
      }
    } else if (part === 1) {
      const [sx, sz] = streams[Math.floor(r() * streams.length)]!;
      const y = (r() - 0.5) * (levels - 1) * gap * 1.25;
      emit(sx + gauss(r) * 0.008, y, sz + gauss(r) * 0.008, 1);
    } else {
      const p = inBall(r, 2.5);
      emit(p[0], p[1], p[2], 0);
    }
  }
}

/** Rounded-rectangle outline point (u in 0..1 along the perimeter). */
function roundRect(u: number, w: number, h: number, rad: number): [number, number] {
  const straightW = w - 2 * rad;
  const straightH = h - 2 * rad;
  const arc = (Math.PI / 2) * rad;
  const total = 2 * straightW + 2 * straightH + 4 * arc;
  let d = u * total;
  const segs: [number, (t: number) => [number, number]][] = [
    [straightW, (t) => [-w / 2 + rad + t, h / 2]],
    [arc, (t) => { const a = Math.PI / 2 - t / rad; return [w / 2 - rad + Math.cos(a) * rad, h / 2 - rad + Math.sin(a) * rad]; }],
    [straightH, (t) => [w / 2, h / 2 - rad - t]],
    [arc, (t) => { const a = -t / rad; return [w / 2 - rad + Math.cos(a) * rad, -h / 2 + rad + Math.sin(a) * rad]; }],
    [straightW, (t) => [w / 2 - rad - t, -h / 2]],
    [arc, (t) => { const a = -Math.PI / 2 - t / rad; return [-w / 2 + rad + Math.cos(a) * rad, -h / 2 + rad + Math.sin(a) * rad]; }],
    [straightH, (t) => [-w / 2, -h / 2 + rad + t]],
    [arc, (t) => { const a = Math.PI - t / rad; return [-w / 2 + rad + Math.cos(a) * rad, h / 2 - rad + Math.sin(a) * rad]; }],
  ];
  for (const [len, fn] of segs) {
    if (d <= len) return fn(d);
    d -= len;
  }
  return [-w / 2 + rad, h / 2];
}

/** L04 Interface: a browser window and a phone, drawn in light. */
function iface(emit: Emit, n: number, r: Rand) {
  const browser = { c: [-0.42, 0.18, -0.25] as Vec3, w: 2.2, h: 1.45, ry: 0.12 };
  const phone = { c: [1.12, -0.32, 0.42] as Vec3, w: 0.74, h: 1.48, ry: -0.18 };
  const place = (o: { c: Vec3; ry: number }, x: number, y: number, z = 0): Vec3 => {
    const p = rotY([x, y, z], o.ry);
    return [p[0] + o.c[0], p[1] + o.c[1], p[2] + o.c[2]];
  };
  const fillRect = (o: { c: Vec3; ry: number }, x0: number, y0: number, x1: number, y1: number) =>
    place(o, x0 + (x1 - x0) * r(), y0 + (y1 - y0) * r());
  for (let i = 0; i < n; i++) {
    const part = pick(r, [56, 36, 8]);
    if (part === 0) {
      const { w, h } = browser;
      const kind = pick(r, [26, 8, 4, 22, 24, 16]);
      let p: Vec3;
      let e = 0;
      if (kind === 0) {
        const [x, y] = roundRect(r(), w, h, 0.06);
        p = place(browser, x, y);
      } else if (kind === 1) {
        p = place(browser, (r() - 0.5) * w, h / 2 - 0.16);
      } else if (kind === 2) {
        const dot = Math.floor(r() * 3);
        p = jitter(r, place(browser, -w / 2 + 0.12 + dot * 0.09, h / 2 - 0.08), 0.012);
        e = dot === 0 ? 1 : 0.3;
      } else if (kind === 3) {
        p = fillRect(browser, -w / 2 + 0.12, 0.05, w / 2 - 0.12, h / 2 - 0.28);
        e = 0.05;
      } else if (kind === 4) {
        const card = Math.floor(r() * 3);
        const cw = (w - 0.24 - 0.2) / 3;
        const x0 = -w / 2 + 0.12 + card * (cw + 0.1);
        const [x, y] = roundRect(r(), cw, 0.5, 0.03);
        p = place(browser, x0 + cw / 2 + x, -0.32 + y);
      } else {
        const line = Math.floor(r() * 3);
        p = place(browser, -w / 2 + 0.16 + r() * (0.9 - line * 0.25), -0.02 - line * 0.07);
      }
      emit(p[0], p[1], p[2], e);
    } else if (part === 1) {
      const { w, h } = phone;
      const kind = pick(r, [34, 6, 20, 18, 14, 8]);
      let p: Vec3;
      let e = 0;
      if (kind === 0) {
        const [x, y] = roundRect(r(), w, h, 0.11);
        p = place(phone, x, y);
      } else if (kind === 1) {
        p = jitter(r, place(phone, (r() - 0.5) * 0.2, h / 2 - 0.07), 0.006);
      } else if (kind === 2) {
        p = fillRect(phone, -w / 2 + 0.07, 0.15, w / 2 - 0.07, h / 2 - 0.16);
        e = 0.05;
      } else if (kind === 3) {
        const row = Math.floor(r() * 4);
        const [x, y] = roundRect(r(), w - 0.14, 0.13, 0.02);
        p = place(phone, x, -0.02 - row * 0.17 + y);
      } else if (kind === 4) {
        p = fillRect(phone, -w / 2 + 0.07, -h / 2 + 0.08, w / 2 - 0.07, -h / 2 + 0.2);
        e = 1;
      } else {
        p = place(phone, (r() - 0.5) * 0.24, -h / 2 + 0.035);
      }
      emit(p[0], p[1], p[2], e);
    } else {
      const p = inBall(r, 2.5);
      emit(p[0], p[1], p[2], 0);
    }
  }
}

/** MediaPipe hand topology: 21 landmarks and their connections. */
const HAND: Vec3[] = [
  [0, -1.05, 0],
  [-0.36, -0.78, 0.08], [-0.62, -0.5, 0.16], [-0.8, -0.22, 0.22], [-0.95, 0.04, 0.26],
  [-0.3, -0.02, 0.02], [-0.36, 0.42, 0.06], [-0.39, 0.7, 0.12], [-0.41, 0.94, 0.18],
  [-0.02, 0.04, 0], [-0.03, 0.54, 0.04], [-0.04, 0.84, 0.1], [-0.05, 1.1, 0.16],
  [0.25, 0, 0], [0.29, 0.46, 0.04], [0.32, 0.73, 0.1], [0.34, 0.95, 0.16],
  [0.48, -0.12, 0], [0.58, 0.22, 0.05], [0.64, 0.43, 0.1], [0.68, 0.62, 0.15],
];
const BONES: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4],
  [0, 5], [5, 6], [6, 7], [7, 8],
  [5, 9], [9, 10], [10, 11], [11, 12],
  [9, 13], [13, 14], [14, 15], [15, 16],
  [13, 17], [0, 17], [17, 18], [18, 19], [19, 20],
];
const FINGER_BONES = BONES.filter(([a, b]) => !(a === 0 || (a === 5 && b === 9) || (a === 9 && b === 13) || (a === 13 && b === 17)));
const PALM: [number, number, number][] = [
  [0, 1, 5],
  [0, 5, 9],
  [0, 9, 13],
  [0, 13, 17],
];

const boneLen = ([a, b]: [number, number]) => {
  const p = HAND[a]!;
  const q = HAND[b]!;
  return Math.hypot(p[0] - q[0], p[1] - q[1], p[2] - q[2]);
};

/** L05 Intelligence: a tracked hand — volume, skeleton and landmarks. */
function ai(emit: Emit, n: number, r: Rand) {
  const fingerWeights = FINGER_BONES.map(boneLen);
  const boneWeights = BONES.map(boneLen);
  const perpendicular = (dir: Vec3): [Vec3, Vec3] => {
    const up: Vec3 = Math.abs(dir[1]) < 0.9 ? [0, 1, 0] : [1, 0, 0];
    const a: Vec3 = [dir[1] * up[2] - dir[2] * up[1], dir[2] * up[0] - dir[0] * up[2], dir[0] * up[1] - dir[1] * up[0]];
    const la = Math.hypot(...a);
    const an: Vec3 = [a[0] / la, a[1] / la, a[2] / la];
    const b: Vec3 = [dir[1] * an[2] - dir[2] * an[1], dir[2] * an[0] - dir[0] * an[2], dir[0] * an[1] - dir[1] * an[0]];
    return [an, b];
  };
  for (let i = 0; i < n; i++) {
    const part = pick(r, [26, 44, 12, 10, 8]);
    if (part === 0) {
      const [a, b, c] = PALM[Math.floor(r() * PALM.length)]!;
      let u = r();
      let v = r();
      if (u + v > 1) {
        u = 1 - u;
        v = 1 - v;
      }
      const pa = HAND[a]!;
      const pb = HAND[b]!;
      const pc = HAND[c]!;
      const x = pa[0] + (pb[0] - pa[0]) * u + (pc[0] - pa[0]) * v;
      const y = pa[1] + (pb[1] - pa[1]) * u + (pc[1] - pa[1]) * v;
      const z = pa[2] + (pb[2] - pa[2]) * u + (pc[2] - pa[2]) * v + (r() < 0.5 ? -1 : 1) * (0.07 + Math.abs(gauss(r)) * 0.015);
      emit(x, y, z, 0);
    } else if (part === 1) {
      const [a, b] = FINGER_BONES[pick(r, fingerWeights)]!;
      const pa = HAND[a]!;
      const pb = HAND[b]!;
      const t = r();
      const c = lerp3(pa, pb, t);
      const len = boneLen([a, b]);
      const dir: Vec3 = [(pb[0] - pa[0]) / len, (pb[1] - pa[1]) / len, (pb[2] - pa[2]) / len];
      const [u, v] = perpendicular(dir);
      const isTip = b === 4 || b === 8 || b === 12 || b === 16 || b === 20;
      const radius = (a <= 4 && a > 0 ? 0.088 : 0.074) * (isTip ? 1 - t * 0.25 : 1) * (0.9 + r() * 0.12);
      const ang = r() * TAU;
      emit(
        c[0] + (u[0] * Math.cos(ang) + v[0] * Math.sin(ang)) * radius,
        c[1] + (u[1] * Math.cos(ang) + v[1] * Math.sin(ang)) * radius,
        c[2] + (u[2] * Math.cos(ang) + v[2] * Math.sin(ang)) * radius,
        0,
      );
    } else if (part === 2) {
      const [a, b] = BONES[pick(r, boneWeights)]!;
      const p = lerp3(HAND[a]!, HAND[b]!, r());
      emit(p[0], p[1], p[2] + 0.14, 0.55);
    } else if (part === 3) {
      const k = Math.floor(r() * HAND.length);
      const p = jitter(r, HAND[k]!, 0.022);
      emit(p[0], p[1], p[2] + 0.14, 1);
    } else {
      const p = inBall(r, 2.5);
      emit(p[0], p[1], p[2], 0);
    }
  }
}

const latLng = (lat: number, lng: number, radius: number): Vec3 => {
  const la = (lat * Math.PI) / 180;
  const lo = (lng * Math.PI) / 180;
  return [Math.cos(la) * Math.sin(lo) * radius, Math.sin(la) * radius, Math.cos(la) * Math.cos(lo) * radius];
};

const BUDAPEST: [number, number] = [47.4979, 19.0402];
const DESTINATIONS: [number, number][] = [
  [50.11, 8.68],
  [51.5, -0.13],
  [40.71, -74.0],
  [37.77, -122.42],
  [1.35, 103.82],
  [41.01, 28.98],
  [40.41, 49.87],
  [-23.55, -46.63],
  [35.68, 139.69],
  [25.2, 55.27],
];

/** L06 Production: a globe of edge locations with arcs leaving Budapest. */
function production(emit: Emit, n: number, r: Rand) {
  const R = 1.22;
  const origin = latLng(BUDAPEST[0], BUDAPEST[1], 1);
  const arcs = DESTINATIONS.map(([la, lo]) => latLng(la, lo, 1));
  for (let i = 0; i < n; i++) {
    const part = pick(r, [40, 16, 30, 8, 6]);
    if (part === 0) {
      if (r() < 0.5) {
        const lat = -60 + Math.floor(r() * 8) * 20;
        const p = latLng(lat, r() * 360 - 180, R);
        emit(p[0], p[1], p[2], 0);
      } else {
        const lng = -180 + Math.floor(r() * 18) * 20;
        const p = latLng(r() * 160 - 80, lng, R);
        emit(p[0], p[1], p[2], 0);
      }
    } else if (part === 1) {
      const p = onSphere(r, R);
      emit(p[0], p[1], p[2], 0);
    } else if (part === 2) {
      const dest = arcs[Math.floor(r() * arcs.length)]!;
      const t = r();
      const dot = Math.min(1, Math.max(-1, origin[0] * dest[0] + origin[1] * dest[1] + origin[2] * dest[2]));
      const omega = Math.acos(dot);
      const s = Math.sin(omega) || 1;
      const a = Math.sin((1 - t) * omega) / s;
      const b = Math.sin(t * omega) / s;
      const lift = 1 + Math.sin(Math.PI * t) * (0.12 + omega * 0.12);
      emit(
        (origin[0] * a + dest[0] * b) * R * lift,
        (origin[1] * a + dest[1] * b) * R * lift,
        (origin[2] * a + dest[2] * b) * R * lift,
        1,
      );
    } else if (part === 3) {
      const target = r() < 0.35 ? origin : arcs[Math.floor(r() * arcs.length)]!;
      const p = jitter(r, [target[0] * R, target[1] * R, target[2] * R], 0.02);
      emit(p[0], p[1], p[2], 1);
    } else {
      const p = inBall(r, 2.6);
      emit(p[0], p[1], p[2], 0);
    }
  }
}

/** Reading sections: wide, sparse, calm dust. */
function field(emit: Emit, n: number, r: Rand) {
  for (let i = 0; i < n; i++) {
    emit((r() * 2 - 1) * 7.5, (r() * 2 - 1) * 4.2, -6 + r() * 7.5, 0);
  }
}

/** Contact: everything converges into one received signal. */
function point(emit: Emit, n: number, r: Rand) {
  const radii = [0.38, 0.74, 1.12, 1.52];
  for (let i = 0; i < n; i++) {
    const part = pick(r, [50, 30, 20]);
    if (part === 0) {
      const p = inBall(r, 0.07 + Math.abs(gauss(r)) * 0.03);
      emit(p[0], p[1], p[2], 1);
    } else if (part === 1) {
      const k = Math.floor(r() * radii.length);
      const a = r() * TAU;
      const rad = radii[k]! + gauss(r) * 0.008;
      emit(Math.cos(a) * rad, Math.sin(a) * rad, gauss(r) * 0.01, k === 0 ? 0.7 : 0.08);
    } else {
      const a = r() * TAU;
      const rad = 0.2 + Math.sqrt(r()) * 2.6;
      emit(Math.cos(a) * rad, Math.sin(a) * rad, gauss(r) * 0.3, 0);
    }
  }
}

const BUILDERS: Record<FormationId, (emit: Emit, n: number, r: Rand) => void> = {
  core,
  wave,
  data,
  auth,
  backend,
  interface: iface,
  ai,
  production,
  field,
  point,
};

/** Builds one formation as an RGBA float buffer: [particle][xyzw]. Deterministic per index. */
export function buildFormation(f: number, n: number): Float32Array {
  const out = new Float32Array(n * 4);
  const id = FORMATIONS[f]!;
  const r = mulberry32(0x5eed + f * 7919);
  let i = 0;
  BUILDERS[id](
    (x, y, z, w) => {
      out[i++] = x;
      out[i++] = y;
      out[i++] = z;
      out[i++] = w;
    },
    n,
    r,
  );
  return out;
}
