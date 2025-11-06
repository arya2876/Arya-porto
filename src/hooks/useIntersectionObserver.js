import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook for Intersection Observer
 * @param {Object} options - Intersection Observer options
 * @returns {Array} [ref, isIntersecting, entry]
 */
export const useIntersectionObserver = (options = {}) => {
  const elementRef = useRef(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [entry, setEntry] = useState(null);

  const {
    threshold = 0.1,
    root = null,
    rootMargin = '0px',
    freezeOnceVisible = false,
  } = options;

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // If already visible and freezeOnceVisible is true, don't observe
    if (freezeOnceVisible && isIntersecting) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setEntry(entry);
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold, root, rootMargin }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [threshold, root, rootMargin, freezeOnceVisible, isIntersecting]);

  return [elementRef, isIntersecting, entry];
};

export default useIntersectionObserver;
