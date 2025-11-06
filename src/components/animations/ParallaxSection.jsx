import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

/**
 * ParallaxSection Component
 * Creates parallax scrolling effect for elements
 */
const ParallaxSection = ({ 
  children, 
  speed = 0.5, // 0 (no parallax) to 1 (full parallax)
  direction = 'vertical', // vertical, horizontal
  className = '',
  ...props 
}) => {
  const ref = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Calculate parallax offset based on speed
  const maxOffset = 100 * speed;
  
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    direction === 'vertical' ? [maxOffset, -maxOffset] : [0, 0]
  );
  
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    direction === 'horizontal' ? [maxOffset, -maxOffset] : [0, 0]
  );

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`} {...props}>
      <motion.div
        style={{
          y: direction === 'vertical' ? y : 0,
          x: direction === 'horizontal' ? x : 0,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

/**
 * ParallaxImage Component
 * Optimized for parallax image backgrounds
 */
export const ParallaxImage = ({ 
  src, 
  alt = '', 
  speed = 0.5,
  className = '',
  imageClassName = '',
  ...props 
}) => {
  const ref = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [100 * speed, -100 * speed]
  );

  return (
    <div 
      ref={ref} 
      className={`relative overflow-hidden ${className}`} 
      {...props}
    >
      <motion.img
        src={src}
        alt={alt}
        style={{ y }}
        className={`w-full h-full object-cover ${imageClassName}`}
      />
    </div>
  );
};

/**
 * ParallaxText Component
 * Creates parallax effect specifically for text elements
 */
export const ParallaxText = ({ 
  children, 
  speed = 0.3,
  className = '',
  ...props 
}) => {
  const ref = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [50 * speed, -50 * speed]
  );

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0, 1, 1, 0]
  );

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default ParallaxSection;
