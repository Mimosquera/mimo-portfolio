import Hero from '../components/layout/Hero';

const Home = () => {
  return (
    <>
      <Hero />
      <main id="main-content" tabIndex={-1} style={{ outline: 'none' }}>
        <section className="section">
          <h2 className="section-title">About Me</h2>
          <div className="about-grid">
            <img
              src="/facecard.jpeg"
              alt="Michael Mosquera"
              className="about-photo"
            />
            <div className="about-body">
              <p>
                I'm Michael, a full stack developer based in Virginia. I
                completed the edX coding bootcamp in spring 2025 and have
                been building with React and Node.js since.
              </p>
              <p>
                Most of my work is on the frontend: React, component
                architecture, routing, responsive layout. On the backend I
                build REST APIs with Node.js, Express, and PostgreSQL or
                MongoDB depending on the project. I can ship a full app
                end to end.
              </p>
              <p>
                When something isn't clicking, I go read the source or
                build a small version of it on my own. That's how most of
                what I actually know stuck.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
