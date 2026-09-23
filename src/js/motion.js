/** True when the visitor has asked the OS to minimise non-essential motion. */
export const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
