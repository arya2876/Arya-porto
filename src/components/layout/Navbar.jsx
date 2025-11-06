import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaGithub, FaLinkedin, FaInstagram, FaTiktok } from 'react-icons/fa';
import { NAV_LINKS, APP_CONFIG } from '../../utils/constants';
import ThemeToggle from '../ui/ThemeToggle';
import ExpandableLogo from '../ui/ExpandableLogo';
import useScrollAnimation from '../../hooks/useScrollAnimation';

/**
 * NavLink Component with gradient hover effect
 */
const NavLink = ({ link, index, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.a
      href={link.href}
      onClick={onClick}
      className="relative text-light-text dark:text-dark-text font-medium overflow-hidden group"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Text with gradient on hover */}
      <motion.span
        className="relative z-10 transition-all duration-300"
        animate={{
          background: isHovered
            ? 'linear-gradient(90deg, #8B5CF6, #3B82F6, #8B5CF6)'
            : 'transparent',
          backgroundClip: isHovered ? 'text' : 'border-box',
          WebkitBackgroundClip: isHovered ? 'text' : 'border-box',
          WebkitTextFillColor: isHovered ? 'transparent' : 'currentColor',
          backgroundSize: '200% 100%',
        }}
        style={{
          backgroundPosition: '0% 0%',
          animation: isHovered ? 'gradient-flow 3s ease infinite' : 'none',
        }}
      >
        {link.name}
      </motion.span>

      {/* Underline effect */}
      <motion.span
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500"
        initial={{ width: '0%' }}
        animate={{ width: isHovered ? '100%' : '0%' }}
        transition={{ duration: 0.3 }}
      />

      {/* Glow effect */}
      {isHovered && (
        <motion.span
          className="absolute inset-0 -z-10 blur-xl bg-gradient-to-r from-primary-500/20 to-secondary-500/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}
    </motion.a>
  );
};

/**
 * Navbar Component with scroll animations and mobile menu
 */
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isScrolled } = useScrollAnimation();

  // Close mobile menu when scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (isOpen) setIsOpen(false);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isOpen]);

  // Handle smooth scroll to section
  const handleNavClick = (e, href) => {
    e.preventDefault();
    setIsOpen(false);

    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
      const offset = 80; // Navbar height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`
          fixed top-0 left-0 right-0 z-50 transition-all duration-300
          ${isScrolled 
            ? 'bg-light-card/80 dark:bg-dark-card/80 backdrop-blur-md shadow-lg' 
            : 'bg-transparent'
          }
        `}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-20">
            {/* Logo - Expandable AW -> Arya Winata */}
            <ExpandableLogo onClick={(e) => handleNavClick(e, '#home')} />

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {NAV_LINKS.map((link, index) => (
                <NavLink
                  key={link.name}
                  link={link}
                  index={index}
                  onClick={(e) => handleNavClick(e, link.href)}
                />
              ))}
            </div>

            {/* Right Side - Social & Theme Toggle */}
            <div className="hidden lg:flex items-center gap-4">
              {/* Social Icons */}
              <div className="flex items-center gap-3">
                <motion.a
                  href={APP_CONFIG.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative w-10 h-10 flex items-center justify-center rounded-xl bg-transparent border-2 border-light-text-secondary/30 dark:border-dark-text-secondary/30 text-light-text-secondary dark:text-dark-text-secondary hover:border-transparent shadow-md transition-all duration-300 group overflow-hidden"
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="absolute inset-0 bg-gradient-to-br from-pink-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                  <FaInstagram className="w-5 h-5 relative z-10 group-hover:text-white group-hover:scale-110 transition-all" />
                </motion.a>
                <motion.a
                  href={APP_CONFIG.social.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative w-10 h-10 flex items-center justify-center rounded-xl bg-transparent border-2 border-light-text-secondary/30 dark:border-dark-text-secondary/30 text-light-text-secondary dark:text-dark-text-secondary hover:border-transparent shadow-md transition-all duration-300 group overflow-hidden"
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="absolute inset-0 bg-gradient-to-br from-black to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                  <FaTiktok className="w-5 h-5 relative z-10 group-hover:text-white group-hover:scale-110 transition-all" />
                </motion.a>
                <motion.a
                  href={APP_CONFIG.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative w-10 h-10 flex items-center justify-center rounded-xl bg-transparent border-2 border-light-text-secondary/30 dark:border-dark-text-secondary/30 text-light-text-secondary dark:text-dark-text-secondary hover:border-transparent shadow-md transition-all duration-300 group overflow-hidden"
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                  <FaLinkedin className="w-5 h-5 relative z-10 group-hover:text-white group-hover:scale-110 transition-all" />
                </motion.a>
                <motion.a
                  href={APP_CONFIG.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative w-10 h-10 flex items-center justify-center rounded-xl bg-transparent border-2 border-light-text-secondary/30 dark:border-dark-text-secondary/30 text-light-text-secondary dark:text-dark-text-secondary hover:border-transparent shadow-md transition-all duration-300 group overflow-hidden"
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="absolute inset-0 bg-gradient-to-br from-gray-800 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                  <FaGithub className="w-5 h-5 relative z-10 group-hover:text-white group-hover:scale-110 transition-all" />
                </motion.a>
              </div>

              <div className="w-px h-6 bg-light-border dark:bg-dark-border" />
              
              <ThemeToggle />
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center gap-4">
              <ThemeToggle />
              <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg hover:bg-light-card dark:hover:bg-dark-card transition-colors"
                whileTap={{ scale: 0.9 }}
                aria-label="Toggle menu"
              >
                {isOpen ? (
                  <FaTimes className="w-6 h-6 text-light-text dark:text-dark-text" />
                ) : (
                  <FaBars className="w-6 h-6 text-light-text dark:text-dark-text" />
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-20 right-0 bottom-0 left-0 z-40 lg:hidden bg-light-card/95 dark:bg-dark-card/95 backdrop-blur-lg"
          >
            <div className="container-custom py-8">
              <div className="flex flex-col gap-6">
                {NAV_LINKS.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="relative text-2xl font-semibold text-light-text dark:text-dark-text transition-all duration-300 group overflow-hidden"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 10 }}
                  >
                    {/* Gradient background on hover */}
                    <span className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                    {/* Text with gradient on hover */}
                    <span className="relative z-10 group-hover:bg-gradient-to-r group-hover:from-primary-500 group-hover:to-secondary-500 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                      {link.name}
                    </span>
                    {/* Arrow indicator */}
                    <span className="inline-block ml-2 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-2 transition-all duration-300">
                      →
                    </span>
                  </motion.a>
                ))}

                <div className="mt-8 flex items-center gap-6">
                  <motion.a
                    href={APP_CONFIG.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative w-12 h-12 flex items-center justify-center rounded-xl bg-transparent border-2 border-light-text-secondary/30 dark:border-dark-text-secondary/30 text-light-text-secondary dark:text-dark-text-secondary hover:border-transparent shadow-md transition-all duration-300 group overflow-hidden"
                    whileHover={{ y: -5, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="absolute inset-0 bg-gradient-to-br from-pink-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                    <FaInstagram className="w-6 h-6 relative z-10 group-hover:text-white group-hover:scale-110 transition-all" />
                  </motion.a>
                  <motion.a
                    href={APP_CONFIG.social.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative w-12 h-12 flex items-center justify-center rounded-xl bg-transparent border-2 border-light-text-secondary/30 dark:border-dark-text-secondary/30 text-light-text-secondary dark:text-dark-text-secondary hover:border-transparent shadow-md transition-all duration-300 group overflow-hidden"
                    whileHover={{ y: -5, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="absolute inset-0 bg-gradient-to-br from-black to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                    <FaTiktok className="w-6 h-6 relative z-10 group-hover:text-white group-hover:scale-110 transition-all" />
                  </motion.a>
                  <motion.a
                    href={APP_CONFIG.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative w-12 h-12 flex items-center justify-center rounded-xl bg-transparent border-2 border-light-text-secondary/30 dark:border-dark-text-secondary/30 text-light-text-secondary dark:text-dark-text-secondary hover:border-transparent shadow-md transition-all duration-300 group overflow-hidden"
                    whileHover={{ y: -5, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                    <FaLinkedin className="w-6 h-6 relative z-10 group-hover:text-white group-hover:scale-110 transition-all" />
                  </motion.a>
                  <motion.a
                    href={APP_CONFIG.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative w-12 h-12 flex items-center justify-center rounded-xl bg-transparent border-2 border-light-text-secondary/30 dark:border-dark-text-secondary/30 text-light-text-secondary dark:text-dark-text-secondary hover:border-transparent shadow-md transition-all duration-300 group overflow-hidden"
                    whileHover={{ y: -5, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="absolute inset-0 bg-gradient-to-br from-gray-800 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                    <FaGithub className="w-6 h-6 relative z-10 group-hover:text-white group-hover:scale-110 transition-all" />
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
