import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * ScrollGradientText Component
 * Text with gradient that reveals second color on scroll
 * 
 * @param {string} children - Text content
 * @param {string} className - Additional CSS classes
 * @param {string} as - HTML tag to use (default: 'h2')
 * @param {string} baseColor - Base/primary color (default: text color)
 * @param {string} scrollColor - Color revealed on scroll (default: primary color)
 */
const ScrollGradientText = ({ 
  children, 
  className = '', 
  as = 'h2',
  scrollColor = '#8B5CF6'
}) => {
  const ref = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;

      const element = ref.current;
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      let progress = 0;
      
      if (rect.top <= windowHeight && rect.bottom >= 0) {
        const elementHeight = rect.height;
        const elementTop = rect.top;
        
        if (elementTop < windowHeight) {
          progress = Math.min(1, Math.max(0, (windowHeight - elementTop) / (windowHeight + elementHeight / 2)));
        }
      } else if (rect.top < 0) {
        progress = 1;
      }
      
      setScrollProgress(progress);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const Component = motion[as] || motion.h2;
  const gradientStop = scrollProgress * 100;

  return (
    <Component
      ref={ref}
      className={`font-bold ${className}`}
      style={{
        backgroundImage: `linear-gradient(90deg, ${scrollColor} 0%, ${scrollColor} ${gradientStop}%, currentColor ${gradientStop}%, currentColor 100%)`,
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        display: 'inline-block',
      }}
    >
      {children}
    </Component>
  );
};

export default ScrollGradientText;
