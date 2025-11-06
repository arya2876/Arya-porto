import { motion } from 'framer-motion';
import { useState, Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, PerspectiveCamera, Environment } from '@react-three/drei';
import { useTheme } from '../../hooks/useTheme';
import lanyardTexture from '../../assets/lanyard/lanyard.png';

/**
 * 3D Card Model Component
 */
function Card3D({ isDragging, ...props }) {
  const group = useRef();
  const { scene } = useGLTF('/src/assets/lanyard/card (1).glb');
  
  // Animate rotation when dragging
  useFrame((state) => {
    if (group.current) {
      if (isDragging) {
        group.current.rotation.y += 0.01;
      } else {
        // Idle animation
        group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
        group.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.05;
      }
    }
  });

  return (
    <group ref={group} {...props}>
      <primitive object={scene.clone()} scale={2.5} />
    </group>
  );
}

/**
 * Fallback 2D Card
 */
function Card2D({ isDragging, isHovered }) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`relative w-56 h-80 sm:w-64 sm:h-96 rounded-2xl overflow-hidden ${
      isDark 
        ? 'bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800' 
        : 'bg-gradient-to-br from-white via-gray-50 to-white'
    } shadow-2xl border-2 ${
      isDark ? 'border-slate-700' : 'border-gray-200'
    }`}>
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10" />

      {/* Animated Shine Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        animate={{ x: ['-100%', '200%'] }}
        transition={{ duration: 3, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
      />

      {/* Card Content */}
      <div className="relative z-10 p-4 sm:p-6 h-full flex flex-col">
        {/* Header */}
        <div className="text-center mb-4 sm:mb-6">
          <div className="text-xs font-semibold tracking-wider text-purple-500 mb-2">
            PORTFOLIO ID CARD
          </div>
          <div className="h-1 w-16 sm:w-20 mx-auto rounded-full bg-gradient-to-r from-purple-500 to-blue-500" />
        </div>

        {/* Avatar */}
        <div className="flex justify-center mb-4 sm:mb-6">
          <div className="relative">
            <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full ${
              isDark 
                ? 'bg-gradient-to-br from-purple-600 to-blue-600' 
                : 'bg-gradient-to-br from-purple-400 to-blue-400'
            } flex items-center justify-center text-white font-bold text-xl sm:text-2xl shadow-xl`}>
              AW
            </div>
            {/* Status Indicator */}
            <div className="absolute bottom-1 right-1 w-4 h-4 sm:w-5 sm:h-5 bg-green-500 rounded-full border-2 sm:border-4 border-white shadow-lg" />
            {/* Glow Effect */}
            {isHovered && (
              <motion.div
                className="absolute inset-0 rounded-full bg-purple-500/30 blur-xl"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1.2, opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </div>
        </div>

        {/* Name */}
        <div className="text-center mb-3 sm:mb-4">
          <h3 className={`text-xl sm:text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Arya Winata
          </h3>
          <p className={`text-xs sm:text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Full Stack Developer
          </p>
        </div>

        {/* Info Bars */}
        <div className="space-y-2 sm:space-y-3 flex-1">
          <div className={`p-2 sm:p-3 rounded-lg ${
            isDark ? 'bg-slate-800/50' : 'bg-gray-100/50'
          } backdrop-blur-sm border ${isDark ? 'border-slate-700' : 'border-gray-200'}`}>
            <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-1`}>
              ID Number
            </div>
            <div className={`font-mono text-xs sm:text-sm font-semibold ${
              isDark ? 'text-purple-400' : 'text-purple-600'
            }`}>
              #2024-DEV-001
            </div>
          </div>

          <div className={`p-2 sm:p-3 rounded-lg ${
            isDark ? 'bg-slate-800/50' : 'bg-gray-100/50'
          } backdrop-blur-sm border ${isDark ? 'border-slate-700' : 'border-gray-200'}`}>
            <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-1`}>
              Experience Level
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 bg-gray-300 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
                  initial={{ width: 0 }}
                  animate={{ width: '85%' }}
                  transition={{ duration: 1, delay: 1 }}
                />
              </div>
              <span className={`text-xs font-semibold ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                Senior
              </span>
            </div>
          </div>

          <div className={`p-2 sm:p-3 rounded-lg ${
            isDark ? 'bg-slate-800/50' : 'bg-gray-100/50'
          } backdrop-blur-sm border ${isDark ? 'border-slate-700' : 'border-gray-200'}`}>
            <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-1`}>
              Specialization
            </div>
            <div className="flex flex-wrap gap-1">
              {['React', 'Node.js', 'TypeScript'].map((tech) => (
                <span
                  key={tech}
                  className={`px-1.5 py-0.5 sm:px-2 sm:py-1 text-xs rounded-full ${
                    isDark 
                      ? 'bg-purple-500/20 text-purple-300' 
                      : 'bg-purple-100 text-purple-700'
                  }`}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-300 dark:border-gray-700">
          <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
            Valid until: December 2025
          </p>
        </div>
      </div>
    </div>
  );
}

/**
 * Interactive Lanyard Component with 3D Model
 */
const Lanyard3D = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [cardPosition, setCardPosition] = useState({ x: 0, y: 0 });
  const [use3D, setUse3D] = useState(true);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Calculate rope path based on card position
  const getRopePath = () => {
    const controlX = 100 - (cardPosition.x * 0.3);
    const controlY = 100 + (cardPosition.y * 0.4);
    const endX = 100 - (cardPosition.x * 0.15);
    const endY = 180 + cardPosition.y;
    return `M 100 20 Q ${controlX} ${controlY}, ${endX} ${endY}`;
  };

  return (
    <div className="relative w-full h-[500px] sm:h-[550px] md:h-[600px] flex items-start justify-center pt-4 sm:pt-8 overflow-hidden">
      {/* Lanyard Rope SVG */}
      <svg
        className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none z-10"
        width="100%"
        height="100%"
        viewBox="0 0 200 300"
        preserveAspectRatio="xMidYMin meet"
      >
        {/* Attachment Point */}
        <circle cx="100" cy="10" r="8" fill={isDark ? '#475569' : '#64748b'} />
        <circle cx="100" cy="10" r="4" fill={isDark ? '#1e293b' : '#334155'} />
        
        {/* Lanyard Pattern with actual texture */}
        <defs>
          <pattern id="lanyardTexturePattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <image 
              href={lanyardTexture} 
              width="40" 
              height="40"
              preserveAspectRatio="xMidYMid slice"
            />
          </pattern>
          <filter id="ropeGlow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Dynamic Rope Path with Texture */}
        <motion.path
          d={getRopePath()}
          stroke="url(#lanyardTexturePattern)"
          strokeWidth="16"
          fill="none"
          strokeLinecap="round"
          filter="url(#ropeGlow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
        
        {/* Rope Highlight */}
        <motion.path
          d={getRopePath()}
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        />

        {/* Rope Shadow */}
        <motion.path
          d={getRopePath()}
          stroke="rgba(0,0,0,0.2)"
          strokeWidth="16"
          fill="none"
          strokeLinecap="round"
          transform="translate(2, 2)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </svg>

      {/* Card Clip/Holder */}
      <motion.div
        className="absolute z-20 pointer-events-none"
        style={{
          top: `${170 + cardPosition.y}px`,
          left: '50%',
          transform: `translateX(calc(-50% + ${cardPosition.x * 0.15}px))`,
        }}
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.6, delay: 0.3, type: "spring" }}
      >
        <div className={`w-14 h-7 sm:w-16 sm:h-8 rounded-lg ${
          isDark ? 'bg-gradient-to-b from-gray-600 to-gray-800' : 'bg-gradient-to-b from-gray-400 to-gray-600'
        } shadow-xl relative`}>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-black/50" />
          <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-lg" />
        </div>
      </motion.div>

      {/* 3D or 2D Card Container */}
      <motion.div
        drag
        dragConstraints={{ top: 0, bottom: 150, left: -80, right: 80 }}
        dragElastic={0.15}
        dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
        onDrag={(event, info) => {
          setCardPosition({ x: info.offset.x, y: info.offset.y });
        }}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setIsDragging(false)}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`absolute z-30 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        style={{
          top: '200px',
          left: '50%',
          x: '-50%',
        }}
        initial={{ y: -100, opacity: 0, scale: 0.8 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.5, type: "spring", bounce: 0.4 }}
      >
        {use3D ? (
          // 3D Canvas Version
          <div className="w-[280px] h-[350px] relative">
            <Canvas
              shadows
              dpr={[1, 2]}
              gl={{ antialias: true, alpha: true }}
              style={{ background: 'transparent', pointerEvents: 'none' }}
              onError={() => setUse3D(false)}
            >
              <Suspense fallback={null}>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
                <pointLight position={[-10, -10, -10]} intensity={0.5} />
                <PerspectiveCamera makeDefault position={[0, 0, 5]} />
                <Card3D isDragging={isDragging} position={[0, 0, 0]} />
                <Environment preset="city" />
              </Suspense>
            </Canvas>
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent rounded-b-2xl pointer-events-none">
              <div className="text-center text-white">
                <h3 className="text-lg sm:text-xl font-bold mb-1">Arya Winata</h3>
                <p className="text-xs sm:text-sm opacity-90">Full Stack Developer</p>
              </div>
            </div>
          </div>
        ) : (
          // 2D Fallback Version
          <Card2D isDragging={isDragging} isHovered={isHovered} />
        )}
      </motion.div>

      {/* Instruction Text */}
      <motion.div
        className={`absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 text-center ${
          isDark ? 'text-gray-400' : 'text-gray-600'
        } text-xs sm:text-sm z-40 px-4`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
      >
        <p className="flex items-center gap-2 justify-center">
          <motion.span
            animate={{ y: [0, -5, 0], rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
          >
            👆
          </motion.span>
          <span className="hidden sm:inline">Drag the {use3D ? '3D' : ''} card to move it around</span>
          <span className="sm:hidden">Drag to move</span>
        </p>
      </motion.div>
    </div>
  );
};

// Preload GLB model
try {
  useGLTF.preload('/src/assets/lanyard/card (1).glb');
} catch (error) {
  console.warn('Failed to preload 3D model:', error);
}

export default Lanyard3D;
