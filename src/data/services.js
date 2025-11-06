import { FaCode, FaPalette, FaMobile } from 'react-icons/fa';

// Services data for Arya Winata
export const services = [
  {
    id: 1,
    number: '01',
    icon: FaCode,
    title: 'Web Development',
    description: 'Creating responsive and modern websites using latest technologies and best practices for optimal performance.',
    features: [
      'Responsive Design',
      'Modern Frameworks',
      'Fast Loading',
      'SEO Optimized',
      'Cross-browser Compatible',
      'Clean Code'
    ],
    technologies: ['React', 'Vue.js', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS'],
    pricing: 'Custom Quote',
    deliveryTime: '2-4 weeks',
    color: 'from-purple-500 to-purple-700',
    gradient: 'from-purple-500 to-purple-700',
    featured: false
  },
  {
    id: 2,
    number: '02',
    icon: FaPalette,
    title: 'UI/UX Design',
    description: 'Designing beautiful and user-friendly interfaces that provide exceptional user experience and engagement.',
    features: [
      'User Research',
      'Wireframing',
      'Prototyping',
      'Visual Design',
      'Interaction Design',
      'Usability Testing'
    ],
    technologies: ['Figma', 'Adobe XD', 'Sketch', 'InVision', 'Photoshop'],
    pricing: 'Custom Quote',
    deliveryTime: '1-3 weeks',
    color: 'from-pink-500 to-red-500',
    gradient: 'from-pink-500 to-red-500',
    featured: true
  },
  {
    id: 3,
    number: '03',
    icon: FaMobile,
    title: 'Mobile Responsive',
    description: 'Ensuring your website works perfectly on all devices and screen sizes with seamless user experience.',
    features: [
      'Cross-device Testing',
      'Touch Optimization',
      'Progressive Web App',
      'Mobile-First Design',
      'Performance Optimization',
      'Adaptive Layouts'
    ],
    technologies: ['Responsive Design', 'PWA', 'Mobile Optimization', 'Tailwind CSS'],
    pricing: 'Included',
    deliveryTime: 'With main project',
    color: 'from-blue-500 to-cyan-500',
    gradient: 'from-blue-500 to-cyan-500',
    featured: false
  },
];

export default services;
