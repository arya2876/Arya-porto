# Portfolio Website - Setup Guide

## 📋 Project Overview

Ini adalah portfolio website modern dan profesional yang dibangun dengan teknologi terkini:
- **React 18+** dengan Hooks dan Functional Components
- **Tailwind CSS 3+** untuk styling
- **Vite** sebagai build tool
- **Framer Motion** untuk animasi canggih
- **EmailJS** untuk contact form

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure EmailJS (Penting!)

Untuk mengaktifkan contact form:

1. Buat akun di [EmailJS](https://www.emailjs.com/)
2. Buat Email Service (Gmail, Outlook, dll)
3. Buat Email Template dengan variabel berikut:
   - `{{from_name}}` - Nama pengirim
   - `{{from_email}}` - Email pengirim
   - `{{subject}}` - Subjek email
   - `{{message}}` - Isi pesan

4. Update file `src/utils/constants.js`:
```javascript
export const EMAILJS_CONFIG = {
  serviceId: 'YOUR_SERVICE_ID',      // dari EmailJS dashboard
  templateId: 'YOUR_TEMPLATE_ID',    // dari EmailJS template
  publicKey: 'YOUR_PUBLIC_KEY',      // dari EmailJS account
};
```

### 3. Customize Content

#### Personal Information
Edit `src/utils/constants.js`:
```javascript
export const APP_CONFIG = {
  name: 'Your Portfolio Name',
  author: 'Your Name',
  email: 'your.email@example.com',
  phone: '+1 (555) 123-4567',
  location: 'Your City, Country',
  social: {
    github: 'https://github.com/yourusername',
    linkedin: 'https://linkedin.com/in/yourusername',
    twitter: 'https://twitter.com/yourusername',
    instagram: 'https://instagram.com/yourusername',
  },
  resumeUrl: '/resume.pdf',  // Taruh file PDF di folder public/
};
```

#### Projects
Edit `src/data/projects.js`:
- Ganti dengan project-project Anda
- Upload gambar project ke public/ atau gunakan URL eksternal
- Update technologies, descriptions, dan links

#### Services
Edit `src/data/services.js`:
- Sesuaikan services yang Anda tawarkan
- Update pricing dan delivery time
- Modifikasi features untuk setiap service

#### Testimonials
Edit `src/data/testimonials.js`:
- Ganti dengan testimonial real dari klien
- Update avatar URLs
- Modifikasi ratings dan reviews

### 4. Replace Images

#### Profile Photo
Ganti URL di `src/components/sections/Hero.jsx`:
```javascript
<img
  src="URL_FOTO_PROFIL_ANDA"
  alt={APP_CONFIG.author}
  className="w-full h-full object-cover"
/>
```

#### Project Images
Update URLs di `src/data/projects.js` dengan gambar project Anda

### 5. Run Development Server

```bash
npm run dev
```

Website akan berjalan di `http://localhost:3000`

## 📁 Struktur File Penting

```
src/
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx          # Navigation bar dengan dark mode
│   │   ├── Footer.jsx          # Footer dengan social links
│   │   └── Layout.jsx          # Wrapper layout
│   ├── sections/
│   │   ├── Hero.jsx            # Hero section dengan typing effect
│   │   ├── About.jsx           # About dengan skills bars
│   │   ├── Experience.jsx      # Timeline experience
│   │   ├── Services.jsx        # Services cards
│   │   ├── Portfolio.jsx       # Portfolio dengan filter
│   │   ├── Testimonials.jsx    # Testimonials carousel
│   │   └── Contact.jsx         # Contact form
│   ├── ui/
│   │   ├── Button.jsx          # Reusable button
│   │   ├── Card.jsx            # Reusable card
│   │   ├── Modal.jsx           # Modal component
│   │   ├── Loader.jsx          # Loading states
│   │   └── ThemeToggle.jsx     # Dark/Light toggle
│   └── animations/
│       ├── FadeIn.jsx          # Fade in animation
│       ├── SlideIn.jsx         # Slide animation
│       └── ParallaxSection.jsx # Parallax effect
├── data/
│   ├── projects.js             # ⭐ EDIT: Your projects
│   ├── services.js             # ⭐ EDIT: Your services
│   └── testimonials.js         # ⭐ EDIT: Client testimonials
├── utils/
│   └── constants.js            # ⭐ EDIT: Personal info & config
└── context/
    └── ThemeContext.jsx        # Dark mode context
```

## 🎨 Customization Guide

### Colors

Edit `tailwind.config.js`:
```javascript
colors: {
  primary: {
    500: '#4a90e2',  // Warna utama
    // ... customize more shades
  },
  secondary: {
    500: '#8b5cf6',  // Warna sekunder
    // ... customize more shades
  },
}
```

### Fonts

1. Pilih font dari [Google Fonts](https://fonts.google.com/)
2. Update `index.html` dengan link font baru
3. Edit `tailwind.config.js`:
```javascript
fontFamily: {
  sans: ['YourFont', 'sans-serif'],
  display: ['YourDisplayFont', 'sans-serif'],
}
```

### Animations

Semua animasi menggunakan Framer Motion. Edit di:
- `src/utils/constants.js` - Animation variants
- Individual components - Untuk custom animations

## 🚀 Deployment

### Vercel (Recommended)

1. Push code ke GitHub
2. Import project di [Vercel](https://vercel.com)
3. Deploy otomatis!

### Netlify

1. Build project: `npm run build`
2. Upload folder `dist` ke [Netlify](https://netlify.com)

### GitHub Pages

1. Install gh-pages: `npm install --save-dev gh-pages`
2. Update `package.json`:
```json
{
  "homepage": "https://yourusername.github.io/portfolio",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```
3. Deploy: `npm run deploy`

## ⚡ Performance Tips

1. **Optimize Images:**
   - Gunakan format WebP
   - Compress images dengan TinyPNG
   - Use appropriate sizes (max 1920px width)

2. **Code Splitting:**
   - Sudah implemented dengan React.lazy
   - Each section loaded on demand

3. **Bundle Size:**
   - Check dengan `npm run build`
   - Target: < 200KB gzipped

## 🐛 Troubleshooting

### EmailJS Not Working
- Pastikan serviceId, templateId, dan publicKey benar
- Check Email Service di EmailJS dashboard active
- Verify template variables match

### Dark Mode Not Saving
- Check localStorage di browser console
- Clear cache and reload

### Images Not Loading
- Check URL paths (relative vs absolute)
- Verify images exist in public/ folder
- Check console for 404 errors

### Build Errors
- Delete `node_modules` dan `package-lock.json`
- Run `npm install` lagi
- Check error messages di terminal

## 📞 Support

Jika ada pertanyaan atau issues:
1. Check documentation ini
2. Search di Google/Stack Overflow
3. Check GitHub Issues
4. Contact developer

## ✅ Checklist Sebelum Deploy

- [ ] Update semua content di `constants.js`
- [ ] Ganti project data di `projects.js`
- [ ] Update services di `services.js`
- [ ] Configure EmailJS
- [ ] Replace profile photo
- [ ] Upload resume PDF ke public/
- [ ] Test dark mode
- [ ] Test responsive design
- [ ] Test contact form
- [ ] Optimize images
- [ ] Update meta tags & SEO
- [ ] Test on different browsers
- [ ] Run `npm run build` successfully

## 🎉 Selamat!

Portfolio website Anda siap untuk go live! 🚀

---

**Built with ❤️ using React + Vite + Tailwind CSS**
