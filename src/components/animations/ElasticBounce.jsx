import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import './ElasticBounce.css';

/**
 * Elastic Bounce Reveal Component
 * Reveals content with elastic bounce animation
 */
const ElasticBounce = ({ 
  children, 
  className = '', 
  delay = 0,
  direction = 'up', // 'up', 'down', 'left', 'right', 'scale'
  intensity = 1 // 0.5 to 2
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const getInitialPosition = (direction, intensity) => {
    const distance = 100 * intensity;
    const positions = {
      up: { y: distance, x: 0 },
      down: { y: -distance, x: 0 },
      left: { x: distance, y: 0 },
      right: { x: -distance, y: 0 },
      scale: { x: 0, y: 0, scale: 0 },
    };
    return positions[direction];
  };

  const variants = {
    hidden: {
      ...getInitialPosition(direction, intensity),
      opacity: 0,
      scale: direction === 'scale' ? 0 : 0.8,
      rotateX: direction === 'up' || direction === 'down' ? -15 : 0,
      rotateY: direction === 'left' || direction === 'right' ? -15 : 0,
    },
    visible: {
      x: 0,
      y: 0,
      opacity: 1,
      scale: 1,
      rotateX: 0,
      rotateY: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
        mass: 0.75,
        delay: delay,
        duration: 1.2,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className={`elastic-bounce-container ${className}`}
      whileHover={{
        scale: 1.03,
        transition: {
          type: 'spring',
          stiffness: 400,
          damping: 10,
        },
      }}
      whileTap={{
        scale: 0.97,
      }}
    >
      {children}
    </motion.div>
  );
};

export default ElasticBounce;
