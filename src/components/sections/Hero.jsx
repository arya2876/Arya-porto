import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import CountUp from 'react-countup';
import { FaGithub, FaLinkedin, FaInstagram, FaTiktok, FaDownload, FaArrowDown } from 'react-icons/fa';
import { APP_CONFIG, HERO_STATS } from '../../utils/constants';
import { personalInfo } from '../../data/personalInfo';
import Button from '../ui/Button';
import FadeIn from '../animations/FadeIn';
import ScrollGradientText from '../ui/ScrollGradientText';
import BackgroundText from '../ui/BackgroundText';
import StaggerText from '../animations/StaggerText';
import ElasticBounce from '../animations/ElasticBounce';

/**
 * Hero Section with typing animation, stats counter, and floating elements
 */
const Hero = () => {
  const scrollToAbout = () => {
    const element = document.getElementById('about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden section-padding">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-secondary-500/10 to-accent-start/10 dark:from-primary-500/5 dark:via-secondary-500/5 dark:to-accent-start/5" />
        
        {/* Animated Circles */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-br from-primary-500/20 to-secondary-500/20 blur-3xl"
            style={{
              width: `${Math.random() * 400 + 200}px`,
              height: `${Math.random() * 400 + 200}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
        ))}
      </div>

      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <FadeIn direction="left" className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Small Badge/Tag */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-block mb-6"
              >
                <span className="px-6 py-2 rounded-full bg-gradient-to-r from-primary-500/10 to-secondary-500/10 border border-primary-500/20 text-sm font-medium text-primary-500 dark:text-primary-400">
                  MODERN WEB DEVELOPER  2024
                </span>
              </motion.div>
              
              {/* Large Tagline - Omio Style with StaggerText */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <ScrollGradientText 
                  as="h1"
                  className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display mb-2 leading-tight text-light-text dark:text-dark-text"
                  scrollColor="#8B5CF6"
                >
                  <StaggerText type="chars" delay={0.5} duration={0.04}>
                    CRAFTING DIGITAL
                  </StaggerText>
                </ScrollGradientText>
                <ScrollGradientText 
                  as="h1"
                  className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display mb-2 leading-tight text-light-text dark:text-dark-text"
                  scrollColor="#3B82F6"
                >
                  <StaggerText type="chars" delay={1.2} duration={0.04}>
                    EXPERIENCES
                  </StaggerText>
                </ScrollGradientText>
                <ScrollGradientText 
                  as="h1"
                  className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display mb-8 leading-tight text-light-text dark:text-dark-text"
                  scrollColor="#06B6D4"
                >
                  <StaggerText type="chars" delay={1.7} duration={0.04}>
                    INTO REALITY
                  </StaggerText>
                </ScrollGradientText>
              </motion.div>

              {/* Subtitle with Type Animation */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mb-6"
              >
                <div className="text-xl sm:text-2xl font-display font-semibold mb-2 flex flex-wrap items-center justify-center lg:justify-start gap-3">
                  <span className="text-light-text-secondary dark:text-dark-text-secondary">I AM</span>
                  <TypeAnimation
                    sequence={[
                      'ARYA WINATA',
                      3000,
                      'FULL STACK DEVELOPER',
                      2000,
                      'UI/UX DESIGNER',
                      2000,
                      'PROBLEM SOLVER',
                      2000,
                    ]}
                    wrapper="span"
                    speed={50}
                    className="text-gradient font-bold"
                    repeat={Infinity}
                  />
                </div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-base sm:text-lg mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed text-light-text-secondary dark:text-dark-text-secondary"
              >
                As a passionate web developer and designer, I specialize in creating 
                intuitive and engaging digital experiences that blend functionality with 
                aesthetics. From concept to final product, I bring visions to life.
              </motion.p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8">
                <Button 
                  variant="gradient" 
                  size="lg"
                  icon={FaDownload}
                  onClick={() => window.open(APP_CONFIG.resumeUrl, '_blank')}
                >
                  Download CV
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Contact Me
                </Button>
              </div>

              {/* Social Links */}
              <div className="flex gap-4 justify-center lg:justify-start">
                {[
                  { icon: FaInstagram, href: APP_CONFIG.social.instagram, label: 'Instagram', colors: 'from-pink-500 to-purple-600' },
                  { icon: FaTiktok, href: APP_CONFIG.social.tiktok, label: 'TikTok', colors: 'from-black to-cyan-400' },
                  { icon: FaLinkedin, href: APP_CONFIG.social.linkedin, label: 'LinkedIn', colors: 'from-blue-600 to-blue-400' },
                  { icon: FaGithub, href: APP_CONFIG.social.github, label: 'GitHub', colors: 'from-gray-800 to-purple-600' },
                ].map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="relative p-3 rounded-full bg-transparent border-2 border-light-text-secondary/30 dark:border-dark-text-secondary/30 text-light-text-secondary dark:text-dark-text-secondary hover:border-transparent transition-all duration-300 shadow-lg group overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    whileHover={{ y: -10, scale: 1.15 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className={`absolute inset-0 bg-gradient-to-br ${social.colors} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full`} />
                    <social.icon className="w-5 h-5 relative z-10 group-hover:text-white group-hover:scale-110 transition-all" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </FadeIn>

          {/* Profile Image with Floating Animation */}
          <FadeIn direction="right" className="relative">
            <div className="relative w-full max-w-md mx-auto">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full blur-3xl opacity-30 animate-pulse-slow" />
              
              {/* Image Container */}
              <motion.div
                className="relative"
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="relative rounded-full overflow-hidden aspect-square border-4 border-white dark:border-dark-card shadow-2xl">
                  <img
                    src={personalInfo.profileImage}
                    alt={personalInfo.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = personalInfo.profileImageFallback;
                    }}
                  />
                  
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-500/20 to-transparent" />
                </div>
              </motion.div>

              {/* Floating Badges with ElasticBounce */}
              <ElasticBounce direction="right" delay={2.5} intensity={1.5}>
                <motion.div
                  className="absolute top-10 -right-4 bg-white dark:bg-dark-card rounded-2xl p-4 shadow-xl"
                  animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary-500">5+</div>
                    <div className="text-sm text-light-text-secondary dark:text-dark-text-secondary">Years Exp</div>
                  </div>
                </motion.div>
              </ElasticBounce>

              <ElasticBounce direction="left" delay={2.7} intensity={1.5}>
                <motion.div
                  className="absolute bottom-10 -left-4 bg-white dark:bg-dark-card rounded-2xl p-4 shadow-xl"
                  animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
                  transition={{ duration: 5, repeat: Infinity }}
                >
                  <div className="text-center">
                    <div className="text-3xl font-bold text-secondary-500">50+</div>
                    <div className="text-sm text-light-text-secondary dark:text-dark-text-secondary">Projects</div>
                  </div>
                </motion.div>
              </ElasticBounce>
            </div>
          </FadeIn>
        </div>

        {/* Stats Counter */}
        <FadeIn delay={0.6} className="mt-20">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {HERO_STATS.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center p-6 rounded-2xl bg-glass border border-white/20"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-4xl sm:text-5xl font-bold text-gradient mb-2">
                  <CountUp end={stat.value} duration={2.5} suffix={stat.suffix} />
                </div>
                <div className="text-light-text-secondary dark:text-dark-text-secondary">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </FadeIn>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        onClick={scrollToAbout}
      >
        <FaArrowDown className="w-6 h-6 text-light-text-secondary dark:text-dark-text-secondary" />
      </motion.div>

      {/* Large Background Text */}
      <BackgroundText text="ARYA WINATA" size="xl" animate={true} />
    </section>
  );
};

export default Hero;
