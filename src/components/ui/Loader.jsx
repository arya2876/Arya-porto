import { motion } from 'framer-motion';
import SpinningLoader from './SpinningLoader';

/**
 * Reusable Loader Component with multiple variants
 */
const Loader = ({ 
  variant = 'spinning', 
  size = 'md', 
  color = 'primary',
  fullScreen = false,
  text = '' 
}) => {
  const sizes = {
    sm: { width: 24, height: 24, border: 3 },
    md: { width: 48, height: 48, border: 4 },
    lg: { width: 64, height: 64, border: 5 },
    xl: { width: 96, height: 96, border: 6 },
  };

  const colors = {
    primary: 'border-primary-500',
    secondary: 'border-secondary-500',
    white: 'border-white',
  };

  const { width, height, border } = sizes[size] || sizes.md;
  const borderColor = colors[color] || colors.primary;

  // Spinner Loader
  const SpinnerLoader = () => (
    <div className="flex flex-col items-center gap-4">
      <div
        className={`rounded-full ${borderColor} border-t-transparent animate-spin`}
        style={{
          width: `${width}px`,
          height: `${height}px`,
          borderWidth: `${border}px`,
        }}
      />
      {text && (
        <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
          {text}
        </p>
      )}
    </div>
  );

  // Dots Loader
  const DotsLoader = () => (
    <div className="flex items-center gap-2">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className={`rounded-full ${borderColor.replace('border-', 'bg-')}`}
          style={{ width: width / 4, height: width / 4 }}
          animate={{ y: ['0%', '-50%', '0%'] }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}
    </div>
  );

  // Pulse Loader
  const PulseLoader = () => (
    <motion.div
      className={`rounded-full ${borderColor.replace('border-', 'bg-')}`}
      style={{ width, height }}
      animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    />
  );

  // Bars Loader
  const BarsLoader = () => (
    <div className="flex items-center gap-1">
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className={`${borderColor.replace('border-', 'bg-')} rounded`}
          style={{ width: width / 6, height: height }}
          animate={{ scaleY: [1, 1.5, 1] }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: i * 0.1,
          }}
        />
      ))}
    </div>
  );

  const loaders = {
    spinning: <SpinningLoader fullScreen={false} />,
    spinner: <SpinnerLoader />,
    dots: <DotsLoader />,
    pulse: <PulseLoader />,
    bars: <BarsLoader />,
  };

  const loader = loaders[variant] || loaders.spinning;

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-light-bg/80 dark:bg-dark-bg/80 backdrop-blur-sm">
        {loader}
      </div>
    );
  }

  return <div className="flex items-center justify-center">{loader}</div>;
};

export default Loader;
