# 🚀 Quick Start - Arya Winata Portfolio

## ⚡ Mulai dalam 3 Langkah

### 1️⃣ Tambahkan Gambar (5 menit)

Copy 4 file gambar ke folder `public/images/`:

```
c:\xampp\htdocs\New Porto\public\images\
├── gambar1.png
├── Gemini_Generated_Image_15glm215glm215gl.png
├── Gemini_Generated_Image_2zmaum2zmaum2zma.png
└── Gemini_Generated_Image_pdazn8pdazn8pdaz.png
```

**Cara mudah:**
1. Buka folder `c:\xampp\htdocs\New Porto\public\images\`
2. Copy-paste gambar Anda ke folder tersebut
3. Rename sesuai nama di atas

---

### 2️⃣ Jalankan Development Server

Buka terminal di VS Code dan jalankan:

```powershell
npm run dev
```

Website akan buka di: **http://localhost:3000**

---

### 3️⃣ Test Website

✅ Check semua section:
- Hero (dengan foto profil)
- About (skills & journey)
- Experience (timeline)
- Services (3 layanan)
- Portfolio (3 projects)
- Testimonials (3 review)
- Contact (form dengan dropdown)

✅ Test fitur:
- Toggle dark mode (kanan atas)
- Scroll smooth
- Responsive (resize browser)
- Animations

---

## 🎯 Itu Saja!

Website Anda sudah siap digunakan!

### 📖 Untuk Customization Lebih Lanjut:

Baca file dokumentasi:
- **`MIGRATION_SUMMARY.md`** - Ringkasan lengkap hasil migrasi
- **`MIGRATION_GUIDE.md`** - Panduan customization detail
- **`public/images/README.md`** - Info tentang gambar

---

## 🔧 Update Data (Jika Diperlukan)

### Ubah Info Personal:
File: `src/data/personalInfo.js`
```javascript
export const personalInfo = {
  name: 'Arya Winata',  // Ubah nama di sini
  // ... dst
}
```

### Tambah Project Baru:
File: `src/data/projects.js`
```javascript
{
  id: 4,
  title: 'Project Baru',
  // ... dst
}
```

### Update Statistik:
File: `src/utils/constants.js`
```javascript
export const HERO_STATS = [
  { value: 20, suffix: '+', label: 'Projects Completed' }, // Ubah angka
  // ... dst
];
```

---

## 🌐 Siap Deploy?

### Build untuk Production:
```powershell
npm run build
```

Output ada di folder `dist/`

### Deploy ke Netlify (Gratis):
1. Push code ke GitHub
2. Connect di Netlify.com
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Deploy! 🚀

---

## ❓ Troubleshooting

### Website tidak muncul?
```powershell
npm run dev
```

### Error saat install?
```powershell
npm install
```

### Port 3000 sudah dipakai?
- Stop aplikasi lain yang pakai port 3000
- Atau Vite otomatis pakai port lain (5173, dst)

---

## 📞 Need Help?

Check documentation:
- `README.md` - Setup guide
- `MIGRATION_GUIDE.md` - Customization guide
- `MIGRATION_SUMMARY.md` - Complete overview

---

**Happy Coding! 🎉**

*Your portfolio is ready to impress!*
