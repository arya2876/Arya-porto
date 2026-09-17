import React, { lazy, Suspense } from 'react';
import CatPawButton from './CatPawButton';

// Lazy load the Rive-powered cat paw button component
const RiveCatPawButtonContent = lazy(() => import('./RiveCatPawButton'));

/**
 * RiveCatPawButtonLazy — Suspense wrapper for lazy loading the Rive runtime.
 * While Rive package and WASM binary are loading, it gracefully falls back to
 * the pure CSS CatPawButton so the UI renders instantly with zero layout shifts.
 */
export function RiveCatPawButtonLazy({ children, ...props }) {
  return (
    <Suspense fallback={<CatPawButton {...props}>{children}</CatPawButton>}>
      <RiveCatPawButtonContent {...props}>{children}</RiveCatPawButtonContent>
    </Suspense>
  );
}

export default RiveCatPawButtonLazy;
