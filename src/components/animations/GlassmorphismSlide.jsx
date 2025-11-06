import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import './GlassmorphismSlide.css';

/**
 * Glassmorphism Slide Animation Component
 * Creates a frosted glass effect that slides in from the side
 */
const GlassmorphismSlide = ({ 
  children, 
  className = '', 
  direction = 'left', // 'left', 'right', 'top', 'bottom'
  delay = 0,
  duration = 0.8
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const directionVariants = {
    left: { x: -100, opacity: 0 },
    right: { x: 100, opacity: 0 },
    top: { y: -100, opacity: 0 },
    bottom: { y: 100, opacity: 0 },
  };

  const variants = {
    hidden: {
      ...directionVariants[direction],
      scale: 0.9,
      filter: 'blur(20px)',
    },
    visible: {
      x: 0,
      y: 0,
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: duration,
        delay: delay,
        ease: [0.25, 0.46, 0.45, 0.94], // Elegant easing
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className={`glassmorphism-container ${className}`}
    >
      <div className="glassmorphism-content">
        {children}
      </div>
    </motion.div>
  );
};

export default GlassmorphismSlide;
