const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <span className="footer-copy">&copy; {year} Michael Mosquera</span>
        <nav className="footer-links" aria-label="Social links">
          <a
            href="https://github.com/Mimosquera"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a href="mailto:michael2000ny@gmail.com">Email</a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
