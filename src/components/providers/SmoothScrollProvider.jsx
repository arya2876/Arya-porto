import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { setLenis } from '../../utils/smoothScroll';

/**
 * SmoothScrollProvider - global Lenis smooth scrolling, synced with GSAP's
 * ScrollTrigger so scroll-driven animations stay in step with the lerped
 * scroll position. Vite renders client-side only, so no SSR guard is needed
 * beyond running inside useEffect.
 */
const SmoothScrollProvider = ({ children }) => {
  useEffect(() => {
    // Respect prefers-reduced-motion: keep native scrolling entirely.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    let lenis;
    let tickerFn;
    let gsapRef;
    let cancelled = false;

    // Dynamic imports keep gsap/lenis out of the critical bundle path.
    (async () => {
      const [{ default: Lenis }, { gsap }, { ScrollTrigger }] = await Promise.all([
        import('lenis'),
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]);
      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);
      gsapRef = gsap;

      lenis = new Lenis({
        duration: 1.1,
        // Touch stays native (syncTouch defaults to false) to avoid mobile jank.
      });
      setLenis(lenis);

      // Keep ScrollTrigger positions in sync with Lenis' virtual scroll.
      lenis.on('scroll', ScrollTrigger.update);

      // Drive Lenis from GSAP's ticker: one shared rAF loop for both.
      tickerFn = (time) => lenis.raf(time * 1000);
      gsap.ticker.add(tickerFn);
      gsap.ticker.lagSmoothing(0);
    })();

    return () => {
      cancelled = true;
      if (tickerFn && gsapRef) gsapRef.ticker.remove(tickerFn);
      if (lenis) lenis.destroy();
      setLenis(null);
    };
  }, []);

  return children;
};

SmoothScrollProvider.propTypes = {
  children: PropTypes.node,
};

export default SmoothScrollProvider;
