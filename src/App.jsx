import { useState, useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/layout/Layout';
import SpinningLoader from './components/ui/SpinningLoader';
import MagneticCursor from './components/ui/MagneticCursor';

// Import sections directly (no lazy loading to prevent double loading)
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Experience from './components/sections/Experience';
import Services from './components/sections/Services';
import WorkingProcess from './components/sections/WorkingProcess';
import TechStack from './components/sections/TechStack';
import Portfolio from './components/sections/Portfolio';
import WhyChoose from './components/sections/WhyChoose';
import Testimonials from './components/sections/Testimonials';
import Contact from './components/sections/Contact';

/**
 * Main App Component
 */
function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Show loader for minimum 2.5 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <SpinningLoader fullScreen={true} />;
  }

  return (
    <HelmetProvider>
      <ThemeProvider>
        <MagneticCursor />
        <Layout>
          <Hero />
          <About />
          <TechStack />
          <Experience />
          <Services />
          <WorkingProcess />
          <Portfolio />
          <WhyChoose />
          <Testimonials />
          <Contact />
        </Layout>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
