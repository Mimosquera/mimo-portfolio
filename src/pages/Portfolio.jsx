import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useWebHaptics } from 'web-haptics/react';
import ProjectCard from '../components/ProjectCard';
import projects from '../data/projects';

const getColCount = () => {
  if (window.innerWidth <= 480) return 1;
  if (window.innerWidth <= 768) return 2;
  return 3;
};

const Portfolio = () => {
  const [colCount, setColCount] = useState(getColCount);
  const [selected, setSelected] = useState(null);
  const { trigger } = useWebHaptics();

  useEffect(() => {
    const update = () => setColCount(getColCount());
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const close = useCallback(() => setSelected(null), []);

  useEffect(() => {
    if (!selected) return;
    const onKey = e => { if (e.key === 'Escape') close(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [selected, close]);

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
                <ProjectCard
                  key={project.id}
                  {...project}
                  onSelect={() => setSelected(project)}
                />
              ))}
            </div>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {selected && (
          <motion.div
            key="project-overlay"
            className="project-detail-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={close}
          >
            <motion.div
              className="project-detail"
              role="dialog"
              aria-modal="true"
              aria-label={selected.title}
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.97 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              onClick={e => e.stopPropagation()}
            >
              <button
                className="project-detail-close"
                onClick={() => { trigger('selection'); close(); }}
                aria-label="Close"
                autoFocus
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                  <path d="M4.5 4.5L13.5 13.5M13.5 4.5L4.5 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>

              <div
                className={`project-detail-img${selected.containImage ? ' project-img-contain' : ''}${selected.emoji ? ' project-img-emoji' : ''}`}
                style={{ background: selected.emoji ? selected.emojiColor : (selected.imageBg ?? undefined) }}
              >
                {selected.emoji ? (
                  <span className="project-emoji" aria-hidden="true">{selected.emoji}</span>
                ) : (
                  <img
                    src={selected.image}
                    alt={selected.title}
                    style={selected.imagePadding ? { padding: selected.imagePadding } : undefined}
                  />
                )}
              </div>

              <div className="project-detail-body">
                <h3 className="project-detail-title">{selected.title}</h3>
                {selected.description && <p className="project-detail-desc">{selected.description}</p>}
                {selected.deploy && (
                  <div className="project-actions">
                    <a
                      href={selected.deploy}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-accent"
                      aria-label={`${selected.title} live demo, opens in new tab`}
                      onClick={() => trigger('light')}
                    >
                      Live App
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default Portfolio;
