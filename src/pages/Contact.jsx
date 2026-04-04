import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useWebHaptics } from 'web-haptics/react';

const EMPTY = { name: '', email: '', message: '' };

const Contact = () => {
  const [form, setForm] = useState(EMPTY);
  const [fieldErrors, setFieldErrors] = useState({});
  const [modal, setModal] = useState(null);
  const { trigger } = useWebHaptics();

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
      trigger('error');
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
      trigger('success');
    } catch {
      setModal('network');
      trigger('error');
    }
  };

  const closeModal = () => setModal(null);

  useEffect(() => {
    if (!modal) return;
    const onKey = e => { if (e.key === 'Escape') closeModal(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [modal]);

  return (
    <main id="main-content" tabIndex={-1} style={{ outline: 'none' }}>
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
                aria-invalid={fieldErrors.name ? 'true' : undefined}
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
                aria-invalid={fieldErrors.email ? 'true' : undefined}
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
                autoComplete="off"
                aria-invalid={fieldErrors.message ? 'true' : undefined}
              />
            </div>

            <button type="submit" className="btn btn-accent">
              Send
            </button>
          </form>
        </div>
      </section>

      <AnimatePresence>
        {modal && (
          <motion.div
            key="modal-overlay"
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={closeModal}
          >
            <motion.div
              className="modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              onClick={e => e.stopPropagation()}
            >
              {modal === 'success' && (
                <>
                  <p className="modal-icon">&#10003;</p>
                  <h3 className="modal-title" id="modal-title">Message sent</h3>
                  <p className="modal-body">Thanks for reaching out. I'll get back to you soon.</p>
                </>
              )}
              {modal === 'error' && (
                <>
                  <p className="modal-icon modal-icon-error">&#33;</p>
                  <h3 className="modal-title" id="modal-title">Missing information</h3>
                  <p className="modal-body">Please fill in all required fields before sending.</p>
                </>
              )}
              {modal === 'network' && (
                <>
                  <p className="modal-icon modal-icon-error">&#33;</p>
                  <h3 className="modal-title" id="modal-title">Something went wrong</h3>
                  <p className="modal-body">Your message couldn't be sent. Try emailing me directly at michael2000ny@gmail.com.</p>
                </>
              )}
              <button className="btn btn-accent modal-btn" onClick={closeModal} autoFocus>
                {modal === 'success' ? 'Close' : 'OK'}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default Contact;
