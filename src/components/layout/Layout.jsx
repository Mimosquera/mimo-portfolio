import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useWebHaptics } from 'web-haptics/react';
import Navbar from './Navbar';
import Footer from './Footer';
import PixelTransition from './PixelTransition';
import ParticleBackground from './ParticleBackground';
import { TransitionDelayProvider } from '../../context/TransitionDelay';

const Layout = () => {
  const { pathname } = useLocation();
  const [showTop, setShowTop] = useState(false);
  const { trigger } = useWebHaptics();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    trigger('selection');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <TransitionDelayProvider>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <ParticleBackground />
      <Navbar />
      <Outlet />
      <Footer />
      <button
        className={`scroll-top${showTop ? ' visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M8 12V4M4 8l4-4 4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <PixelTransition />
    </TransitionDelayProvider>
  );
};

export default Layout;
