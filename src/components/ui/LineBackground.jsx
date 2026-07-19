import { motion } from 'framer-motion';

/**
 * LineBackground - global topographic contour lines (same shapes as the Hero
 * reference), gently animated so the whole field drifts and "breathes" like
 * slow-moving water. Rendered once (fixed, full-viewport, behind all content).
 */
const LineBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* Subtle brand tint for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-primary-500/5 dark:to-primary-500/10" />
      <div className="absolute -top-1/4 left-1/2 -translate-x-1/2 w-[120vw] h-[60vh] rounded-full bg-secondary-500/5 dark:bg-secondary-500/10 blur-3xl" />

      {/* Topographic contour lines */}
      <svg
        className="absolute inset-0 w-full h-full text-neutral-900 opacity-[0.06] dark:text-white dark:opacity-[0.09]"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        {/* Contour lines drift slowly sideways + bob, like a gentle current */}
        <motion.g
          stroke="currentColor"
          strokeWidth="1.5"
          animate={{ x: [0, 20, 0], y: [0, -10, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        >
          <path d="M-80 60 Q 300 -20 640 80 T 1240 40 T 1560 120" />
          <path d="M-80 150 Q 280 60 600 170 T 1200 130 T 1560 210" />
          <path d="M-80 250 Q 320 150 660 270 T 1240 230 T 1560 310" />
          <path d="M-80 360 Q 300 260 620 380 T 1220 340 T 1560 420" />
          <path d="M-80 470 Q 340 380 700 490 T 1260 450 T 1560 530" />
          <path d="M-80 580 Q 300 490 640 600 T 1240 560 T 1560 640" />
          <path d="M-80 690 Q 340 600 680 710 T 1280 670 T 1560 750" />
          <path d="M-80 800 Q 320 710 660 820 T 1260 780 T 1560 860" />
          <path d="M-80 890 Q 300 810 640 910 T 1240 870 T 1560 950" />
        </motion.g>

        {/* Left topographic cluster - slow breathing ripple */}
        <motion.g
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          animate={{ scale: [1, 1.06, 1], x: [0, 12, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ellipse cx="240" cy="500" rx="300" ry="150" />
          <ellipse cx="240" cy="500" rx="220" ry="110" />
          <ellipse cx="240" cy="500" rx="150" ry="75" />
          <ellipse cx="240" cy="500" rx="85" ry="42" />
        </motion.g>

        {/* Right topographic cluster - offset breathing ripple */}
        <motion.g
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          animate={{ scale: [1, 1.05, 1], x: [0, -10, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        >
          <ellipse cx="1220" cy="430" rx="280" ry="130" />
          <ellipse cx="1220" cy="430" rx="200" ry="95" />
          <ellipse cx="1220" cy="430" rx="130" ry="62" />
          <ellipse cx="1220" cy="430" rx="70" ry="34" />
        </motion.g>
      </svg>
    </div>
  );
};

export default LineBackground;
