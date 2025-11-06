// App constants and configuration for Arya Winata
export const APP_CONFIG = {
  name: 'Arya Winata Portfolio',
  author: 'Arya Winata',
  email: 'arya@example.com',
  phone: '+62 812-3456-7890',
  location: 'Indonesia',
  social: {
    instagram: '#',
    tiktok: '#',
    linkedin: '#',
    github: 'https://github.com/arya2876',
  },
  resumeUrl: '/resume.pdf',
};

// Navigation links
export const NAV_LINKS = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Services', href: '#services' },
  { name: 'Portfolio', href: '#portfolio' },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'Contact', href: '#contact' },
];

// Animation variants for Framer Motion
export const FADE_IN_VARIANTS = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

export const FADE_IN_UP_VARIANTS = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

export const FADE_IN_DOWN_VARIANTS = {
  hidden: { opacity: 0, y: -40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

export const SLIDE_IN_LEFT_VARIANTS = {
  hidden: { opacity: 0, x: -100 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

export const SLIDE_IN_RIGHT_VARIANTS = {
  hidden: { opacity: 0, x: 100 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

export const SCALE_IN_VARIANTS = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

export const STAGGER_CONTAINER_VARIANTS = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export const STAGGER_ITEM_VARIANTS = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
};

// Hero statistics for Arya Winata
export const HERO_STATS = [
  { value: 15, suffix: '+', label: 'Projects Completed' },
  { value: 3, suffix: '+', label: 'Years Experience' },
  { value: 50, suffix: '+', label: 'Happy Clients' },
];

// Skills data
export const SKILLS = [
  { name: 'React.js', level: 95, category: 'frontend' },
  { name: 'JavaScript', level: 90, category: 'frontend' },
  { name: 'TypeScript', level: 85, category: 'frontend' },
  { name: 'Tailwind CSS', level: 90, category: 'frontend' },
  { name: 'Node.js', level: 85, category: 'backend' },
  { name: 'Express.js', level: 80, category: 'backend' },
  { name: 'MongoDB', level: 75, category: 'backend' },
  { name: 'PostgreSQL', level: 70, category: 'backend' },
  { name: 'Git', level: 90, category: 'tools' },
  { name: 'Docker', level: 75, category: 'tools' },
  { name: 'AWS', level: 70, category: 'tools' },
  { name: 'Figma', level: 85, category: 'design' },
];

// Tech stack icons
export const TECH_STACK = [
  'React', 'JavaScript', 'TypeScript', 'Node.js', 'Tailwind CSS',
  'Next.js', 'MongoDB', 'PostgreSQL', 'GraphQL', 'Docker',
  'AWS', 'Git', 'Figma', 'Framer Motion', 'GSAP'
];

// Portfolio categories
export const PORTFOLIO_CATEGORIES = [
  { id: 'all', label: 'All Projects' },
  { id: 'web', label: 'Web Development' },
  { id: 'ui', label: 'UI/UX Design' },
  { id: 'mobile', label: 'Mobile Apps' },
];

// Breakpoints (matching Tailwind)
export const BREAKPOINTS = {
  xs: 320,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

// EmailJS configuration (replace with your own)
export const EMAILJS_CONFIG = {
  serviceId: 'YOUR_SERVICE_ID',
  templateId: 'YOUR_TEMPLATE_ID',
  publicKey: 'YOUR_PUBLIC_KEY',
};

// Toast notification settings
export const TOAST_CONFIG = {
  position: 'top-right',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

// SEO meta tags
export const SEO_CONFIG = {
  title: 'Arya Winata - Web Developer & UI/UX Designer',
  description: 'Portfolio website of Arya Winata showcasing modern web development, UI/UX design, and mobile responsive projects.',
  keywords: 'portfolio, web developer, designer, react, vue.js, javascript, frontend, UI/UX, Arya Winata',
  ogImage: '/images/gambar1.png',
  twitterHandle: '@aryawinata',
};

