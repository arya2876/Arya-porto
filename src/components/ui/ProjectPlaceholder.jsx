/**
 * Project Placeholder Logo Component
 * Modern SVG logo for project showcase when no image is available
 */
const ProjectPlaceholder = ({ 
  className = '', 
  size = 'full',
  variant = 'code' // 'code', 'web', 'mobile', 'design'
}) => {
  const sizeClasses = {
    sm: 'w-32 h-32',
    md: 'w-48 h-48',
    lg: 'w-64 h-64',
    full: 'w-full h-full'
  };

  const variants = {
    code: {
      icon: (
        <>
          {/* Code Brackets */}
          <path
            d="M30 20 L20 30 L30 40"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            className="text-primary-500"
          />
          <path
            d="M70 20 L80 30 L70 40"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            className="text-primary-500"
          />
          {/* Slash */}
          <line
            x1="60"
            y1="15"
            x2="40"
            y2="45"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            className="text-secondary-500"
          />
        </>
      ),
      bg: 'linear-gradient(135deg, rgba(6, 182, 212, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)'
    },
    web: {
      icon: (
        <>
          {/* Browser Window */}
          <rect
            x="15"
            y="20"
            width="70"
            height="50"
            rx="4"
            stroke="currentColor"
            strokeWidth="2.5"
            fill="none"
            className="text-primary-500"
          />
          {/* Top Bar */}
          <line
            x1="15"
            y1="28"
            x2="85"
            y2="28"
            stroke="currentColor"
            strokeWidth="2.5"
            className="text-primary-500"
          />
          {/* Dots */}
          <circle cx="22" cy="24" r="1.5" fill="currentColor" className="text-secondary-500" />
          <circle cx="28" cy="24" r="1.5" fill="currentColor" className="text-accent-start" />
          <circle cx="34" cy="24" r="1.5" fill="currentColor" className="text-primary-400" />
          {/* Content Lines */}
          <line x1="22" y1="38" x2="78" y2="38" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-primary-300 opacity-50" />
          <line x1="22" y1="45" x2="65" y2="45" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-primary-300 opacity-50" />
          <line x1="22" y1="52" x2="72" y2="52" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-primary-300 opacity-50" />
          <line x1="22" y1="59" x2="58" y2="59" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-primary-300 opacity-50" />
        </>
      ),
      bg: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)'
    },
    mobile: {
      icon: (
        <>
          {/* Phone Frame */}
          <rect
            x="30"
            y="15"
            width="40"
            height="70"
            rx="6"
            stroke="currentColor"
            strokeWidth="2.5"
            fill="none"
            className="text-primary-500"
          />
          {/* Screen */}
          <rect
            x="35"
            y="22"
            width="30"
            height="50"
            rx="2"
            fill="currentColor"
            className="text-primary-500 opacity-20"
          />
          {/* Home Button */}
          <circle
            cx="50"
            cy="78"
            r="2"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
            className="text-secondary-500"
          />
          {/* App Icons */}
          <rect x="40" y="28" width="6" height="6" rx="1.5" fill="currentColor" className="text-accent-start opacity-60" />
          <rect x="50" y="28" width="6" height="6" rx="1.5" fill="currentColor" className="text-primary-400 opacity-60" />
          <rect x="40" y="38" width="6" height="6" rx="1.5" fill="currentColor" className="text-secondary-500 opacity-60" />
          <rect x="50" y="38" width="6" height="6" rx="1.5" fill="currentColor" className="text-accent-end opacity-60" />
        </>
      ),
      bg: 'linear-gradient(135deg, rgba(236, 72, 153, 0.1) 0%, rgba(6, 182, 212, 0.1) 100%)'
    },
    design: {
      icon: (
        <>
          {/* Pen Tool */}
          <path
            d="M25 75 L50 25 L75 50 Z"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinejoin="round"
            fill="none"
            className="text-primary-500"
          />
          <circle
            cx="50"
            cy="25"
            r="4"
            fill="currentColor"
            className="text-secondary-500"
          />
          <circle
            cx="75"
            cy="50"
            r="4"
            fill="currentColor"
            className="text-accent-start"
          />
          <circle
            cx="25"
            cy="75"
            r="4"
            fill="currentColor"
            className="text-primary-400"
          />
          {/* Bezier Curves */}
          <path
            d="M50 25 Q60 35 75 50"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="3,3"
            fill="none"
            className="text-primary-300 opacity-50"
          />
          <path
            d="M25 75 Q35 60 50 25"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="3,3"
            fill="none"
            className="text-primary-300 opacity-50"
          />
        </>
      ),
      bg: 'linear-gradient(135deg, rgba(251, 146, 60, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)'
    }
  };

  const selectedVariant = variants[variant] || variants.code;

  return (
    <div className={`${sizeClasses[size]} ${className} relative overflow-hidden rounded-lg`}>
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background with Gradient */}
        <defs>
          <linearGradient id={`gradient-${variant}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(6, 182, 212, 0.1)" />
            <stop offset="100%" stopColor="rgba(139, 92, 246, 0.1)" />
          </linearGradient>
          
          {/* Dot Pattern */}
          <pattern id={`dots-${variant}`} x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.5" fill="currentColor" className="text-primary-500 opacity-20" />
          </pattern>
        </defs>

        {/* Background Rectangle */}
        <rect
          width="100"
          height="100"
          fill={`url(#gradient-${variant})`}
          className="dark:opacity-50"
        />
        
        {/* Dot Pattern Overlay */}
        <rect
          width="100"
          height="100"
          fill={`url(#dots-${variant})`}
        />

        {/* Icon */}
        <g className="transition-transform duration-300 hover:scale-110">
          {selectedVariant.icon}
        </g>

        {/* Corner Accents */}
        <circle cx="10" cy="10" r="2" fill="currentColor" className="text-primary-500 opacity-30" />
        <circle cx="90" cy="10" r="2" fill="currentColor" className="text-secondary-500 opacity-30" />
        <circle cx="10" cy="90" r="2" fill="currentColor" className="text-accent-start opacity-30" />
        <circle cx="90" cy="90" r="2" fill="currentColor" className="text-accent-end opacity-30" />
      </svg>

      {/* Text Overlay (Optional) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center opacity-0 hover:opacity-100 transition-opacity duration-300">
          <p className="text-xs font-semibold text-light-text-secondary dark:text-dark-text-secondary uppercase tracking-wider">
            {variant}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectPlaceholder;
