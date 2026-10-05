import { buildFormation } from './formations';
import { FORMATIONS } from './ids';

/**
 * Generates particle formations off the main thread. The formation the page
 * opens on is built first so the first frame can render as early as possible;
 * the rest follow one by one and are transferred (zero-copy) as they finish.
 */
interface Request {
  n: number;
  first: number;
}

// Typed locally instead of `/// <reference lib="webworker" />`, which would
// leak worker globals into the DOM-typed files of the same program.
const scope = self as unknown as {
  onmessage: ((event: MessageEvent<Request>) => void) | null;
  postMessage(message: unknown, transfer: Transferable[]): void;
};

scope.onmessage = (event) => {
  const { n, first } = event.data;
  const order = [first, ...FORMATIONS.map((_, i) => i).filter((i) => i !== first)];
  for (const f of order) {
    const data = buildFormation(f, n);
    scope.postMessage({ f, data }, [data.buffer]);
  }
};
