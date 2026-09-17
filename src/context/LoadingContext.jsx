import { createContext, useContext, useState, useCallback } from 'react';

const LoadingContext = createContext({
  isLoading: true,
  isLoaded: false,
  isExiting: false,
  finishLoading: () => {},
});

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const finishLoading = useCallback(() => {
    setIsExiting(true);
    // Begin revealing main page elements slightly before video loader fully unmounts
    // for seamless overlap and zero jarring gaps
    setTimeout(() => {
      setIsLoaded(true);
    }, 150);

    setTimeout(() => {
      setIsLoading(false);
    }, 850);
  }, []);

  return (
    <LoadingContext.Provider
      value={{
        isLoading,
        isLoaded,
        isExiting,
        finishLoading,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);

export default LoadingContext;
