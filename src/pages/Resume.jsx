import { motion } from 'motion/react';
import { ease, vp } from '../utils/motion';
import { useEntryDelay } from '../context/TransitionDelay';

const skills = [
  'JavaScript', 'React', 'Node.js', 'Express',
  'PostgreSQL', 'MongoDB', 'React Router', 'HTML',
  'CSS', 'Git', 'REST APIs', 'Vite',
];

const Resume = () => {
  const d = useEntryDelay();

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 24, filter: 'blur(4px)' },
    whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
    viewport: vp,
    transition: { duration: 0.65, ease, delay: delay + d },
  });

  return (
    <main id="main-content" tabIndex={-1} style={{ outline: 'none' }}>
    <section className="section resume-section">
      <motion.p className="section-label" {...fadeUp()}>
        Background
      </motion.p>
      <motion.h2 className="section-title" {...fadeUp(0.08)}>
        Resume
      </motion.h2>
      <a
        href="/Michael-Mosquera-Resume.pdf"
        className="btn btn-outline resume-dl-mobile"
        target="_blank"
        rel="noopener noreferrer"
        download="Michael Mosquera - Resume.pdf"
        aria-label="Download resume as PDF, opens in new tab"
      >
        Download PDF
      </a>

      <div className="resume-layout">
        <aside>
          <motion.div className="resume-block" {...fadeUp(0.1)}>
            <p className="resume-block-title">Skills</p>
            <ul className="skill-tags">
              {skills.map((skill, i) => (
                <motion.li
                  key={skill}
                  className="skill-tag"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, ease, delay: 0.1 + i * 0.04 + d }}
                >
                  {skill}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div className="resume-block" {...fadeUp(0.18)}>
            <p className="resume-block-title">Education</p>
            <div className="resume-entry">
              <div className="entry-header">
                <span className="entry-title">Full Stack Web Development</span>
                <span className="entry-date">2024 &ndash; 2025</span>
              </div>
              <p className="entry-sub">edX Coding Bootcamp</p>
            </div>
          </motion.div>

          <div className="resume-block resume-dl-desktop">
            <a
              href="/Michael-Mosquera-Resume.pdf"
              className="btn btn-outline"
              target="_blank"
              rel="noopener noreferrer"
              download="Michael Mosquera - Resume.pdf"
              aria-label="Download resume as PDF, opens in new tab"
            >
              Download PDF
            </a>
          </div>
        </aside>

        <div>
          <motion.div className="resume-block" {...fadeUp(0.12)}>
            <p className="resume-block-title">Experience</p>
            <div className="resume-entry">
              <div className="entry-header">
                <span className="entry-title">Freelance Web Developer</span>
                <span className="entry-date">2024 &ndash; Present</span>
              </div>
              <p className="entry-sub">Self-Employed, Virginia</p>
              <ul className="entry-list">
                <li>Built React SPAs for clients, covering routing, forms, state management, and responsive layout</li>
                <li>Built REST APIs with Node.js and Express backed by PostgreSQL and MongoDB; handled auth with JWT and bcrypt</li>
                <li>Managed most projects solo from the first conversation with the client through deployment and post-launch fixes</li>
                <li>Iterated on feedback directly with clients; got comfortable explaining technical tradeoffs in plain terms</li>
              </ul>
            </div>
          </motion.div>

          <motion.div className="resume-block" {...fadeUp(0.22)}>
            <p className="resume-block-title">Projects</p>
            <div className="resume-entry">
              <div className="entry-header">
                <span className="entry-title">Vaulted</span>
              </div>
              <ul className="entry-list">
                <li>App for cataloguing physical collections: cards, figures, vinyl, manga, games. Log what you own, add photos and notes, browse public vaults, and follow other collectors</li>
                <li>React + Vite with Zustand, Node.js/Express API, PostgreSQL, Cloudinary; JWT auth and offline-first sync via IndexedDB</li>
                <li>Live at <a href="https://vaulted-collecting.com" target="_blank" rel="noopener noreferrer">vaulted-collecting.com</a></li>
              </ul>
            </div>
            <div className="resume-entry">
              <div className="entry-header">
                <span className="entry-title">New Flow</span>
              </div>
              <ul className="entry-list">
                <li>Full-stack barbershop appointment system. Customers book appointments; staff manage schedules and availability</li>
                <li>React + Vite frontend, Node.js/Express API, PostgreSQL with Sequelize; JWT auth, Cloudinary uploads, Twilio SMS, Nodemailer, and bilingual English/Spanish support</li>
                <li>Live at <a href="https://newflowbarbershop.com" target="_blank" rel="noopener noreferrer">newflowbarbershop.com</a></li>
              </ul>
            </div>
            <div className="resume-entry">
              <div className="entry-header">
                <span className="entry-title">Happy Nic Day</span>
              </div>
              <ul className="entry-list">
                <li>Birthday app built for my partner: floating hearts, gyroscope balloon, microphone breath detection via Web Audio API, randomized questions, and a compliment machine</li>
                <li>Built with React and Vite; custom collision avoidance, motion permission caching, and canvas-confetti effects</li>
              </ul>
            </div>
            <div className="resume-entry">
              <div className="entry-header">
                <span className="entry-title">Pet Tag</span>
              </div>
              <ul className="entry-list">
                <li>Pet name generator: pick an animal type and characteristics to get a generated name. Saves to local storage.</li>
                <li>Bootcamp group project built with vanilla HTML, CSS, and JS</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  </main>
  );
};

export default Resume;
