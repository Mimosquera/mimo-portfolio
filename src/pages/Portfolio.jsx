import { motion } from 'motion/react';
import ProjectCard from '../components/ProjectCard';
import projects from '../data/projects';
import { fadeUp, ease, vp } from '../utils/motion';
import { useEntryDelay } from '../context/TransitionDelay';

const Portfolio = () => {
  const d = useEntryDelay();

  return (
    <main id="main-content" tabIndex={-1} style={{ outline: 'none' }}>
      <section className="section">
        <motion.p
          className="section-label"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={vp}
          transition={{ duration: 0.6, ease, delay: d }}
        >
          Work
        </motion.p>
        <motion.h2
          className="section-title"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={vp}
          transition={{ duration: 0.7, ease, delay: 0.08 + d }}
        >
          Portfolio
        </motion.h2>
        <div className="projects-grid">
          {projects.map(project => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Portfolio;
