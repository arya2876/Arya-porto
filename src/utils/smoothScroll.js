/**
 * Singleton access to the global Lenis instance so any component can trigger
 * smooth programmatic scrolling without prop-drilling the instance around.
 * Falls back to native smooth scrolling when Lenis is not active
 * (e.g. prefers-reduced-motion users, or before the provider has mounted).
 */
let lenisInstance = null;

export const setLenis = (instance) => {
  lenisInstance = instance;
};

export const getLenis = () => lenisInstance;

/** Smooth-scroll to an element by id. `offset` shifts the final position (px). */
export const scrollToId = (id, { offset = 0 } = {}) => {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenisInstance) {
    lenisInstance.scrollTo(el, { offset });
  } else {
    // Native fallback: replicate the offset with window.scrollTo
    const y = el.getBoundingClientRect().top + window.pageYOffset + offset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
};

/** Smooth-scroll to an absolute Y position (px). */
export const scrollToY = (top) => {
  if (lenisInstance) {
    lenisInstance.scrollTo(top);
  } else {
    window.scrollTo({ top, behavior: 'smooth' });
  }
};

/** Smooth-scroll back to the top of the page. */
export const scrollToTop = () => scrollToY(0);
