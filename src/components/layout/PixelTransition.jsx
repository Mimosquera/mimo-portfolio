import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const CELL = 52;
const COVER = 180;
const HOLD = 40;
const REVEAL = 180;
const FADE = 90;

const shuffle = arr => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const PixelTransition = () => {
  const canvasRef = useRef(null);
  const { pathname } = useLocation();
  const prevPath = useRef(pathname);
  const rafRef = useRef(null);

  useEffect(() => {
    if (pathname === prevPath.current) return;
    prevPath.current = pathname;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const W = window.innerWidth;
    const H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    const cols = Math.ceil(W / CELL);
    const rows = Math.ceil(H / CELL);
    const n = cols * rows;

    const cells = Array.from({ length: n }, (_, i) => ({
      x: (i % cols) * CELL,
      y: Math.floor(i / cols) * CELL,
      color: Math.random() < 0.1 ? '#a78bfa' : '#0d0d0d',
    }));

    const coverOrder = shuffle(Array.from({ length: n }, (_, i) => i));
    const revealOrder = shuffle(Array.from({ length: n }, (_, i) => i));

    const coverPos = new Uint16Array(n);
    const revealPos = new Uint16Array(n);
    for (let p = 0; p < n; p++) {
      coverPos[coverOrder[p]] = p;
      revealPos[revealOrder[p]] = p;
    }

    const coverDelay = COVER / n;
    const revealStart = COVER + HOLD;
    const revealDelay = REVEAL / n;
    const totalDone = revealStart + REVEAL + FADE + 50;

    let start = null;

    const frame = t => {
      if (!start) start = t;
      const e = t - start;

      ctx.clearRect(0, 0, W, H);
      const inReveal = e >= revealStart;

      for (let i = 0; i < n; i++) {
        let alpha;
        if (!inReveal) {
          const cellT = e - coverPos[i] * coverDelay;
          alpha = cellT <= 0 ? 0 : Math.min(1, cellT / FADE);
        } else {
          const cellT = (e - revealStart) - revealPos[i] * revealDelay;
          alpha = cellT <= 0 ? 1 : Math.max(0, 1 - cellT / FADE);
        }
        if (alpha > 0) {
          ctx.globalAlpha = alpha;
          ctx.fillStyle = cells[i].color;
          ctx.fillRect(cells[i].x, cells[i].y, CELL, CELL);
        }
      }

      if (e < totalDone) {
        rafRef.current = requestAnimationFrame(frame);
      } else {
        ctx.clearRect(0, 0, W, H);
      }
    };

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(frame);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [pathname]);

  return <canvas ref={canvasRef} className="pixel-canvas" />;
};

export default PixelTransition;
