import Lenis from 'lenis';
import type { SignalEngine, Tier } from './signal/engine';
import { formationIndex } from './signal/ids';

/*
 * Progressive enhancement entry point. The page is complete without this
 * file; everything here only adds motion, the WebGL signal and conveniences.
 * No innerHTML, no eval, no inline styles in markup — CSP + Trusted Types safe.
 */

const root = document.documentElement;
const reducedQuery = matchMedia('(prefers-reduced-motion: reduce)');
const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
const reduced = reducedQuery.matches;
let motionOn = !reduced;

const $ = <T extends Element = HTMLElement>(sel: string, scope: ParentNode = document) => scope.querySelector<T>(sel);
const $$ = <T extends Element = HTMLElement>(sel: string, scope: ParentNode = document) => [...scope.querySelectorAll<T>(sel)];
const smoothstep = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

/* ───────────────────────── Email ───────────────────────── */
function initEmail() {
  for (const link of $$<HTMLAnchorElement>('[data-email]')) {
    const address = [...atob(link.dataset.email ?? '')].reverse().join('');
    if (!/^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i.test(address)) continue;
    link.href = `mailto:${address}`;
    const text = $('[data-email-text]', link);
    if (text) text.textContent = address;

    const scope = link.parentElement;
    const copy = scope && $<HTMLButtonElement>('[data-copy-email]', scope);
    const label = scope && $('[data-copy-label]', scope);
    const status = scope && $('[data-copy-status]', scope);
    if (!copy || !label || !navigator.clipboard) continue;
    const original = label.textContent;
    copy.hidden = false;
    copy.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(address);
        label.textContent = copy.dataset.labelDone ?? original;
        if (status) status.textContent = copy.dataset.labelDone ?? '';
        setTimeout(() => {
          label.textContent = original;
          if (status) status.textContent = '';
        }, 2200);
      } catch {
        /* clipboard permission denied: the mailto link still works */
      }
    });
  }
}

/* ───────────────────────── Menu ───────────────────────── */
function initMenu() {
  const menu = $<HTMLElement>('[data-menu]');
  if (!menu || typeof menu.hidePopover !== 'function') return;
  for (const link of $$('[data-menu-link]', menu)) {
    link.addEventListener('click', () => menu.hidePopover());
  }
}

/* ───────────────────────── Reveals ───────────────────────── */
function splitWords(el: HTMLElement) {
  const words = (el.textContent ?? '').trim().split(/\s+/);
  el.textContent = '';
  words.forEach((word, i) => {
    const outer = document.createElement('span');
    outer.className = 'w';
    const inner = document.createElement('span');
    inner.textContent = word;
    inner.style.setProperty('--i', String(i));
    outer.append(inner);
    el.append(outer);
    if (i < words.length - 1) el.append(' ');
  });
}

const armed = new Set<HTMLElement>();

function initReveals() {
  if (!motionOn || !('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-in');
        armed.delete(entry.target as HTMLElement);
        io.unobserve(entry.target);
      }
    },
    { rootMargin: '0px 0px -8% 0px' },
  );
  const fold = innerHeight * 0.96;
  // Read every position first, then mutate — avoids a forced reflow per element.
  const below = $$('[data-reveal], [data-split], [data-line]').filter((el) => el.getBoundingClientRect().top >= fold);
  for (const el of below) {
    if (el.dataset.d) el.style.setProperty('--d', el.dataset.d);
    if (el.hasAttribute('data-split')) splitWords(el);
    el.classList.add('is-armed');
    armed.add(el);
    io.observe(el);
  }
}

const revealAll = () => {
  for (const el of armed) el.classList.add('is-in');
  armed.clear();
};

/* ───────────────────────── Scroll model ───────────────────────── */
interface Anchor {
  y: number;
  top: number;
  f: number;
  el: HTMLElement;
}

const formationSections = $$('[data-formation]');
const chapterSections = $$('[data-chapter]');
let anchors: Anchor[] = [];
let chapterTops: number[] = [];
let docMax = 1;

function measure() {
  const vh = innerHeight;
  const sy = scrollY;
  anchors = formationSections.map((el) => {
    const r = el.getBoundingClientRect();
    return { y: r.top + sy + r.height / 2 - vh / 2, top: r.top + sy, f: formationIndex(el.dataset.formation), el };
  });
  chapterTops = chapterSections.map((el) => el.getBoundingClientRect().top + sy);
  docMax = Math.max(1, root.scrollHeight - vh);
  dirty = true;
}

function stageAt(y: number): [number, number, number] {
  const first = anchors[0];
  if (!first) return [formationIndex('field'), formationIndex('field'), 0];
  if (y <= first.y) return [first.f, first.f, 0];
  for (let i = 0; i < anchors.length - 1; i++) {
    const a = anchors[i]!;
    const b = anchors[i + 1]!;
    if (y < b.y) return [a.f, b.f, smoothstep(0.28, 0.72, (y - a.y) / Math.max(1, b.y - a.y))];
  }
  const last = anchors[anchors.length - 1]!;
  return [last.f, last.f, 0];
}

/* ───────────────────────── Section rail ───────────────────────── */
const railFill = $('[data-rail-fill]');
const railStops = $$<HTMLAnchorElement>('[data-rail-stop]');
const heroTitle = $('[data-hero-title]');
let activeChapter = -1;

function updateHud(y: number) {
  const progress = Math.min(1, Math.max(0, y / docMax));
  if (railFill) railFill.style.transform = `scaleY(${progress.toFixed(4)})`;

  const mid = y + innerHeight * 0.5;
  let idx = 0;
  for (let i = 0; i < chapterTops.length; i++) if (chapterTops[i]! <= mid) idx = i;
  if (idx === activeChapter) return;
  activeChapter = idx;
  const section = chapterSections[idx];
  if (!section) return;
  const activeStop = railStops.findIndex((s) => s.dataset.railStop === section.id);
  railStops.forEach((stop, i) => {
    const order = chapterSections.findIndex((c) => c.id === stop.dataset.railStop);
    stop.classList.toggle('is-active', i === activeStop);
    stop.classList.toggle('is-passed', order >= 0 && order < idx);
    if (i === activeStop) stop.setAttribute('aria-current', 'location');
    else stop.removeAttribute('aria-current');
  });
}

/* ───────────────────────── Smooth scroll ───────────────────────── */
let lenis: Lenis | null = null;

function startLenis() {
  if (lenis || !finePointer || !motionOn) return;
  lenis = new Lenis({ autoRaf: false, lerp: 0.1, smoothWheel: true, stopInertiaOnNavigate: true });
}

function stopLenis() {
  lenis?.destroy();
  lenis = null;
}

function focusTarget(el: HTMLElement) {
  if (!el.hasAttribute('tabindex') && !/^(A|BUTTON|INPUT|SELECT|TEXTAREA)$/.test(el.tagName)) {
    el.setAttribute('tabindex', '-1');
  }
  el.focus({ preventScroll: true });
}

function initAnchors() {
  document.addEventListener('click', (event) => {
    const link = (event.target as Element | null)?.closest<HTMLAnchorElement>('a[href*="#"]');
    if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey) return;
    const url = new URL(link.href, location.href);
    if (url.pathname !== location.pathname || !url.hash) return;
    const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
    if (!target) return;
    event.preventDefault();
    history.pushState(null, '', url.hash);
    if (lenis) {
      lenis.scrollTo(target, { duration: 1.4, onComplete: () => focusTarget(target) });
    } else {
      target.scrollIntoView({ behavior: motionOn ? 'smooth' : 'auto', block: 'start' });
      focusTarget(target);
    }
  });
}

/* ───────────────────────── Signal (WebGL) ───────────────────────── */
let engine: SignalEngine | null = null;

function pickTier(): Tier {
  const nav = navigator as Navigator & { deviceMemory?: number };
  const cores = nav.hardwareConcurrency || 4;
  const memory = nav.deviceMemory ?? 4;
  const small = innerWidth < 900 || !finePointer;
  if (small) return cores >= 6 && memory >= 4 ? 'mid' : 'low';
  return cores >= 8 && memory >= 8 ? 'high' : 'mid';
}

async function bootSignal() {
  const canvas = $<HTMLCanvasElement>('[data-signal-canvas]');
  if (!canvas || !('WebGL2RenderingContext' in window)) return;
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  if (connection?.saveData) return;
  try {
    const { createSignal } = await import('./signal/engine');
    engine = createSignal(canvas, {
      tier: pickTier(),
      reducedMotion: reduced,
      first: stageAt(scrollY)[0],
      onReady: () => {
        dirty = true;
        kick();
        requestAnimationFrame(() => canvas.classList.add('is-live'));
      },
    });
  } catch (error) {
    console.warn('[signal] disabled:', error);
    engine = null;
  }
  if (!engine) return;
  engine.setMotion(motionOn);
  dirty = true;
  kick();

  if (finePointer) {
    addEventListener(
      'pointermove',
      (e) => {
        engine?.setPointer((e.clientX / innerWidth) * 2 - 1, -(e.clientY / innerHeight) * 2 + 1, true);
        kick();
      },
      { passive: true },
    );
    document.addEventListener('pointerleave', () => engine?.setPointer(0, 0, false));
  }
}

/* ───────────────────────── Frame loop ───────────────────────── */
let running = false;
let dirty = true;
let lastY = -1;

function frame(time: number) {
  lenis?.raf(time);
  const y = scrollY;
  if (y !== lastY || dirty) {
    root.classList.toggle('is-scrolled', y > 24);
    root.classList.toggle('is-past-hero', y > innerHeight * 0.55);
    updateHud(y);
    if (heroTitle && motionOn && y < innerHeight * 1.2) {
      heroTitle.style.transform = `translate3d(0, ${(y * 0.16).toFixed(1)}px, 0)`;
    }
    if (engine) {
      const [from, to, mix] = stageAt(y);
      engine.setStage(from, to, mix);
    }
    lastY = y;
    dirty = false;
  }
  const drew = engine?.frame(time) ?? false;
  const keepGoing = motionOn || drew || lenis?.isScrolling;
  if (keepGoing) requestAnimationFrame(frame);
  else running = false;
}

function kick() {
  if (running) return;
  running = true;
  requestAnimationFrame(frame);
}

/* ───────────────────────── Motion toggle ───────────────────────── */
function initMotionToggle() {
  const button = $<HTMLButtonElement>('[data-motion-toggle]');
  if (!button || reduced) return;
  const label = $('[data-motion-label]', button);
  button.hidden = false;
  button.addEventListener('click', () => {
    motionOn = !motionOn;
    button.setAttribute('aria-pressed', String(!motionOn));
    if (label) label.textContent = (motionOn ? button.dataset.labelPause : button.dataset.labelPlay) ?? '';
    root.classList.toggle('motion-off', !motionOn);
    engine?.setMotion(motionOn);
    if (motionOn) startLenis();
    else {
      stopLenis();
      revealAll();
      if (heroTitle) heroTitle.style.transform = '';
    }
    dirty = true;
    kick();
  });
}

/* ───────────────────────── Boot ───────────────────────── */
function boot() {
  initEmail();
  initMenu();
  initAnchors();
  initMotionToggle();
  initReveals();
  measure();
  startLenis();
  kick();

  new ResizeObserver(() => {
    measure();
    kick();
  }).observe(document.body);
  addEventListener('scroll', kick, { passive: true });
  document.fonts?.ready.then(() => {
    measure();
    kick();
  });

  const idle = (cb: () => void) =>
    'requestIdleCallback' in window ? requestIdleCallback(cb, { timeout: 1200 }) : setTimeout(cb, 300);
  idle(() => void bootSignal());
}

boot();
