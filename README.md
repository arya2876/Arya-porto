# Modern Portfolio Website

A beautiful, modern, and responsive portfolio website built with React, Tailwind CSS, and Framer Motion.

## 🚀 Features

- ✨ Modern and clean design
- 🎨 Dark/Light mode with smooth transitions
- 📱 Fully responsive (mobile, tablet, desktop)
- 🎭 Advanced animations with Framer Motion
- ⚡ Optimized performance with code splitting
- 🎯 SEO-friendly
- ♿ Accessible (WCAG 2.1 compliant)
- 📧 Working contact form with EmailJS
- 🎨 Smooth scroll animations
- 💼 Portfolio filtering
- 💬 Testimonials carousel
- 📊 Skills visualization

## 🛠️ Tech Stack

- **Frontend Framework:** React 18+
- **Build Tool:** Vite
- **Styling:** Tailwind CSS 3+
- **Animations:** Framer Motion, AOS
- **Icons:** React Icons
- **Forms:** EmailJS
- **Type Animation:** React Type Animation
- **Counter:** React CountUp
- **Toast Notifications:** React Toastify

## 📦 Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd portfolio-react
```

2. Install dependencies:
```bash
npm install
```

3. Configure EmailJS:
   - Sign up at [EmailJS](https://www.emailjs.com/)
   - Create a service and template
   - Update `src/utils/constants.js` with your EmailJS credentials:
```javascript
export const EMAILJS_CONFIG = {
  serviceId: 'YOUR_SERVICE_ID',
  templateId: 'YOUR_TEMPLATE_ID',
  publicKey: 'YOUR_PUBLIC_KEY',
};
```

4. Customize content:
   - Update `src/utils/constants.js` with your information
   - Modify `src/data/projects.js` with your projects
   - Update `src/data/services.js` with your services
   - Change `src/data/testimonials.js` with real testimonials

## 🎯 Development

Start the development server:
```bash
npm run dev
```

The site will be available at `http://localhost:3000`

## 🏗️ Build

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## 📁 Project Structure

```
portfolio-react/
├── src/
│   ├── components/
│   │   ├── layout/         # Layout components (Navbar, Footer, Layout)
│   │   ├── sections/       # Page sections (Hero, About, Portfolio, etc.)
│   │   ├── ui/            # Reusable UI components (Button, Card, Modal, etc.)
│   │   └── animations/    # Animation components (FadeIn, SlideIn, Parallax)
│   ├── hooks/             # Custom React hooks
│   ├── context/           # React context (Theme)
│   ├── data/              # Static data (projects, services, testimonials)
│   ├── utils/             # Utility functions and constants
│   ├── App.jsx            # Main app component
│   ├── main.jsx           # Entry point
│   └── index.css          # Global styles
├── public/                # Static assets
├── index.html             # HTML template
├── tailwind.config.js     # Tailwind configuration
├── vite.config.js         # Vite configuration
└── package.json           # Dependencies and scripts
```

## 🎨 Customization

### Colors

Edit `tailwind.config.js` to change the color scheme:
```javascript
colors: {
  primary: '#your-color',
  secondary: '#your-color',
  // ... more colors
}
```

### Fonts

Update Google Fonts in `index.html` and `tailwind.config.js`

### Content

- **Personal Info:** `src/utils/constants.js`
- **Projects:** `src/data/projects.js`
- **Services:** `src/data/services.js`
- **Testimonials:** `src/data/testimonials.js`

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Deploy!

### Netlify

1. Build the project: `npm run build`
2. Drag and drop `dist` folder to Netlify
3. Configure redirects if needed

### Other Platforms

Build and deploy the `dist` folder to any static hosting service.

## ⚡ Performance

- Code splitting with React.lazy
- Image lazy loading
- Optimized bundle size
- Memoization with React.memo
- Debounced scroll events

## 📝 License

MIT License - feel free to use this for your own portfolio!

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📧 Contact

Your Name - your.email@example.com

Project Link: [https://github.com/yourusername/portfolio](https://github.com/yourusername/portfolio)

---

Made with ❤️ and React
