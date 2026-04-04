import { useState, useEffect } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;

const options = {
  fpsLimit: 60,
  particles: {
    number: { value: isMobile ? 20 : 45, density: { enable: true } },
    color: { value: ['#c9a84c', '#e6e6e6', '#ffffff'] },
    opacity: { value: { min: 0.06, max: 0.28 } },
    size: { value: { min: 1, max: 1.8 } },
    move: {
      enable: true,
      speed: 0.38,
      direction: 'none',
      random: true,
      straight: false,
      outModes: { default: 'out' },
    },
    links: {
      enable: !isMobile,
      distance: 130,
      color: '#c9a84c',
      opacity: 0.05,
      width: 1,
    },
  },
  interactivity: {
    events: {
      onHover: { enable: false },
      onClick: { enable: false },
    },
  },
  detectRetina: true,
};

const ParticleBackground = () => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initParticlesEngine(async engine => {
      await loadSlim(engine);
    }).then(() => setReady(true));
  }, []);

  if (!ready) return null;

  return (
    <Particles
      id="bg-particles"
      className="bg-particles"
      options={options}
    />
  );
};

export default ParticleBackground;
