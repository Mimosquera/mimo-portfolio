import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useWebHaptics } from 'web-haptics/react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const isSolid = scrolled || !isHome;
  const { trigger } = useWebHaptics();

  return (
    <nav className={`site-nav${isSolid ? ' solid' : ''}`}>
      <div className="nav-container">
        <NavLink to="/" className={`nav-brand${!isHome ? ' nav-brand-glow' : ''}`} end viewTransition onClick={() => trigger('selection')}>
          MIMO
        </NavLink>

        <button
          className={`nav-menu-btn${menuOpen ? ' active' : ''}`}
          onClick={() => setMenuOpen(prev => !prev)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>

        <ul className={`nav-links${menuOpen ? ' open' : ''}`}>
          <li><NavLink to="/portfolio" viewTransition onClick={() => trigger('selection')}>Portfolio</NavLink></li>
          <li><NavLink to="/contact" viewTransition onClick={() => trigger('selection')}>Contact</NavLink></li>
          <li><NavLink to="/resume" viewTransition onClick={() => trigger('selection')}>Resume</NavLink></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
