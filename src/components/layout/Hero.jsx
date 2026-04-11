import { useState, useEffect, useMemo, memo } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

const heroMobile = typeof window !== 'undefined' && window.innerWidth < 640;

const particleOptions = {
  fpsLimit: 60,
  particles: {
    number: { value: heroMobile ? 25 : 55, density: { enable: true } },
    color: { value: ['#d4d4d4', '#a3a3a3', '#ffffff'] },
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
      distance: heroMobile ? 110 : 145,
      color: '#d4d4d4',
      opacity: 0.07,
      width: 1,
    },
  },
  interactivity: {
    events: {
      onHover: { enable: !heroMobile, mode: 'repulse' },
      onClick: { enable: true, mode: 'push' },
    },
    modes: {
      repulse: { distance: 110, duration: 0.5 },
      push: { quantity: 3 },
    },
  },
  detectRetina: true,
};

const HeroParticles = memo(() => {
  const [engineReady, setEngineReady] = useState(false);

  useEffect(() => {
    initParticlesEngine(async engine => {
      await loadSlim(engine);
    }).then(() => setEngineReady(true));
  }, []);

  if (!engineReady) return null;

  return (
    <Particles
      id="hero-particles"
      className="hero-particles"
      options={particleOptions}
    />
  );
});

const FULL_NAME = 'Michael Mosquera';
const MIMO_INDICES = new Set([0, 1, 8, 9]);
const MIMO_POSITIONS = [0, 1, 8, 9];

const Hero = () => {
  const [phase, setPhase] = useState('assemble');

  const nameChars = useMemo(() => {
    const maxDist = Math.max(
      ...FULL_NAME.split('').map((_, i) =>
        MIMO_INDICES.has(i) ? 0 : Math.min(...MIMO_POSITIONS.map(p => Math.abs(i - p)))
      )
    );

    return FULL_NAME.split('').map((char, i) => {
      const isMimo = MIMO_INDICES.has(i);
      let dissolveDelay = 0;
      if (!isMimo) {
        const dist = Math.min(...MIMO_POSITIONS.map(p => Math.abs(i - p)));
        dissolveDelay = (1 - dist / maxDist) * 0.3;
      }
      return {
        char,
        isMimo,
        dissolveDelay,
        x: (Math.random() - 0.5) * (heroMobile ? 250 : 600),
        y: (Math.random() - 0.5) * (heroMobile ? 200 : 500),
        rotate: (Math.random() - 0.5) * (heroMobile ? 60 : 120),
      };
    });
  }, []);

  useEffect(() => {
    const assembleEnd = FULL_NAME.length * 48 + 900;
    const holdEnd = assembleEnd + 1200;
    const dissolveEnd = holdEnd + 750;

    const timers = [
      setTimeout(() => setPhase('hold'), assembleEnd),
      setTimeout(() => setPhase('dissolve'), holdEnd),
      setTimeout(() => setPhase('mimo'), dissolveEnd),
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  const { scrollYProgress } = useScroll();
  const contentY = useTransform(scrollYProgress, [0, 0.45], [0, -70]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);

  return (
    <header className="hero">
      <div className="hero-bg" aria-hidden="true" />
      <div className="hero-overlay" aria-hidden="true" />

      <HeroParticles />

      <motion.div
        className="hero-content"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <h1 className="hero-name" aria-label="MIMO">
          {nameChars.map(({ char, isMimo, dissolveDelay, x, y, rotate }, i) => {
            const dissolved = !isMimo && (phase === 'dissolve' || phase === 'mimo');
            const collapsed = !isMimo && phase === 'mimo';

            return (
              <motion.span
                key={i}
                className="hero-char"
                aria-hidden="true"
                layout={isMimo ? 'position' : false}
                initial={{ x, y, opacity: 0, scale: 0.15, rotate }}
                animate={{
                  x: 0,
                  y: dissolved ? -20 : 0,
                  opacity: dissolved ? 0 : 1,
                  scale: dissolved ? 0.6 : 1,
                  rotate: 0,
                }}
                transition={
                  phase === 'assemble'
                    ? { type: 'spring', stiffness: 55, damping: 13, delay: i * 0.048 }
                    : dissolved
                    ? { duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: dissolveDelay }
                    : {
                        duration: 0.5,
                        ease: [0.22, 1, 0.36, 1],
                        layout: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
                      }
                }
                style={{
                  display: collapsed ? 'none' : 'inline-block',
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            );
          })}
        </h1>

        <div className="hero-role-wrap">
          <motion.p
            className="hero-role"
            initial={{ opacity: 0, y: 28 }}
            animate={{
              opacity: phase === 'mimo' ? 0 : 1,
              y: phase === 'mimo' ? -10 : 0,
            }}
            transition={
              phase === 'mimo'
                ? { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
                : { delay: 0.95, duration: 1, ease: [0.22, 1, 0.36, 1] }
            }
          >
            Full Stack Developer
          </motion.p>
          <motion.p
            className="hero-role"
            initial={{ opacity: 0, y: 12 }}
            animate={{
              opacity: phase === 'mimo' ? 1 : 0,
              y: phase === 'mimo' ? -8 : 12,
            }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: phase === 'mimo' ? 0.25 : 0 }}
            style={{ position: 'absolute', inset: 0 }}
          >
            Solutions
          </motion.p>
        </div>
      </motion.div>
    </header>
  );
};

export default Hero;
