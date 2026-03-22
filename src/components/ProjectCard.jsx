import { motion } from 'motion/react';
import { useWebHaptics } from 'web-haptics/react';
import { ease } from '../utils/motion';
import { useEntryDelay } from '../context/TransitionDelay';

const vp = { once: true, margin: '-40px' };

const ProjectCard = ({ title, description, image, deploy, repo, containImage, imageBg, emoji, emojiColor }) => {
  const { trigger } = useWebHaptics();
  const d = useEntryDelay();

  return (
    <article className="project-card">
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
        <motion.h3
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.45, ease, delay: 0.1 + d }}
        >
          {title}
        </motion.h3>

        {description && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={vp}
            transition={{ duration: 0.4, ease, delay: 0.18 + d }}
          >
            {description}
          </motion.p>
        )}

        {(deploy || repo) && (
          <motion.div
            className="project-actions"
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={vp}
            transition={{ duration: 0.38, ease, delay: 0.28 + d }}
          >
            {deploy && (
              <a
                href={deploy}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-accent"
                aria-label={`${title} — live demo, opens in new tab`}
                onClick={() => trigger('light')}
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
                aria-label={`${title} — source on GitHub, opens in new tab`}
                onClick={() => trigger('light')}
              >
                GitHub
              </a>
            )}
          </motion.div>
        )}
      </div>
    </article>
  );
};

export default ProjectCard;
