/**
 * Hero scroll-story frames — 1 pose per segmen scroll.
 *
 * CATATAN ASET: baru ada 2 pose cutout asli; frame 3-5 memakai ulang pose 1 & 2
 * sebagai placeholder. Saat menguji crossfade, transisi antar frame yang
 * gambarnya identik (mis. 01→03) akan terlihat "tidak berubah" — itu karena
 * src-nya sama, BUKAN bug. Ganti src di bawah begitu pose asli siap:
 * taruh di public/images/hero/pose-0X.webp (cutout transparan, rasio sama
 * persis 1284×2046, WebP; realistis ~400 KB per file untuk alpha di resolusi
 * ini — atau turunkan ke lebar ~1000px kalau mau lebih hemat).
 */
export const heroFrames = [
  {
    src: '/images/hero-normal-cut.webp',
    alt: 'Arya Winata — confident',
    caption: 'Full Stack Developer',
  },
  {
    src: '/images/hero-helmet-cut.webp',
    alt: 'Arya Winata — racing helmet',
    caption: 'Racing mindset — every millisecond counts',
  },
  {
    // TODO: ganti dengan pose asli (arms crossed)
    src: '/images/hero-normal-cut.webp',
    alt: 'Arya Winata — arms crossed',
    caption: 'UI/UX with intent',
  },
  {
    // TODO: ganti dengan pose asli (pointing)
    src: '/images/hero-helmet-cut.webp',
    alt: 'Arya Winata — pointing',
    caption: 'From Figma to production',
  },
  {
    // TODO: ganti dengan pose asli (waving)
    src: '/images/hero-normal-cut.webp',
    alt: 'Arya Winata — waving',
    caption: "Let's build together",
  },
];

export default heroFrames;
