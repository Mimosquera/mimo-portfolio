import { motion } from 'motion/react';
import ProjectCard from '../components/ProjectCard';
import projects from '../data/projects';

const fadeUp = {
  hidden: { opacity: 0, y: 32, filter: 'blur(6px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
};

const ease = [0.22, 1, 0.36, 1];
const vp = { once: true, margin: '-60px' };

const Portfolio = () => {
  return (
    <main>
      <section className="section">
        <motion.p
          className="section-label"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={vp}
          transition={{ duration: 0.6, ease }}
        >
          Work
        </motion.p>
        <motion.h2
          className="section-title"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={vp}
          transition={{ duration: 0.7, ease, delay: 0.08 }}
        >
          Portfolio
        </motion.h2>
        <div className="projects-grid">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={vp}
              transition={{ duration: 0.65, ease, delay: i * 0.12 }}
            >
              <ProjectCard {...project} />
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Portfolio;
