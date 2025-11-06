import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './ExpandableLogo.css';

/**
 * Expandable Logo Component - AW -> Arya Winata
 * Sequential typing animation effect
 */
const ExpandableLogo = ({ onClick }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showFirst, setShowFirst] = useState(false);
  const [showSecond, setShowSecond] = useState(false);

  // Auto-toggle expansion every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIsExpanded(prev => !prev);
      setShowFirst(false);
      setShowSecond(false);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Sequential animation: A -> Arya first, then W -> Winata
  useEffect(() => {
    if (isExpanded) {
      // Show first letter expansion (A -> Arya)
      const firstTimer = setTimeout(() => {
        setShowFirst(true);
      }, 100);

      // Show second letter expansion (W -> Winata) after first is done
      const secondTimer = setTimeout(() => {
        setShowSecond(true);
      }, 900); // 100ms delay + 800ms first animation

      return () => {
        clearTimeout(firstTimer);
        clearTimeout(secondTimer);
      };
    }
  }, [isExpanded]);

  return (
    <motion.a
      href="#home"
      onClick={onClick}
      className="expandable-logo-container"
      whileTap={{ scale: 0.95 }}
    >
      {/* Content wrapper */}
      <div className="logo-content">
        {/* Logo letters container */}
        <div className="logo-letters">
          {/* A -> Arya */}
          <div className="logo-letter">
            <span className="letter-initial">A</span>
            <span className={`letter-full ${showFirst ? 'typing' : ''}`}>rya</span>
          </div>
          
          {/* W -> Winata */}
          <div className="logo-letter">
            <span className="letter-initial">W</span>
            <span className={`letter-full ${showSecond ? 'typing' : ''}`}>inata</span>
          </div>
        </div>

        {/* Subtitle "PORTFOLIO" */}
        <div className={`logo-subtitle ${isExpanded ? 'active' : ''}`}>
          PORTFOLIO
        </div>
      </div>
    </motion.a>
  );
};

export default ExpandableLogo;
