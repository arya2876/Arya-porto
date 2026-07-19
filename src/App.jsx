import { useState, useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './context/ThemeContext';
import { PortfolioDataProvider } from './context/PortfolioDataContext';
import Layout from './components/layout/Layout';
import SpinningLoader from './components/ui/SpinningLoader';
import SplashCursor from './components/ui/SplashCursor';
import SmoothScrollProvider from './components/providers/SmoothScrollProvider';

// Import sections directly (no lazy loading to prevent double loading).
// Urutan render mengikuti NAV_ITEMS di src/data/navigation.js (01-07).
import { NAV_ITEMS } from './data/navigation';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Experience from './components/sections/Experience';
import Portfolio from './components/sections/Portfolio';
import Services from './components/sections/Services';
import Achievements from './components/sections/Achievements';
import Contact from './components/sections/Contact';

// Peta id section -> komponen; urutannya ditentukan NAV_ITEMS (single source of truth)
const SECTION_COMPONENTS = {
  home: Hero,
  about: About,
  experience: Experience,
  portfolio: Portfolio,
  services: Services,
  achievements: Achievements,
  contact: Contact,
};


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
        <PortfolioDataProvider>
          <SmoothScrollProvider>
          <SplashCursor
            DENSITY_DISSIPATION={3}
            VELOCITY_DISSIPATION={2.5}
            PRESSURE={0.9}
            CURL={15}
            SPLAT_RADIUS={0.25}
            SPLAT_FORCE={3500}
            COLOR_UPDATE_SPEED={14}
            RAINBOW_MODE={false}
            COLOR="#3e48f2"
          />
          <Layout>
            {NAV_ITEMS.map(({ id }) => {
              const Section = SECTION_COMPONENTS[id];
              // Hero berdiri sendiri; section lain MENGALIR NORMAL atas→bawah
              // dengan tinggi natural mengikuti konten (tanpa sticky/pin,
              // tanpa h-screen) — anchor <section id> tetap di sini.
              if (id === 'home') return <Section key={id} />;
              return (
                <section key={id} id={id} className="relative">
                  <Section />
                </section>
              );
            })}
          </Layout>
          </SmoothScrollProvider>
        </PortfolioDataProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
