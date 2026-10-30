import type Lenis from "lenis";

/** いま動いている Lenis（慣性スクロール）。メニューを開いている間に止めるなど、ほかの部品から触るために持つ */
let current: Lenis | null = null;

export const setLenis = (lenis: Lenis | null) => {
  current = lenis;
};

export const getLenis = () => current;
