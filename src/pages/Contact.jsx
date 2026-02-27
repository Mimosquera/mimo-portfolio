import { useState } from 'react';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
  };

  return (
    <main>
      <section className="section">
        <p className="section-label">Contact</p>
        <h2 className="section-title">Get in Touch</h2>
        <div className="contact-layout">
          <div>
            <p className="contact-desc">
              If you have a role or project in mind, reach out. I check my
              email every day.
            </p>
            <nav className="contact-links" aria-label="Contact details">
              <a href="tel:3477037291">347-703-7291</a>
              <a href="mailto:michael2000ny@gmail.com">michael2000ny@gmail.com</a>
            </nav>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-field">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                className="form-input"
                value={form.name}
                onChange={handleChange}
                required
                autoComplete="name"
              />
            </div>
            <div className="form-field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                className="form-input"
                value={form.email}
                onChange={handleChange}
                required
                autoComplete="email"
              />
            </div>
            <div className="form-field">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                className="form-input"
                rows={5}
                value={form.message}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-accent">
              Send
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Contact;
