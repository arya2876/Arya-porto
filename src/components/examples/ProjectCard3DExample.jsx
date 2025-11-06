import ProjectCard3D from '../ui/ProjectCard3D';

/**
 * Example Usage of ProjectCard3D Component
 */
const ProjectCard3DExample = () => {
  // Sample projects data
  const sampleProjects = [
    {
      title: 'E-Commerce Platform',
      description: 'Modern online shopping experience with real-time inventory',
      image: '/images/project1.jpg',
      tags: ['React', 'Node.js', 'MongoDB']
    },
    {
      title: 'Social Media Dashboard',
      description: 'Analytics dashboard for social media management',
      image: '/images/project2.jpg',
      tags: ['Vue.js', 'Firebase']
    },
    {
      title: 'Mobile Banking App',
      description: 'Secure and user-friendly banking application',
      image: '/images/project3.jpg',
      tags: ['React Native', 'Redux']
    },
    {
      title: 'AI Chatbot System',
      description: 'Intelligent customer service automation',
      image: '/images/project4.jpg',
      tags: ['Python', 'TensorFlow']
    },
    {
      title: 'Portfolio Website',
      description: 'Creative portfolio with stunning animations',
      image: '/images/project5.jpg',
      tags: ['Next.js', 'Framer']
    },
    {
      title: 'Food Delivery App',
      description: 'Fast and reliable food ordering platform',
      image: '/images/project6.jpg',
      tags: ['React', 'Express']
    }
  ];

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-4 text-light-text dark:text-dark-text">
          3D Project Showcase
        </h1>
        <p className="text-center text-light-text-secondary dark:text-dark-text-secondary mb-12">
          Hover to pause • Auto-rotating carousel
        </p>

        {/* 3D Carousel */}
        <ProjectCard3D 
          projects={sampleProjects}
          autoRotate={true}
          rotationSpeed={25}
        />

        {/* Info */}
        <div className="mt-16 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-light-text dark:text-dark-text">
            Features
          </h2>
          <ul className="space-y-2 text-light-text-secondary dark:text-dark-text-secondary">
            <li>✨ Smooth 3D rotation animation</li>
            <li>🎨 Theme-aware colors (Light/Dark mode)</li>
            <li>🖱️ Pause on hover for better UX</li>
            <li>📱 Fully responsive design</li>
            <li>🌈 Glassmorphism with gradient overlays</li>
            <li>⚡ Hardware-accelerated performance</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard3DExample;
