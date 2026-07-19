import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

/**
 * Offset awal per arah (semantik ala AOS): "up" = elemen bergerak NAIK ke
 * posisinya (mulai dari bawah, y:+distance), "left" = bergerak ke kiri
 * (mulai dari kanan, x:+distance), dst. "none" = fade murni.
 */
export const revealOffset = (direction, distance) => {
  switch (direction) {
    case 'up': return { y: distance };
    case 'down': return { y: -distance };
    case 'left': return { x: distance };
    case 'right': return { x: -distance };
    default: return {};
  }
};

/**
 * ScrollReveal - fade-up reveal ringan untuk section NON-hero.
 *
 * Sengaja pakai toggleActions (BUKAN scrub/pin): animasi sekali jalan saat
 * elemen masuk viewport — murah, tidak mengubah tinggi layout, dan tidak
 * bentrok dengan hero. ScrollTrigger.refresh() TIDAK dipanggil manual di
 * sini: reveal tidak mengubah tinggi konten (hanya opacity/transform), jadi
 * biarkan provider global/GSAP yang mengatur refresh.
 */
const ScrollReveal = ({
  children,
  as: Tag = 'div',
  direction = 'up',
  distance = 40,
  duration = 0.8,
  delay = 0,
  once = true,
  start = 'top 85%',
  className = '',
}) => {
  const ref = useRef(null);

  useEffect(() => {
    // Guard async: import GSAP bisa selesai SETELAH unmount (user pindah
    // cepat) — tanpa flag ini kita membuat trigger untuk elemen mati.
    let cancelled = false;
    let mm;

    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]);
      if (cancelled || !ref.current) return;
      gsap.registerPlugin(ScrollTrigger);

      mm = gsap.matchMedia();

      // Reduced-motion: langsung tampil final, TANPA animasi sama sekali.
      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(ref.current, { clearProps: 'opacity,x,y' });
      });

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.set(ref.current, { opacity: 0, ...revealOffset(direction, distance) });
        const tween = gsap.to(ref.current, {
          opacity: 1,
          x: 0,
          y: 0,
          duration,
          delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ref.current,
            start,
            // once:true -> ScrollTrigger otomatis kill dirinya setelah play
            // selesai (hemat, tidak ada listener menganggur).
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
  }, [direction, distance, duration, delay, once, start]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
};

ScrollReveal.propTypes = {
  children: PropTypes.node.isRequired,
  as: PropTypes.elementType,
  direction: PropTypes.oneOf(['up', 'down', 'left', 'right', 'none']),
  distance: PropTypes.number,
  duration: PropTypes.number,
  delay: PropTypes.number,
  once: PropTypes.bool,
  start: PropTypes.string,
  className: PropTypes.string,
};

export default ScrollReveal;
