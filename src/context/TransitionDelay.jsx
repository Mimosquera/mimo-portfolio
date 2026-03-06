import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const PIXEL_MS = 720;
const Ctx = createContext(0);

export const TransitionDelayProvider = ({ children }) => {
  const { pathname } = useLocation();
  const [delay, setDelay] = useState(0);
  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) { mounted.current = true; return; }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setDelay(PIXEL_MS / 1000);
    const t = setTimeout(() => setDelay(0), PIXEL_MS);
    return () => clearTimeout(t);
  }, [pathname]);

  return <Ctx.Provider value={delay}>{children}</Ctx.Provider>;
};

export const useEntryDelay = () => useContext(Ctx);
