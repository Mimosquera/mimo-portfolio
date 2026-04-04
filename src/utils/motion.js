export const ease = [0.22, 1, 0.36, 1];

export const vp = { once: true, margin: '-80px' };

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const slideLeft = {
  hidden: { opacity: 0, x: -36 },
  visible: { opacity: 1, x: 0 },
};

export const trans = (duration, delay = 0) => ({ duration, ease, delay });
