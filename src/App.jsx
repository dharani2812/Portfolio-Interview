import React, { Suspense } from 'react';
import Navbar from './components/Navbar';
import Background from './components/Background';
import Hero from './components/Hero';

// Code splitting for components below the fold to improve initial load time
const Skills = React.lazy(() => import('./components/Skills'));
const Projects = React.lazy(() => import('./components/Projects'));
const Capabilities = React.lazy(() => import('./components/Capabilities'));
const Architecture = React.lazy(() => import('./components/Architecture'));
const About = React.lazy(() => import('./components/About'));
const Contact = React.lazy(() => import('./components/Contact'));
const Footer = React.lazy(() => import('./components/Footer'));

// Simple loading UI for Suspense fallback
const LoadingFallback = () => (
  <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#818cf8', fontFamily: 'monospace' }}>
    Loading Section...
  </div>
);

function App() {
  return (
    <>
      <Navbar />
      <Background />
      <Hero />
      <Suspense fallback={<LoadingFallback />}>
        <Skills />
        <Projects />
        <Capabilities />
        <Architecture />
        <About />
        <Contact />
        <Footer />
      </Suspense>
    </>
  );
}

export default App;
