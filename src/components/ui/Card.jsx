import { motion } from 'framer-motion';
import { forwardRef } from 'react';

/**
 * Reusable Card Component with various styles and animations
 */
const Card = forwardRef(({ 
  children, 
  variant = 'default',
  hover = true,
  className = '',
  padding = 'md',
  onClick,
  ...props 
}, ref) => {
  const baseStyles = 'rounded-xl transition-all duration-300';
  
  const variants = {
    default: 'bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border shadow-lg',
    glass: 'bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/20',
    gradient: 'bg-gradient-to-br from-primary-500/10 to-secondary-500/10 border border-primary-500/20',
    neumorphism: 'bg-light-card dark:bg-dark-card shadow-neumorphism-light dark:shadow-neumorphism-dark',
    flat: 'bg-light-card dark:bg-dark-card',
  };

  const paddings = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const hoverStyles = hover 
    ? 'hover:shadow-2xl hover:-translate-y-1 cursor-pointer'
    : '';

  const cardClasses = `
    ${baseStyles}
    ${variants[variant] || variants.default}
    ${paddings[padding] || paddings.md}
    ${hoverStyles}
    ${className}
  `;

  return (
    <motion.div
      ref={ref}
      className={cardClasses}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={hover ? { y: -4 } : {}}
      {...props}
    >
      {children}
    </motion.div>
  );
});

Card.displayName = 'Card';

export default Card;
