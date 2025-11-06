import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import './SlidingMask.css';

/**
 * Sliding Mask Reveal Component
 * Reveals content with a sliding mask effect
 */
const SlidingMask = ({ 
  children, 
  className = '', 
  direction = 'right', // 'left', 'right', 'top', 'bottom'
  delay = 0,
  duration = 1.2,
  maskColor = 'linear-gradient(135deg, rgba(139, 92, 246, 0.9), rgba(59, 130, 246, 0.9))'
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const getMaskPosition = (direction, progress) => {
    const positions = {
      left: { left: progress, right: 'auto' },
      right: { right: progress, left: 'auto' },
      top: { top: progress, bottom: 'auto' },
      bottom: { bottom: progress, top: 'auto' },
    };
    return positions[direction];
  };

  const maskVariants = {
    hidden: {
      width: direction === 'left' || direction === 'right' ? '100%' : '100%',
      height: direction === 'top' || direction === 'bottom' ? '100%' : '100%',
    },
    visible: {
      width: direction === 'left' || direction === 'right' ? '0%' : '100%',
      height: direction === 'top' || direction === 'bottom' ? '0%' : '100%',
      transition: {
        duration: duration,
        delay: delay,
        ease: [0.65, 0, 0.35, 1], // Smooth easing
      },
    },
  };

  const contentVariants = {
    hidden: {
      opacity: 0,
      scale: 1.1,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: duration * 0.8,
        delay: delay + duration * 0.3,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <div ref={ref} className={`sliding-mask-wrapper ${className}`}>
      <motion.div
        className="sliding-mask-content"
        variants={contentVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {children}
      </motion.div>
      
      <motion.div
        className="sliding-mask-overlay"
        style={{
          background: maskColor,
          ...getMaskPosition(direction, 0),
        }}
        variants={maskVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      />
    </div>
  );
};

export default SlidingMask;
