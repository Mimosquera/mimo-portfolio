import ProjectCard from '../components/ProjectCard';
import projects from '../data/projects';

const Portfolio = () => {
  return (
    <main>
      <section className="section">
        <p className="section-label">Work</p>
        <h2 className="section-title">Portfolio</h2>
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
