import { motion } from 'framer-motion';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

/**
 * SlideIn Animation Component
 * Slides in element from specified direction when it enters viewport
 */
const SlideIn = ({ 
  children, 
  delay = 0, 
  duration = 0.6,
  direction = 'left', // left, right, up, down
  distance = 100,
  className = '',
  once = true,
  stagger = false,
  staggerDelay = 0.1,
  ...props 
}) => {
  const [ref, isIntersecting] = useIntersectionObserver({
    threshold: 0.1,
    freezeOnceVisible: once,
  });

  const directions = {
    left: { x: -distance },
    right: { x: distance },
    up: { y: -distance },
    down: { y: distance },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger ? staggerDelay : 0,
        delayChildren: delay,
      },
    },
  };

  const itemVariants = {
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
        ease: [0.25, 0.4, 0.25, 1],
      },
    },
  };

  if (stagger && Array.isArray(children)) {
    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isIntersecting ? 'visible' : 'hidden'}
        variants={containerVariants}
        className={className}
        {...props}
      >
        {children.map((child, index) => (
          <motion.div key={index} variants={itemVariants}>
            {child}
          </motion.div>
        ))}
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isIntersecting ? 'visible' : 'hidden'}
      variants={itemVariants}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default SlideIn;
