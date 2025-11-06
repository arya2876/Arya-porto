import { FaLightbulb, FaPencilRuler, FaCode, FaRocket } from 'react-icons/fa';

// Working Process data - Omio style
export const workingProcess = [
  {
    id: 1,
    number: '01',
    icon: FaLightbulb,
    title: 'DISCOVERY AND STRATEGY',
    description: 'We start by deeply understanding your brand, goals, and target audience through comprehensive research and strategic planning.',
    features: [
      'Client consultation & requirements gathering',
      'Market & competitor analysis',
      'Project scope definition',
      'Strategy roadmap creation'
    ],
    color: 'from-blue-500 to-cyan-500',
    gradient: 'from-blue-500/10 to-cyan-500/10'
  },
  {
    id: 2,
    number: '02',
    icon: FaPencilRuler,
    title: 'DESIGN AND PLANNING',
    description: 'Creating wireframes, mockups, and interactive prototypes to visualize the final product before development begins.',
    features: [
      'Wireframing & prototyping',
      'UI/UX design creation',
      'Design system development',
      'Client feedback & iterations'
    ],
    color: 'from-purple-500 to-pink-500',
    gradient: 'from-purple-500/10 to-pink-500/10'
  },
  {
    id: 3,
    number: '03',
    icon: FaCode,
    title: 'DEVELOPMENT AND BUILD',
    description: 'Transforming designs into functional, high-performance applications using modern technologies and best practices.',
    features: [
      'Clean & scalable code',
      'Responsive development',
      'API integration',
      'Quality assurance testing'
    ],
    color: 'from-orange-500 to-red-500',
    gradient: 'from-orange-500/10 to-red-500/10'
  },
  {
    id: 4,
    number: '04',
    icon: FaRocket,
    title: 'LAUNCH AND SUPPORT',
    description: 'Deploying your project to production and providing ongoing support to ensure optimal performance and success.',
    features: [
      'Production deployment',
      'Performance optimization',
      'Post-launch monitoring',
      'Ongoing maintenance & updates'
    ],
    color: 'from-green-500 to-emerald-500',
    gradient: 'from-green-500/10 to-emerald-500/10'
  }
];

export default workingProcess;
