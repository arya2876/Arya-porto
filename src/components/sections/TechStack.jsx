import { motion } from 'framer-motion';
import { 
  FaReact, FaNodeJs, FaVuejs, FaHtml5, FaCss3Alt, FaJsSquare, 
  FaGitAlt, FaDocker, FaAws, FaFigma, FaNpm, FaGithub 
} from 'react-icons/fa';
import { 
  SiTypescript, SiTailwindcss, SiMongodb, SiPostgresql, 
  SiNextdotjs, SiExpress, SiRedux, SiWebpack, SiVite,
  SiFramer, SiVercel, SiNetlify
} from 'react-icons/si';
import MarqueeText from '../ui/MarqueeText';
import FadeIn from '../animations/FadeIn';
import ScrollGradientText from '../ui/ScrollGradientText';

/**
 * Tech Stack Section with Marquee Scrolling Effect - Omio Inspired
 */
const TechStack = () => {
  const technologies = [
    { name: 'React', icon: FaReact, color: '#61DAFB' },
    { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
    { name: 'Next.js', icon: SiNextdotjs, color: '#000000' },
    { name: 'Vue.js', icon: FaVuejs, color: '#4FC08D' },
    { name: 'Node.js', icon: FaNodeJs, color: '#339933' },
    { name: 'Express', icon: SiExpress, color: '#000000' },
    { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
    { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1' },
    { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
    { name: 'HTML5', icon: FaHtml5, color: '#E34F26' },
    { name: 'CSS3', icon: FaCss3Alt, color: '#1572B6' },
    { name: 'JavaScript', icon: FaJsSquare, color: '#F7DF1E' },
    { name: 'Git', icon: FaGitAlt, color: '#F05032' },
    { name: 'GitHub', icon: FaGithub, color: '#181717' },
    { name: 'Docker', icon: FaDocker, color: '#2496ED' },
    { name: 'AWS', icon: FaAws, color: '#FF9900' },
    { name: 'Figma', icon: FaFigma, color: '#F24E1E' },
    { name: 'Redux', icon: SiRedux, color: '#764ABC' },
    { name: 'Webpack', icon: SiWebpack, color: '#8DD6F9' },
    { name: 'Vite', icon: SiVite, color: '#646CFF' },
    { name: 'Framer Motion', icon: SiFramer, color: '#0055FF' },
    { name: 'Vercel', icon: SiVercel, color: '#000000' },
    { name: 'Netlify', icon: SiNetlify, color: '#00C7B7' },
    { name: 'npm', icon: FaNpm, color: '#CB3837' },
  ];

  // Split into two rows for marquee
  const row1 = technologies.slice(0, Math.ceil(technologies.length / 2));
  const row2 = technologies.slice(Math.ceil(technologies.length / 2));

  const TechItem = ({ tech }) => (
    <motion.div
      className="group relative flex items-center gap-4 px-8 py-6 rounded-2xl bg-light-card dark:bg-dark-card border-2 border-light-border dark:border-dark-border hover:border-primary-500/50 transition-all duration-300 cursor-pointer"
      whileHover={{ scale: 1.05, y: -4 }}
      transition={{ type: 'spring', stiffness: 400 }}
    >
      {/* Gradient Background on Hover */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
        style={{
          background: `linear-gradient(135deg, ${tech.color}10, ${tech.color}30)`,
        }}
      />
      
      {/* Icon */}
      <div className="relative z-10">
        <tech.icon 
          className="w-10 h-10 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6" 
          style={{ color: tech.color }}
        />
      </div>
      
      {/* Name with Gradient Text Effect on Hover */}
      <span className="relative z-10 text-lg font-semibold text-light-text dark:text-dark-text group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r transition-all duration-300"
        style={{
          backgroundImage: `linear-gradient(135deg, ${tech.color}, ${tech.color}CC)`,
        }}
      >
        {tech.name}
      </span>

      {/* Glow Effect */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 rounded-2xl"
        style={{ backgroundColor: tech.color }}
      />
    </motion.div>
  );

  return (
    <section className="py-20 bg-light-bg dark:bg-dark-bg relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }} />
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <FadeIn className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-primary-500/10 to-secondary-500/10 border border-primary-500/20 text-sm font-medium text-primary-500 dark:text-primary-400 mb-6">
              MY EXPERTISE
            </span>
            <div className="mb-6">
              <ScrollGradientText 
                as="span"
                className="text-4xl sm:text-5xl lg:text-6xl font-display text-light-text dark:text-dark-text"
                scrollColor="#3B82F6"
              >
                TECHNOLOGIES
              </ScrollGradientText>
              <ScrollGradientText 
                as="span"
                className="text-4xl sm:text-5xl lg:text-6xl font-display ml-4 text-light-text dark:text-dark-text"
                scrollColor="#8B5CF6"
              >
                I WORK WITH
              </ScrollGradientText>
            </div>
            <p className="text-lg max-w-3xl mx-auto text-light-text-secondary dark:text-dark-text-secondary">
              Mastering modern tools and frameworks to build exceptional digital experiences
            </p>
          </motion.div>
        </FadeIn>

        {/* Scrolling Tech Stack - Row 1 (Left to Right) */}
        <div className="mb-8">
          <MarqueeText
            items={row1.map((tech) => <TechItem key={tech.name} tech={tech} />)}
            direction="left"
            speed={40}
          />
        </div>

        {/* Scrolling Tech Stack - Row 2 (Right to Left) */}
        <div>
          <MarqueeText
            items={row2.map((tech) => <TechItem key={tech.name} tech={tech} />)}
            direction="right"
            speed={45}
          />
        </div>
      </div>

      {/* Large Transparent Background Text - Omio Style */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <motion.div
          className="text-[15rem] sm:text-[20rem] lg:text-[25rem] font-bold font-display opacity-[0.02] dark:opacity-[0.03] whitespace-nowrap select-none"
          initial={{ x: '-10%' }}
          animate={{ x: '10%' }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'linear',
          }}
        >
          TECH STACK
        </motion.div>
      </div>
    </section>
  );
};

export default TechStack;
