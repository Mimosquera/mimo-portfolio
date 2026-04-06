import { useWebHaptics } from 'web-haptics/react';

const ProjectCard = ({ title, image, containImage, imageBg, imagePadding, emoji, emojiColor, onSelect }) => {
  const { trigger } = useWebHaptics();

  return (
    <article
      className="project-card"
      onClick={() => { trigger('selection'); onSelect(); }}
      role="button"
      tabIndex={0}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); trigger('selection'); onSelect(); } }}
    >
      <div
        className={`project-img-wrap${containImage ? ' project-img-contain' : ''}${emoji ? ' project-img-emoji' : ''}`}
        style={{ background: emoji ? emojiColor : (imageBg ?? undefined) }}
      >
        {emoji ? (
          <span className="project-emoji" aria-hidden="true">{emoji}</span>
        ) : (
          <img src={image} alt={title} style={imagePadding ? { padding: imagePadding } : undefined} />
        )}
      </div>
      <div className="project-body">
        <h3>{title}</h3>
      </div>
    </article>
  );
};

export default ProjectCard;
