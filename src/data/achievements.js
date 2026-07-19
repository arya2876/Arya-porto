// Fallback Achievements (06) — dipakai bila data certificates dari
// API/Supabase kosong. Ganti/isi lewat admin panel atau edit langsung.
export const achievementsFallback = [
  {
    id: 1,
    title: 'Google Student Ambassador',
    issuer: 'Google',
    date: '2024 — Present',
    category: 'community',
    credential_url: null,
    image: null,
  },
  {
    id: 2,
    // Slot sertifikat Google Cloud — ganti title/date/credential_url saat lulus
    title: 'Google Cloud Skill Badge (slot)',
    issuer: 'Google Cloud',
    date: 'In progress',
    category: 'cloud',
    credential_url: null,
    image: null,
  },
  {
    id: 3,
    // Slot sertifikat AWS — ganti saat tersedia
    title: 'AWS Educate (slot)',
    issuer: 'Amazon Web Services',
    date: 'In progress',
    category: 'cloud',
    credential_url: null,
    image: null,
  },
];

export default achievementsFallback;
