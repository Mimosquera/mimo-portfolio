import { useState, useEffect } from 'react';
import ProjectCard from '../components/ProjectCard';
import projects from '../data/projects';

const getColCount = () => {
  if (window.innerWidth <= 480) return 1;
  if (window.innerWidth <= 768) return 2;
  return 3;
};

const Portfolio = () => {
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
        <p className="section-label">Work</p>
        <h2 className="section-title">Portfolio</h2>
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
