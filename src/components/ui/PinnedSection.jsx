import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

/**
 * PinnedSection - pin + scrub storytelling reusable untuk section NON-hero.
 *
 * Konvensi: tandai anak yang ingin dianimasikan dengan `data-reveal`
 * ("up" | "down" | "left" | "right" | "scale"; semantik arah sama dengan
 * ScrollReveal/AOS). Urutan animasi = urutan DOM, atau override dengan
 * `data-reveal-order="1"` dst. Cukup 2-4 elemen per section — menandai
 * puluhan elemen membuat timeline berat dan section terasa lambat.
 *
 * intensity:
 * - "full"  : pin + scrub di desktop lebar; otomatis jatuh ke reveal ringan
 *             di <1024px (pin+scrub di layar kecil merusak UX — non-negotiable).
 * - "light" : reveal sekali via toggleActions di semua ukuran (tanpa pin).
 * - "none"  : statis total.
 *
 * KOORDINASI LENIS: setup global kita (Lenis native-scroll, di-drive
 * gsap.ticker + lenis.on('scroll', ScrollTrigger.update)) kompatibel dengan
 * pin. JANGAN aktifkan ScrollTrigger.normalizeScroll() bersama Lenis —
 * keduanya sama-sama membajak input dan saling bertabrakan. Kalau suatu saat
 * pin terasa "meleset" dari posisi scroll, cek dulu urutan refresh (tinggi
 * berubah setelah pin diukur) sebelum menyalahkan Lenis.
 */

const REVEAL_FROM = {
  up: { autoAlpha: 0, y: 60 },
  down: { autoAlpha: 0, y: -60 },
  left: { autoAlpha: 0, x: 60 },
  right: { autoAlpha: 0, x: -60 },
  scale: { autoAlpha: 0, scale: 0.92 },
};

const PinnedSection = ({
  id,
  children,
  pinDuration = '+=100%',
  intensity = 'full',
  className = '',
}) => {
  const ref = useRef(null);

  useEffect(() => {
    if (intensity === 'none') return undefined;

    // Guard async: import GSAP bisa selesai setelah unmount; tanpa flag ini
    // kita membuat trigger (atau memanggil refresh) untuk elemen mati.
    let cancelled = false;
    let mm;
    let removeLoadListener;

    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]);
      if (cancelled || !ref.current) return;
      gsap.registerPlugin(ScrollTrigger);

      const root = ref.current;

      // Target dibekukan per-branch; data-reveal-order menang atas urutan DOM
      // (sort modern stabil, jadi elemen tanpa order tetap berurutan DOM).
      const collectTargets = () => {
        return Array.from(root.querySelectorAll('[data-reveal]')).sort((a, b) => {
          const oa = parseFloat(a.dataset.revealOrder ?? 'NaN');
          const ob = parseFloat(b.dataset.revealOrder ?? 'NaN');
          if (Number.isNaN(oa) && Number.isNaN(ob)) return 0;
          if (Number.isNaN(oa)) return 1;
          if (Number.isNaN(ob)) return -1;
          return oa - ob;
        });
      };
      const fromVars = (el) => REVEAL_FROM[el.dataset.reveal] || REVEAL_FROM.up;

      // Reveal ringan tanpa pin: 1 trigger per section, stagger antar target.
      const lightReveal = () => {
        const targets = collectTargets();
        if (targets.length === 0) return undefined;
        const tl = gsap.timeline({
          defaults: { ease: 'power3.out' },
          scrollTrigger: {
            trigger: root,
            start: 'top 80%',
            once: true,
            toggleActions: 'play none none none',
          },
        });
        targets.forEach((el, i) => {
          tl.from(el, { ...fromVars(el), duration: 0.7 }, i * 0.12);
        });
        return () => {
          tl.scrollTrigger?.kill();
          tl.kill();
        };
      };

      mm = gsap.matchMedia();

      // Branch 1: reduced-motion → konten langsung final, tanpa animasi.
      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(collectTargets(), { clearProps: 'all' });
      });

      if (intensity === 'full') {
        // Branch 2: desktop lebar → pin + scrub penuh.
        mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
          const targets = collectTargets();
          // Pin tanpa target = layar beku tanpa cerita — lebih baik tidak pin.
          if (targets.length === 0) return undefined;

          const tl = gsap.timeline({
            defaults: { ease: 'power1.out' },
            scrollTrigger: {
              trigger: root,
              start: 'top top',
              end: pinDuration, // knob utama panjang pin per-section
              pin: true,
              scrub: 1, // angka (bukan true): smoothing 1s biar tidak kaku
              anticipatePin: 1,
            },
          });
          targets.forEach((el, i) => {
            // posisi i*0.8 dengan durasi 1 → tiap elemen overlap ringan
            tl.from(el, { ...fromVars(el), duration: 1 }, i * 0.8);
          });
          // Hold di akhir supaya elemen terakhir sempat terbaca sebelum unpin.
          tl.to({}, { duration: 0.6 });

          return () => {
            tl.scrollTrigger?.kill();
            tl.kill();
          };
        });

        // Branch 3: <1024px → PAKSA fallback tanpa pin/scrub.
        mm.add('(max-width: 1023px) and (prefers-reduced-motion: no-preference)', lightReveal);
      } else {
        // intensity "light": reveal ringan di semua ukuran.
        mm.add('(prefers-reduced-motion: no-preference)', lightReveal);
      }

      // Pin SANGAT sensitif ke perubahan tinggi (font swap, gambar load).
      // Refresh setelah fonts siap + window.load — dua-duanya di-guard
      // `cancelled` supaya tidak menyentuh trigger yang sudah di-revert.
      const safeRefresh = () => {
        if (!cancelled) ScrollTrigger.refresh();
      };
      if (document.fonts?.ready) {
        document.fonts.ready.then(safeRefresh).catch(() => {});
      }
      if (document.readyState === 'complete') {
        safeRefresh();
      } else {
        window.addEventListener('load', safeRefresh, { once: true });
        removeLoadListener = () => window.removeEventListener('load', safeRefresh);
      }
    })();

    return () => {
      cancelled = true;
      if (removeLoadListener) removeLoadListener();
      if (mm) mm.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [intensity, pinDuration]);

  return (
    <section
      id={id}
      ref={ref}
      // lg:min-h-screen hanya saat full: tinggi eksplisit di breakpoint yang
      // memang di-pin → pin-spacer stabil, CLS ~0. Di bawah lg tidak dipaksa.
      className={`${intensity === 'full' ? 'lg:min-h-screen ' : ''}${className}`}
    >
      {children}
    </section>
  );
};

PinnedSection.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  pinDuration: PropTypes.string,
  intensity: PropTypes.oneOf(['full', 'light', 'none']),
  className: PropTypes.string,
};

export default PinnedSection;
