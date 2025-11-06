import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

/**
 * Marquee Text Component - Scrolling text animation
 * @param {Array} items - Array of text items to scroll
 * @param {string} direction - 'left' or 'right'
 * @param {number} speed - Speed of animation (default: 50)
 */
const MarqueeText = ({ items = [], direction = 'left', speed = 50, className = '' }) => {
  const [duplicatedItems, setDuplicatedItems] = useState([]);

  useEffect(() => {
    // Duplicate items for seamless loop
    setDuplicatedItems([...items, ...items, ...items]);
  }, [items]);

  const marqueeVariants = {
    animate: {
      x: direction === 'left' ? ['0%', '-33.333%'] : ['-33.333%', '0%'],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: 'loop',
          duration: speed,
          ease: 'linear',
        },
      },
    },
  };

  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        variants={marqueeVariants}
        animate="animate"
      >
        {duplicatedItems.map((item, index) => (
          <div
            key={index}
            className="flex-shrink-0"
          >
            {item}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default MarqueeText;
