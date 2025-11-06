import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaInstagram, FaTiktok, FaHeart, FaArrowUp } from 'react-icons/fa';
import { APP_CONFIG, NAV_LINKS } from '../../utils/constants';
import useScrollAnimation from '../../hooks/useScrollAnimation';

/**
 * Footer Component with multiple sections and back-to-top button
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { scrollToTop } = useScrollAnimation();

  const socialLinks = [
    { icon: FaInstagram, href: APP_CONFIG.social.instagram, label: 'Instagram', colors: 'from-pink-500 to-purple-600', hoverShadow: 'hover:shadow-pink-500/50' },
    { icon: FaTiktok, href: APP_CONFIG.social.tiktok, label: 'TikTok', colors: 'from-black to-cyan-400', hoverShadow: 'hover:shadow-cyan-400/50' },
    { icon: FaLinkedin, href: APP_CONFIG.social.linkedin, label: 'LinkedIn', colors: 'from-blue-600 to-blue-400', hoverShadow: 'hover:shadow-blue-500/50' },
    { icon: FaGithub, href: APP_CONFIG.social.github, label: 'GitHub', colors: 'from-gray-800 to-purple-600', hoverShadow: 'hover:shadow-purple-500/50' },
  ];

  const quickLinks = NAV_LINKS.slice(1, 5); // Skip "Home" for footer

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <footer className="relative bg-light-card dark:bg-dark-card border-t border-light-border dark:border-dark-border overflow-hidden">
      {/* Large Transparent Background Text - Omio Style */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <motion.div
          className="text-[12rem] sm:text-[15rem] lg:text-[20rem] font-bold font-display opacity-[0.015] dark:opacity-[0.025] whitespace-nowrap select-none"
          initial={{ x: '-20%' }}
          animate={{ x: '20%' }}
          transition={{
            duration: 30,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'linear',
          }}
        >
          ARYA WINATA
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary-500/5 rounded-full blur-3xl" />
      
      <div className="container-custom py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <motion.h3 
              className="text-3xl font-bold font-display"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500">
                {APP_CONFIG.author.toUpperCase()}
              </span>
            </motion.h3>
            <p className="text-light-text-secondary dark:text-dark-text-secondary leading-relaxed">
              Modern portfolio showcasing digital craftsmanship and innovative solutions.
              Creating experiences that blend functionality with aesthetics.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="p-3 rounded-xl bg-transparent border-2 border-light-text-secondary/30 dark:border-dark-text-secondary/30 text-light-text-secondary dark:text-dark-text-secondary hover:border-transparent transition-all duration-300 shadow-lg group relative overflow-hidden"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Colored background on hover */}
                  <span className={`absolute inset-0 bg-gradient-to-br ${social.colors} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl`} />
                  <social.icon className="w-5 h-5 relative z-10 group-hover:text-white group-hover:scale-110 transition-all" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold font-display text-light-text dark:text-dark-text tracking-wide">
              NAVIGATION
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="text-light-text-secondary dark:text-dark-text-secondary hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold font-display text-light-text dark:text-dark-text tracking-wide">
              SERVICES
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#services" className="text-light-text-secondary dark:text-dark-text-secondary hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                  Web Development
                </a>
              </li>
              <li>
                <a href="#services" className="text-light-text-secondary dark:text-dark-text-secondary hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                  UI/UX Design
                </a>
              </li>
              <li>
                <a href="#services" className="text-light-text-secondary dark:text-dark-text-secondary hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                  Mobile Development
                </a>
              </li>
              <li>
                <a href="#services" className="text-light-text-secondary dark:text-dark-text-secondary hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                  Consulting
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold font-display text-light-text dark:text-dark-text tracking-wide">
              CONTACT
            </h4>
            <ul className="space-y-2 text-light-text-secondary dark:text-dark-text-secondary">
              <li>
                <a 
                  href={`mailto:${APP_CONFIG.email}`}
                  className="hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                >
                  {APP_CONFIG.email}
                </a>
              </li>
              <li>
                <a 
                  href={`tel:${APP_CONFIG.phone}`}
                  className="hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                >
                  {APP_CONFIG.phone}
                </a>
              </li>
              <li>{APP_CONFIG.location}</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-light-border dark:border-dark-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <motion.p 
              className="text-light-text-secondary dark:text-dark-text-secondary text-sm text-center md:text-left"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              © {currentYear} <span className="font-semibold text-gradient">{APP_CONFIG.author}</span>. All rights reserved. 
              <span className="hidden sm:inline"> Crafted with{' '}
                <FaHeart className="inline w-4 h-4 text-red-500 animate-pulse" /> and passion
              </span>
            </motion.p>
            <div className="flex items-center gap-6 text-sm">
              <a 
                href="#privacy" 
                className="text-light-text-secondary dark:text-dark-text-secondary hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
              >
                Privacy Policy
              </a>
              <a 
                href="#terms" 
                className="text-light-text-secondary dark:text-dark-text-secondary hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 p-3 rounded-full bg-primary-500 text-white shadow-lg hover:shadow-xl z-40"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        aria-label="Back to top"
      >
        <FaArrowUp className="w-5 h-5" />
      </motion.button>
    </footer>
  );
};

export default Footer;
