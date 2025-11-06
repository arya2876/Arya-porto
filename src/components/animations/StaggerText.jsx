import { motion } from 'framer-motion';
import { useMemo } from 'react';

/**
 * Stagger Text Animation Component
 * Animates text character by character with gradient effect
 */
const StaggerText = ({ 
  children, 
  className = '', 
  delay = 0,
  duration = 0.05,
  type = 'chars' // 'chars' or 'words'
}) => {
  const textArray = useMemo(() => {
    // Convert children to string if it's not already
    const text = typeof children === 'string' ? children : String(children || '');
    
    if (type === 'words') {
      return text.split(' ').map(word => word + ' ');
    }
    return text.split('');
  }, [children, type]);

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: duration, delayChildren: delay },
    },
  };

  const child = {
    hidden: {
      opacity: 0,
      y: 10,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 15,
        stiffness: 120,
      },
    },
  };

  return (
    <motion.span
      style={{ display: 'inline-block' }}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className={className}
    >
      {textArray.map((char, index) => (
        <motion.span
          key={index}
          variants={child}
          style={{ 
            display: 'inline-block',
            whiteSpace: char === ' ' ? 'pre' : 'normal'
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
};

export default StaggerText;
