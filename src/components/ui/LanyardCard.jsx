import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import Card from './Card';

/**
 * Lanyard Card Component - Interactive ID Card with Physics
 * Simulated 3D lanyard effect with Framer Motion
 * (Simplified version without GLB models)
 */
const LanyardCard = () => {
  const [isDragging, setIsDragging] = useState(false);
  const cardRef = useRef(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { damping: 20, stiffness: 150 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging && cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Subtle hover effect
        const deltaX = (e.clientX - centerX) * 0.03;
        const deltaY = (e.clientY - centerY) * 0.03;
        
        x.set(deltaX);
        y.set(deltaY);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isDragging, x, y]);

  return (
    <div className="relative w-full h-[400px] flex justify-center items-start pt-8 overflow-hidden">
      {/* Lanyard String */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-24 bg-gradient-to-b from-gray-300 via-gray-400 to-gray-500 dark:from-gray-600 dark:via-gray-500 dark:to-gray-400 rounded-full shadow-lg">
        {/* String attachment point */}
        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gray-400 dark:bg-gray-500 rounded-full border-2 border-gray-500 dark:border-gray-400"></div>
      </div>

      {/* ID Card */}
      <motion.div
        ref={cardRef}
        drag
        dragConstraints={{ left: -100, right: 100, top: -50, bottom: 150 }}
        dragElastic={0.1}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => {
          setIsDragging(false);
          x.set(0);
          y.set(0);
        }}
        style={{
          x: springX,
          y: springY,
          cursor: isDragging ? 'grabbing' : 'grab',
        }}
        className="relative mt-20"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Card Clip/Holder */}
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-8 bg-gradient-to-b from-gray-400 to-gray-500 dark:from-gray-500 dark:to-gray-600 rounded-t-lg shadow-lg">
          <div className="absolute inset-2 bg-gray-300 dark:bg-gray-400 rounded-t-md"></div>
          {/* Clip hole */}
          <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-600 dark:bg-gray-700 rounded-full"></div>
        </div>

        {/* Main Card */}
        <Card className="w-64 h-96 p-6 bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-gray-800 dark:via-gray-900 dark:to-black border-2 border-gray-200 dark:border-gray-700 shadow-2xl overflow-hidden relative">
          {/* Card Background Pattern */}
          <div className="absolute inset-0 opacity-5 dark:opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary-500 to-secondary-500"></div>
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          {/* Card Content */}
          <div className="relative z-10 flex flex-col items-center h-full">
            {/* Logo/Header */}
            <div className="w-full mb-6">
              <div className="h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg tracking-wider">PORTFOLIO</span>
              </div>
            </div>

            {/* Avatar */}
            <div className="w-32 h-32 mb-4 rounded-full bg-gradient-to-br from-primary-500 via-secondary-500 to-accent-end p-1 shadow-xl">
              <div className="w-full h-full rounded-full bg-light-card dark:bg-dark-card flex items-center justify-center overflow-hidden">
                <div className="w-28 h-28 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full flex items-center justify-center">
                  <span className="text-4xl font-bold text-white">YN</span>
                </div>
              </div>
            </div>

            {/* Name */}
            <div className="text-center mb-4">
              <h3 className="text-2xl font-bold text-gradient mb-1">Your Name</h3>
              <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                Full Stack Developer
              </p>
            </div>

            {/* Info Bars */}
            <div className="w-full space-y-2 mt-auto">
              <div className="h-8 bg-gradient-to-r from-primary-500/20 to-primary-500/10 rounded flex items-center px-3">
                <span className="text-xs font-mono text-light-text dark:text-dark-text">ID: 2024-001</span>
              </div>
              <div className="h-8 bg-gradient-to-r from-secondary-500/20 to-secondary-500/10 rounded flex items-center px-3">
                <span className="text-xs font-mono text-light-text dark:text-dark-text">LEVEL: SENIOR</span>
              </div>
            </div>

            {/* Bottom Accent */}
            <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-end"></div>
          </div>

          {/* Shine Effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent"
            animate={{
              x: ['-100%', '200%'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatDelay: 2,
              ease: 'easeInOut',
            }}
          />
        </Card>
      </motion.div>

      {/* Instructions */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center">
        <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
          Drag the card around 👆
        </p>
      </div>
    </div>
  );
};

export default LanyardCard;
