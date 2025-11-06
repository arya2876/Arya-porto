import { useState, useEffect } from 'react';
import SpinningLoader from './SpinningLoader';

/**
 * Page Loader with minimum display time
 * Ensures loader is visible for at least minDuration
 */
const PageLoader = ({ minDuration = 1500 }) => {
  const [shouldShow, setShouldShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldShow(false);
    }, minDuration);

    return () => clearTimeout(timer);
  }, [minDuration]);

  if (!shouldShow) {
    return null;
  }

  return <SpinningLoader fullScreen={true} />;
};

export default PageLoader;
