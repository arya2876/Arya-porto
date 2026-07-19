/**
 * Single source of truth untuk struktur one-page.
 * Menu overlay (NavMenu/StaggeredMenu) DAN urutan render section di App.jsx
 * sama-sama membaca NAV_ITEMS, jadi penomoran 01-07 tidak pernah lepas sinkron.
 * (Penomoran di StaggeredMenu otomatis dari urutan array via CSS counter.)
 */
export const NAV_ITEMS = [
  { num: '01', id: 'home', label: 'Home' },
  { num: '02', id: 'about', label: 'About' },
  { num: '03', id: 'experience', label: 'Experience' },
  { num: '04', id: 'portfolio', label: 'Portfolio' },
  { num: '05', id: 'services', label: 'What I Do' },
  { num: '06', id: 'achievements', label: 'Achievements' },
  { num: '07', id: 'contact', label: 'Contact' },
];

/** Nomor section untuk heading — selalu dari NAV_ITEMS, jangan hardcode. */
export const navNum = (id) => NAV_ITEMS.find((item) => item.id === id)?.num ?? '00';

export default NAV_ITEMS;
