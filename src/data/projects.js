// Portfolio projects for Arya Winata
export const projects = [
  {
    id: 1,
    title: 'E-Commerce Website',
    category: 'web',
    description: 'Modern online store with cart functionality',
    fullDescription: 'Built a fully functional e-commerce website with shopping cart, product catalog, search functionality, and responsive design. Implemented using modern web technologies for optimal performance.',
    image: '/images/Gemini_Generated_Image_15glm215glm215gl.png',
    placeholderVariant: 'web', // Variant untuk ProjectPlaceholder jika image tidak tersedia
    technologies: ['React', 'Tailwind CSS', 'JavaScript', 'Node.js'],
    tags: ['React', 'Tailwind'],
    liveUrl: '#',
    githubUrl: '#',
    featured: true,
    year: '2024',
    client: 'E-Commerce Client',
    duration: '2 months',
    images: [
      '/images/Gemini_Generated_Image_15glm215glm215gl.png',
    ]
  },
  {
    id: 2,
    title: 'Portfolio Website',
    category: 'ui',
    description: 'Creative portfolio with smooth animations',
    fullDescription: 'Designed and developed a creative portfolio website featuring smooth animations, modern UI/UX design, and fully responsive layout. Perfect showcase for creative professionals.',
    image: '/images/Gemini_Generated_Image_2zmaum2zmaum2zma.png',
    placeholderVariant: 'design', // Variant untuk UI/UX design
    technologies: ['Vue.js', 'CSS3', 'JavaScript', 'GSAP'],
    tags: ['Vue.js', 'CSS'],
    liveUrl: '#',
    githubUrl: '#',
    featured: true,
    year: '2024',
    client: 'Creative Professional',
    duration: '1 month',
    images: [
      '/images/Gemini_Generated_Image_2zmaum2zmaum2zma.png',
    ]
  },
  {
    id: 3,
    title: 'Dashboard App',
    category: 'web',
    description: 'Analytics dashboard with real-time data',
    fullDescription: 'Created a comprehensive analytics dashboard with real-time data visualization, interactive charts, and user-friendly interface. Built with modern frameworks for optimal performance.',
    image: '/images/Gemini_Generated_Image_pdazn8pdazn8pdaz.png',
    placeholderVariant: 'code', // Variant untuk coding project
    technologies: ['Next.js', 'Chart.js', 'React', 'Tailwind CSS'],
    tags: ['Next.js', 'Chart.js'],
    liveUrl: '#',
    githubUrl: '#',
    featured: false,
    year: '2024',
    client: 'Analytics Company',
    duration: '2 months',
    images: [
      '/images/Gemini_Generated_Image_pdazn8pdazn8pdaz.png',
    ]
  },
];

// Portfolio Categories
export const portfolioCategories = [
  { id: 'all', label: 'All Projects' },
  { id: 'web', label: 'Web Development' },
  { id: 'ui', label: 'UI/UX Design' },
  { id: 'mobile', label: 'Mobile App' },
];

export default projects;
