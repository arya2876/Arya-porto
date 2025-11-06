import { motion } from 'framer-motion';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

/**
 * FadeIn Animation Component
 * Fades in element when it enters viewport
 */
const FadeIn = ({ 
  children, 
  delay = 0, 
  duration = 0.6,
  direction = 'up', // up, down, left, right, none
  distance = 40,
  className = '',
  once = true,
  ...props 
}) => {
  const [ref, isIntersecting] = useIntersectionObserver({
    threshold: 0.1,
    freezeOnceVisible: once,
  });

  const directions = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
    none: {},
  };

  const variants = {
    hidden: {
      opacity: 0,
      ...directions[direction],
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
        delay,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isIntersecting ? 'visible' : 'hidden'}
      variants={variants}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default FadeIn;
