import React, { lazy, Suspense } from 'react';

// ── Eager (above-the-fold, always needed immediately) ──────────────────────────
import ScrollProgress from './components/ScrollProgress.jsx';
import CustomCursor from './components/CustomCursor.jsx';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';

// ── Lazy (below-the-fold, loaded on demand) ────────────────────────────────────
const About          = lazy(() => import('./components/About.jsx'));
const Skills         = lazy(() => import('./components/Skills.jsx'));
const DigitalFootprint = lazy(() => import('./components/DigitalFootprint.jsx'));
const Roadmap        = lazy(() => import('./components/Roadmap.jsx'));
const Projects       = lazy(() => import('./components/Projects.jsx'));
const Contact        = lazy(() => import('./components/Contact.jsx'));
const Footer         = lazy(() => import('./components/Footer.jsx'));
const Chatbot        = lazy(() => import('./components/Chatbot.jsx'));

// ── Section skeleton shown while a lazy chunk is downloading ──────────────────
function SectionSkeleton() {
  return (
    <div style={{
      width: '100%',
      minHeight: '200px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '4rem 2rem',
    }}>
      <div style={{
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        border: '3px solid rgba(255,255,255,0.08)',
        borderTopColor: 'var(--accent, #6ee7b7)',
        animation: 'spin 0.8s linear infinite',
      }} />
    </div>
  );
}

export default function App() {
  return (
    <div className="app-root">
      {/* Noise Texture Background */}
      <div className="noise-overlay" aria-hidden="true"></div>

      {/* Progress & Custom Cursor — always eager */}
      <ScrollProgress />
      <CustomCursor />

      {/* Navigation — always eager */}
      <Navbar />

      {/* Main Page Content */}
      <main id="main-content">
        {/* Hero is eager — it's the very first thing visitors see */}
        <Hero />

        {/* Everything below the fold is lazy-loaded */}
        <Suspense fallback={<SectionSkeleton />}>
          <About />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <Skills />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <DigitalFootprint />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <Roadmap />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <Projects />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <Contact />
        </Suspense>
      </main>

      {/* Footer & Chatbot */}
      <Suspense fallback={null}>
        <Footer />
      </Suspense>

      <Suspense fallback={null}>
        <Chatbot />
      </Suspense>
    </div>
  );
}
