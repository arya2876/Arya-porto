import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './context/ThemeContext';
import { PortfolioDataProvider } from './context/PortfolioDataContext';
import Layout from './components/layout/Layout';
import VideoLoader from './components/ui/VideoLoader';
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


import { LoadingProvider, useLoading } from './context/LoadingContext';

function AppContent() {
  const { isLoading, finishLoading } = useLoading();

  return (
    <SmoothScrollProvider>
      {/* Minimalist Line Reveal Video Loading Screen */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <VideoLoader onFinish={finishLoading} />
        )}
      </AnimatePresence>

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
  );
}

/**
 * Main App Component
 */
function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <PortfolioDataProvider>
          <LoadingProvider>
            <AppContent />
          </LoadingProvider>
        </PortfolioDataProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
