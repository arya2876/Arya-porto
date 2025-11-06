import { motion } from 'framer-motion';
import { forwardRef } from 'react';

/**
 * Reusable Button Component with multiple variants and animations
 */
const Button = forwardRef(({ 
  children, 
  variant = 'primary',
  size = 'md',
  className = '',
  icon: Icon,
  iconPosition = 'left',
  isLoading = false,
  disabled = false,
  fullWidth = false,
  onClick,
  type = 'button',
  ...props 
}, ref) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-primary-500 hover:bg-primary-600 text-white focus:ring-primary-500 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95',
    secondary: 'bg-secondary-500 hover:bg-secondary-600 text-white focus:ring-secondary-500 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95',
    outline: 'border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white focus:ring-primary-500 hover:scale-105 active:scale-95',
    ghost: 'text-light-text dark:text-dark-text hover:bg-light-card dark:hover:bg-dark-card hover:scale-105 active:scale-95',
    gradient: 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95',
    danger: 'bg-red-500 hover:bg-red-600 text-white focus:ring-red-500 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const buttonClasses = `
    ${baseStyles}
    ${variants[variant] || variants.primary}
    ${sizes[size] || sizes.md}
    ${fullWidth ? 'w-full' : ''}
    ${className}
  `;

  return (
    <motion.button
      ref={ref}
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled || isLoading}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      {...props}
    >
      {isLoading ? (
        <>
          <svg 
            className="animate-spin -ml-1 mr-3 h-5 w-5" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24"
          >
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
            />
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Loading...
        </>
      ) : (
        <>
          {Icon && iconPosition === 'left' && (
            <Icon className="mr-2 h-5 w-5" />
          )}
          {children}
          {Icon && iconPosition === 'right' && (
            <Icon className="ml-2 h-5 w-5" />
          )}
        </>
      )}
    </motion.button>
  );
});

Button.displayName = 'Button';

export default Button;
