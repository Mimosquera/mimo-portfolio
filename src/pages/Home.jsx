import { motion } from 'motion/react';
import Hero from '../components/layout/Hero';

const fadeUp = {
  hidden: { opacity: 0, y: 36, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
};

const slideIn = {
  hidden: { opacity: 0, x: -48, filter: 'blur(8px)' },
  visible: { opacity: 1, x: 0, filter: 'blur(0px)' },
};

const ease = [0.22, 1, 0.36, 1];
const vp = { once: true, margin: '-80px' };

const Home = () => {
  return (
    <>
      <Hero />
      <main>
        <section className="section">
          <motion.h2
            className="section-title"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={vp}
            transition={{ duration: 0.75, ease }}
          >
            About Me
          </motion.h2>
          <div className="about-grid">
            <motion.img
              src="/facecard.jpeg"
              alt="Michael Mosquera"
              className="about-photo"
              variants={slideIn}
              initial="hidden"
              whileInView="visible"
              viewport={vp}
              transition={{ duration: 0.9, ease }}
            />
            <div className="about-body">
              <motion.p
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={vp}
                transition={{ duration: 0.7, ease, delay: 0.08 }}
              >
                I'm Michael, a full stack developer based in Virginia. I
                completed the edX coding bootcamp in spring 2025 and have
                been building with React and Node.js since.
              </motion.p>
              <motion.p
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={vp}
                transition={{ duration: 0.7, ease, delay: 0.2 }}
              >
                Most of my work is on the frontend: React, component
                architecture, routing, responsive layout. On the backend I
                build REST APIs with Node.js, Express, and PostgreSQL or
                MongoDB depending on the project. I can ship a full app
                end to end.
              </motion.p>
              <motion.p
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={vp}
                transition={{ duration: 0.7, ease, delay: 0.32 }}
              >
                When something isn't clicking, I go read the source or
                build a small version of it on my own. That's how most of
                what I actually know stuck.
              </motion.p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
