import { useState, useEffect, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

const particleOptions = {
  fpsLimit: 60,
  particles: {
    number: { value: 55, density: { enable: true } },
    color: { value: ['#c9a84c', '#e6e6e6', '#ffffff'] },
    opacity: { value: { min: 0.12, max: 0.42 } },
    size: { value: { min: 1, max: 2.2 } },
    move: {
      enable: true,
      speed: 0.55,
      direction: 'none',
      random: true,
      straight: false,
      outModes: { default: 'out' },
    },
    links: {
      enable: true,
      distance: 145,
      color: '#c9a84c',
      opacity: 0.07,
      width: 1,
    },
  },
  interactivity: {
    events: {
      onHover: { enable: true, mode: 'repulse' },
      onClick: { enable: true, mode: 'push' },
    },
    modes: {
      repulse: { distance: 110, duration: 0.5 },
      push: { quantity: 3 },
    },
  },
  detectRetina: true,
};

const Hero = () => {
  const [engineReady, setEngineReady] = useState(false);

  useEffect(() => {
    initParticlesEngine(async engine => {
      await loadSlim(engine);
    }).then(() => setEngineReady(true));
  }, []);

  const nameChars = useMemo(() =>
    'Michael Mosquera'.split('').map(char => ({
      char,
      x: (Math.random() - 0.5) * 600,
      y: (Math.random() - 0.5) * 500,
      rotate: (Math.random() - 0.5) * 120,
    })),
  []);

  const { scrollYProgress } = useScroll();
  const contentY = useTransform(scrollYProgress, [0, 0.45], [0, -70]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);

  return (
    <header className="hero">
      <div className="hero-bg" aria-hidden="true" />
      <div className="hero-overlay" aria-hidden="true" />

      {engineReady && (
        <Particles
          id="hero-particles"
          className="hero-particles"
          options={particleOptions}
        />
      )}

      <motion.div
        className="hero-content"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <h1 className="hero-name" aria-label="Michael Mosquera">
          {nameChars.map(({ char, x, y, rotate }, i) => (
            <motion.span
              key={i}
              className="hero-char"
              aria-hidden="true"
              initial={{ x, y, opacity: 0, scale: 0.15, rotate }}
              animate={{ x: 0, y: 0, opacity: 1, scale: 1, rotate: 0 }}
              transition={{
                type: 'spring',
                stiffness: 55,
                damping: 13,
                delay: i * 0.048,
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </h1>

        <motion.p
          className="hero-role"
          initial={{ opacity: 0, y: 28, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ delay: 0.95, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          Full Stack Developer
        </motion.p>

        <motion.div
          className="hero-scroll-hint"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
        >
          <motion.span
            animate={{ y: [0, 7, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          >
            ↓
          </motion.span>
        </motion.div>
      </motion.div>
    </header>
  );
};

export default Hero;
