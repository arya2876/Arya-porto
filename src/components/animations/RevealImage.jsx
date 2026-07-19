import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

/**
 * RevealImage - large scroll-driven image reveal (landonorris.com style).
 * Combines a clip-path mask that opens as the section enters the viewport,
 * a slight scale/fade-in, and a light parallax on the inner image.
 *
 * GSAP + ScrollTrigger are imported dynamically inside useEffect so they
 * never run outside the browser and stay out of the initial bundle.
 */
const RevealImage = ({
  src,
  alt = '',
  className = '',
  pin = false,
  scrub = 1,
  parallax = 0.15,
}) => {
  const sectionRef = useRef(null);
  const maskRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    // Reduced-motion users get the static image, fully visible.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    let ctx;
    let cancelled = false;

    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]);
      if (cancelled || !sectionRef.current) return;

      gsap.registerPlugin(ScrollTrigger);

      // gsap.context scopes selectors + makes cleanup a single revert() call.
      ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            end: pin ? '+=60%' : 'top 20%',
            scrub,
            pin,
            anticipatePin: pin ? 1 : 0,
          },
        });

        // Mask opens from a rounded inset window to full bleed.
        tl.fromTo(
          maskRef.current,
          {
            clipPath: 'inset(20% 12% 20% 12% round 24px)',
            opacity: 0.4,
            scale: 1.08,
          },
          {
            clipPath: 'inset(0% 0% 0% 0% round 0px)',
            opacity: 1,
            scale: 1,
            ease: 'none',
          },
          0
        );

        // Inner image drifts slower than the scroll (light parallax).
        tl.fromTo(
          imgRef.current,
          { yPercent: parallax * 100 },
          { yPercent: -parallax * 100, ease: 'none' },
          0
        );
      }, sectionRef);
    })();

    return () => {
      cancelled = true;
      if (ctx) ctx.revert(); // kills timeline + its ScrollTrigger
    };
  }, [pin, scrub, parallax]);

  return (
    <section
      ref={sectionRef}
      className={`relative overflow-hidden py-10 sm:py-16 ${className}`}
      aria-label={alt}
    >
      <div ref={maskRef} className="relative mx-auto w-full max-w-6xl will-change-transform">
        <div className="relative h-[48vh] sm:h-[64vh] lg:h-[80vh] overflow-hidden">
          <img
            ref={imgRef}
            src={src}
            alt={alt}
            loading="lazy"
            draggable={false}
            className="absolute inset-0 w-full h-[130%] -top-[15%] object-contain will-change-transform"
          />
        </div>
      </div>
    </section>
  );
};

RevealImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  className: PropTypes.string,
  /** Pin the section briefly while the reveal scrubs (off by default). */
  pin: PropTypes.bool,
  /** ScrollTrigger scrub smoothing; true or a number of seconds. */
  scrub: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  /** 0–1-ish; how much slower the image moves relative to scroll. */
  parallax: PropTypes.number,
};

export default RevealImage;
