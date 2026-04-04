import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { useWebHaptics } from 'web-haptics/react';
import { ease } from '../utils/motion';
import { useEntryDelay } from '../context/TransitionDelay';

const vp = { once: true, margin: '-40px' };

const ProjectCard = ({ title, description, image, deploy, repo, containImage, imageBg, emoji, emojiColor }) => {
  const { trigger } = useWebHaptics();
  const d = useEntryDelay();
  const [open, setOpen] = useState(false);
  const innerRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (!innerRef.current) return;
    const measure = () => setHeight(innerRef.current.offsetHeight);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(innerRef.current);
    return () => ro.disconnect();
  }, []);

  const toggle = () => {
    trigger('selection');
    setOpen(prev => !prev);
  };

  return (
    <article className={`project-card${open ? ' project-card-open' : ''}`}>
      <motion.div
        className={`project-img-wrap${containImage ? ' project-img-contain' : ''}${emoji ? ' project-img-emoji' : ''}`}
        style={{ background: emoji ? emojiColor : (imageBg ?? undefined) }}
        initial={{ opacity: 0, scale: 1.06 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={vp}
        transition={{ duration: 0.55, ease, delay: d }}
      >
        {emoji ? (
          <span className="project-emoji" aria-hidden="true">{emoji}</span>
        ) : (
          <img src={image} alt={title} />
        )}
      </motion.div>

      <div className="project-body">
        <motion.button
          className="project-toggle"
          onClick={toggle}
          aria-expanded={open}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.45, ease, delay: 0.1 + d }}
        >
          <h3>{title}</h3>
          <svg
            className={`project-chevron${open ? ' project-chevron-open' : ''}`}
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden="true"
          >
            <path d="M3.5 5.25L7 8.75L10.5 5.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.button>

        <div
          className="project-collapse"
          style={{ height: open ? height : 0 }}
        >
          <div ref={innerRef} className="project-collapse-inner">
            {description && <p>{description}</p>}

            {(deploy || repo) && (
              <div className="project-actions">
                {deploy && (
                  <a
                    href={deploy}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-accent"
                    aria-label={`${title} live demo, opens in new tab`}
                    onClick={() => trigger('light')}
                    tabIndex={open ? 0 : -1}
                  >
                    Live App
                  </a>
                )}
                {repo && (
                  <a
                    href={repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline"
                    aria-label={`${title} source on GitHub, opens in new tab`}
                    onClick={() => trigger('light')}
                    tabIndex={open ? 0 : -1}
                  >
                    GitHub
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
