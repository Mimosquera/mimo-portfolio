const ProjectCard = ({ title, description, image, deploy, repo, containImage, emoji, emojiColor }) => {
  return (
    <article className="project-card">
      <div
        className={`project-img-wrap${containImage ? ' project-img-contain' : ''}${emoji ? ' project-img-emoji' : ''}`}
        style={emoji ? { background: emojiColor } : undefined}
      >
        {emoji ? (
          <span className="project-emoji" role="img" aria-label={title}>{emoji}</span>
        ) : (
          <img src={image} alt={title} />
        )}
      </div>
      <div className="project-body">
        <h3>{title}</h3>
        {description && <p>{description}</p>}
        <div className="project-actions">
          {deploy && (
            <a
              href={deploy}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-accent"
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
            >
              GitHub
            </a>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
