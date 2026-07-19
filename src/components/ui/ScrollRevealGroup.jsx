import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { revealOffset } from './ScrollReveal';

/**
 * ScrollRevealGroup - reveal ber-stagger untuk daftar/grid (kartu, tombol
 * filter, item timeline). SATU ScrollTrigger di container menganimasikan
 * semua anak berurutan — jauh lebih efisien daripada puluhan ScrollReveal
 * terpisah untuk list panjang (1 listener vs N listener).
 */
const ScrollRevealGroup = ({
  children,
  as: Tag = 'div',
  direction = 'up',
  distance = 32,
  duration = 0.7,
  delay = 0,
  stagger = 0.12,
  once = true,
  start = 'top 85%',
  className = '',
}) => {
  const ref = useRef(null);

  useEffect(() => {
    let cancelled = false; // guard: jangan setup kalau keburu unmount
    let mm;

    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]);
      if (cancelled || !ref.current) return;
      gsap.registerPlugin(ScrollTrigger);

      // Target = anak LANGSUNG container; dibekukan sekali di sini supaya
      // perubahan DOM belakangan tidak membuat tween menarget elemen liar.
      const targets = Array.from(ref.current.children);
      if (targets.length === 0) return;

      mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(targets, { clearProps: 'opacity,x,y' });
      });

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.set(targets, { opacity: 0, ...revealOffset(direction, distance) });
        const tween = gsap.to(targets, {
          opacity: 1,
          x: 0,
          y: 0,
          duration,
          delay,
          stagger,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ref.current, // 1 trigger untuk seluruh grup
            start,
            once,
            toggleActions: once ? 'play none none none' : 'play none none reverse',
          },
        });
        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
        };
      });
    })();

    return () => {
      cancelled = true;
      if (mm) mm.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [direction, distance, duration, delay, stagger, once, start]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
};

ScrollRevealGroup.propTypes = {
  children: PropTypes.node.isRequired,
  as: PropTypes.elementType,
  direction: PropTypes.oneOf(['up', 'down', 'left', 'right', 'none']),
  distance: PropTypes.number,
  duration: PropTypes.number,
  delay: PropTypes.number,
  stagger: PropTypes.number,
  once: PropTypes.bool,
  start: PropTypes.string,
  className: PropTypes.string,
};

export default ScrollRevealGroup;
