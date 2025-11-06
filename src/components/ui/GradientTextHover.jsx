import { motion } from 'framer-motion';
import { useState } from 'react';

/**
 * Gradient Text Hover Effect Component - Omio Inspired
 * Text with flowing gradient on hover
 */
const GradientTextHover = ({ 
  children, 
  className = '',
  gradientColors = ['#667eea', '#764ba2', '#f093fb'],
  as: Component = 'span'
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Component
      className={`relative inline-block cursor-pointer ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Base Text */}
      <span className={`relative z-10 transition-all duration-300 ${
        isHovered ? 'text-transparent bg-clip-text' : ''
      }`}
        style={isHovered ? {
          backgroundImage: `linear-gradient(90deg, ${gradientColors.join(', ')})`,
          backgroundSize: '200% 100%',
          animation: 'gradient-flow 2s ease infinite',
        } : {}}
      >
        {children}
      </span>

      {/* Glow Effect on Hover */}
      <motion.span
        className="absolute inset-0 blur-xl opacity-0 pointer-events-none"
        animate={{
          opacity: isHovered ? 0.6 : 0,
        }}
        transition={{ duration: 0.3 }}
        style={{
          background: `linear-gradient(90deg, ${gradientColors.join(', ')})`,
        }}
      />

      {/* CSS Animation for Gradient Flow */}
      <style jsx>{`
        @keyframes gradient-flow {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </Component>
  );
};

export default GradientTextHover;
