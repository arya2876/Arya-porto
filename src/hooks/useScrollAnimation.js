import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Custom hook for scroll-based animations
 * @returns {Object} Scroll state and utilities
 */
export const useScrollAnimation = () => {
  const [scrollY, setScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState('up');
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollY = useRef(0);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;

    // Determine scroll direction
    if (currentScrollY > lastScrollY.current) {
      setScrollDirection('down');
    } else if (currentScrollY < lastScrollY.current) {
      setScrollDirection('up');
    }

    // Update scroll state
    setScrollY(currentScrollY);
    setIsScrolled(currentScrollY > 50);
    lastScrollY.current = currentScrollY;
  }, []);

  useEffect(() => {
    // Throttle scroll event
    let timeoutId;
    const throttledHandleScroll = () => {
      if (timeoutId) return;
      
      timeoutId = setTimeout(() => {
        handleScroll();
        timeoutId = null;
      }, 100);
    };

    window.addEventListener('scroll', throttledHandleScroll, { passive: true });
    
    // Initial call
    handleScroll();

    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [handleScroll]);

  /**
   * Scroll to a specific element smoothly
   * @param {string} elementId - ID of the element to scroll to
   * @param {number} offset - Offset from the top (default: 80)
   */
  const scrollToElement = useCallback((elementId, offset = 80) => {
    const element = document.getElementById(elementId);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  }, []);

  /**
   * Scroll to top of the page
   */
  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  /**
   * Get scroll progress (0-100)
   */
  const getScrollProgress = useCallback(() => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY;
    
    const totalScroll = documentHeight - windowHeight;
    const progress = (scrollTop / totalScroll) * 100;
    
    return Math.min(Math.max(progress, 0), 100);
  }, []);

  return {
    scrollY,
    scrollDirection,
    isScrolled,
    scrollToElement,
    scrollToTop,
    getScrollProgress,
  };
};

export default useScrollAnimation;
