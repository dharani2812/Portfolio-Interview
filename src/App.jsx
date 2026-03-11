import React, { Suspense, useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Background from './components/Background';
import Hero from './components/Hero';
import Preloader from './components/Preloader';
import ScrollProvider from './components/ScrollProvider';

// Code splitting for components below the fold to improve initial load time
const Skills = React.lazy(() => import('./components/Skills'));
// ... (rest of the lazy imports)
const Projects = React.lazy(() => import('./components/Projects'));
const Capabilities = React.lazy(() => import('./components/Capabilities'));
const Architecture = React.lazy(() => import('./components/Architecture'));
const Challenges = React.lazy(() => import('./components/Challenges'));
const About = React.lazy(() => import('./components/About'));
const Contact = React.lazy(() => import('./components/Contact'));
const Footer = React.lazy(() => import('./components/Footer'));

const LoadingFallback = () => (
  <div style={{ height: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#818cf8', opacity: 0.5 }}>
    {/* Subtle placeholder while component loads */}
  </div>
);

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <ScrollProvider>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div key="loader">
            <Preloader onLoadingComplete={() => setIsLoading(false)} />
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <Navbar />
            <Background />
            <Hero />
            <Suspense fallback={<LoadingFallback />}>
              <Skills />
              <Projects />
              <Capabilities />
              <Architecture />
              <About />
              <Challenges />
              <Contact />
              <Footer />
            </Suspense>
          </motion.div>
        )}
      </AnimatePresence>
    </ScrollProvider>
  );
}

export default App;
