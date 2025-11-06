import { useState, useEffect } from 'react';

/**
 * Hook to track scroll progress of an element
 * Returns a value between 0 and 1 representing how much the element has been scrolled
 */
const useScrollProgress = (ref) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;

      const element = ref.current;
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate progress based on element position in viewport
      // 0 = element at bottom of viewport
      // 1 = element at top of viewport
      const elementTop = rect.top;
      const elementHeight = rect.height;
      
      // Calculate progress (0 to 1)
      let scrollProgress = 0;
      
      if (elementTop < windowHeight && elementTop + elementHeight > 0) {
        // Element is in viewport
        scrollProgress = 1 - (elementTop / (windowHeight + elementHeight));
        scrollProgress = Math.max(0, Math.min(1, scrollProgress));
      } else if (elementTop >= windowHeight) {
        // Element below viewport
        scrollProgress = 0;
      } else {
        // Element above viewport
        scrollProgress = 1;
      }
      
      setProgress(scrollProgress);
    };

    handleScroll(); // Initial calculation
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [ref]);

  return progress;
};

export default useScrollProgress;
