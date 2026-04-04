import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import ProjectCard from '../components/ProjectCard';
import projects from '../data/projects';
import { fadeUp, ease, vp } from '../utils/motion';
import { useEntryDelay } from '../context/TransitionDelay';

const getColCount = () => {
  if (window.innerWidth <= 480) return 1;
  if (window.innerWidth <= 768) return 2;
  return 3;
};

const Portfolio = () => {
  const d = useEntryDelay();
  const [colCount, setColCount] = useState(getColCount);

  useEffect(() => {
    const update = () => setColCount(getColCount());
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const columns = Array.from({ length: colCount }, () => []);
  projects.forEach((p, i) => columns[i % colCount].push(p));

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
          {columns.map((col, ci) => (
            <div key={ci} className="projects-column">
              {col.map(project => (
                <ProjectCard key={project.id} {...project} />
              ))}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Portfolio;
