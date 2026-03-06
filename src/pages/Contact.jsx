import { useState } from 'react';

const EMPTY = { name: '', email: '', message: '' };

const Contact = () => {
  const [form, setForm] = useState(EMPTY);
  const [fieldErrors, setFieldErrors] = useState({});
  const [modal, setModal] = useState(null); // 'error' | 'success' | 'network'

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) setFieldErrors(prev => ({ ...prev, [name]: false }));
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = true;
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = true;
    if (!form.message.trim()) errs.message = true;
    return errs;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setFieldErrors(errs);
      setModal('error');
      return;
    }
    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ 'form-name': 'contact', ...form }).toString(),
      });
      if (!res.ok) throw new Error();
      setForm(EMPTY);
      setFieldErrors({});
      setModal('success');
    } catch {
      setModal('network');
    }
  };

  const closeModal = () => setModal(null);

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
                className={`form-input${fieldErrors.name ? ' form-input-error' : ''}`}
                value={form.name}
                onChange={handleChange}
                autoComplete="name"
              />
            </div>
            <div className="form-field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                className={`form-input${fieldErrors.email ? ' form-input-error' : ''}`}
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
              />
            </div>
            <div className="form-field">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                className={`form-input${fieldErrors.message ? ' form-input-error' : ''}`}
                rows={5}
                value={form.message}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="btn btn-accent">
              Send
            </button>
          </form>
        </div>
      </section>

      {modal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" role="dialog" aria-modal="true" onClick={e => e.stopPropagation()}>
            {modal === 'success' && (
              <>
                <p className="modal-icon">&#10003;</p>
                <h3 className="modal-title">Message sent</h3>
                <p className="modal-body">Thanks for reaching out. I'll get back to you soon.</p>
              </>
            )}
            {modal === 'error' && (
              <>
                <p className="modal-icon modal-icon-error">&#33;</p>
                <h3 className="modal-title">Missing information</h3>
                <p className="modal-body">Please fill in all required fields before sending.</p>
              </>
            )}
            {modal === 'network' && (
              <>
                <p className="modal-icon modal-icon-error">&#33;</p>
                <h3 className="modal-title">Something went wrong</h3>
                <p className="modal-body">Your message couldn't be sent. Try emailing me directly at michael2000ny@gmail.com.</p>
              </>
            )}
            <button className="btn btn-accent modal-btn" onClick={closeModal}>
              {modal === 'success' ? 'Close' : 'OK'}
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default Contact;
