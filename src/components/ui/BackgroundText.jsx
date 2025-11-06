import { motion } from 'framer-motion';

/**
 * Large Background Text Component - Omio Style
 * Decorative transparent text in background
 */
const BackgroundText = ({ 
  text = 'ARYA WINATA',
  className = '',
  animate = false,
  opacity = 0.04,
  darkOpacity = 0.06,
  size = 'lg' // 'sm', 'md', 'lg', 'xl'
}) => {
  const sizeClasses = {
    sm: 'text-[8rem] sm:text-[10rem] lg:text-[12rem]',
    md: 'text-[10rem] sm:text-[14rem] lg:text-[16rem]',
    lg: 'text-[12rem] sm:text-[18rem] lg:text-[22rem]',
    xl: 'text-[14rem] sm:text-[20rem] lg:text-[26rem]',
  };

  const animationProps = animate ? {
    initial: { x: '-5%' },
    animate: { x: '5%' },
    transition: {
      duration: 30,
      repeat: Infinity,
      repeatType: 'reverse',
      ease: 'linear',
    }
  } : {};

  return (
    <div className={`absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden ${className}`}>
      <motion.div
        className={`${sizeClasses[size]} font-bold font-display whitespace-nowrap select-none leading-none`}
        style={{ 
          opacity: opacity,
          color: 'currentColor',
          letterSpacing: '0.1em',
          WebkitTextStroke: '1px currentColor',
          WebkitTextFillColor: 'transparent',
        }}
        {...animationProps}
      >
        {text}
      </motion.div>
    </div>
  );
};

export default BackgroundText;
