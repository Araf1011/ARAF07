import React, { useState } from 'react';

const SOCIALS = [
  { href: 'https://github.com/Araf1011', icon: 'fa-brands fa-github', label: 'GitHub', color: '#f9fafb' },
  { href: 'https://linkedin.com/in/mohammad-hossain-b11350278/', icon: 'fa-brands fa-linkedin', label: 'LinkedIn', color: '#0ea5e9' },
  { href: 'https://wa.me/8801887789984', icon: 'fa-brands fa-whatsapp', label: 'WhatsApp', color: '#22c55e' },
];

const CONTACT_INFO = [
  { icon: 'fa-solid fa-envelope', label: 'Email', value: 'myselfaraf1457@gmail.com', href: 'mailto:myselfaraf1457@gmail.com', color: 'var(--primary)' },
  { icon: 'fa-solid fa-location-dot', label: 'Location', value: 'Chittagong, Bangladesh', href: null, color: '#f43f5e' },
  { icon: 'fa-solid fa-phone', label: 'WhatsApp', value: '+880 1887-789984', href: 'https://wa.me/8801887789984', color: '#22c55e' },
];

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle');
  const [focused, setFocused] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 4000);
    }, 1400);
  };

  const handleChange = (field) => (e) =>
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));

  return (
    <section className="contact" id="contact">
      <div className="container">
        <div className="section-title-wrapper">
          <span className="section-subtitle">Get In Touch</span>
          <h2 className="heading-lg">Let's Build Something<br />
            <span className="text-gradient">Extraordinary</span>
          </h2>
          <p className="section-desc">
            Have a project in mind or just want to chat? My inbox is always open.
          </p>
        </div>

        <div className="contact-container">
          {/* Left Panel — Info */}
          <div className="contact-info-panel">
            <div className="contact-tagline">
              <p>
                I'm currently available for freelance work and full-time positions.
                Let's create something amazing together.
              </p>
            </div>

            {/* Info Cards */}
            <div className="contact-info-list">
              {CONTACT_INFO.map((item, i) => (
                <div
                  key={i}
                  className="contact-info-row"
                  style={{ '--row-color': item.color }}
                >
                  <div className="cir-icon">
                    <i className={item.icon} />
                  </div>
                  <div className="cir-body">
                    <span className="cir-label">{item.label}</span>
                    {item.href ? (
                      <a href={item.href} className="cir-value">{item.value}</a>
                    ) : (
                      <p className="cir-value">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="contact-socials">
              <p className="socials-label">Find me on</p>
              <div className="socials-row">
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon-btn"
                    title={s.label}
                    style={{ '--social-color': s.color }}
                  >
                    <i className={s.icon} />
                    <span>{s.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel — Form */}
          <div className="contact-form-panel">
            {status === 'success' ? (
              <div className="form-success-state">
                <div className="success-icon">
                  <i className="fa-solid fa-circle-check" />
                </div>
                <h3>Message Sent!</h3>
                <p>Thanks for reaching out. I'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form className="contact-form-v2" onSubmit={handleSubmit} noValidate>
                <div className="form-row">
                  <div className={`form-field ${focused === 'name' || formData.name ? 'active' : ''}`}>
                    <label htmlFor="contact-name">Full Name</label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange('name')}
                      onFocus={() => setFocused('name')}
                      onBlur={() => setFocused(null)}
                      autoComplete="name"
                    />
                    <div className="field-line" />
                  </div>

                  <div className={`form-field ${focused === 'email' || formData.email ? 'active' : ''}`}>
                    <label htmlFor="contact-email">Email Address</label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange('email')}
                      onFocus={() => setFocused('email')}
                      onBlur={() => setFocused(null)}
                      autoComplete="email"
                    />
                    <div className="field-line" />
                  </div>
                </div>

                <div className={`form-field ${focused === 'subject' || formData.subject ? 'active' : ''}`}>
                  <label htmlFor="contact-subject">Subject</label>
                  <input
                    id="contact-subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleChange('subject')}
                    onFocus={() => setFocused('subject')}
                    onBlur={() => setFocused(null)}
                  />
                  <div className="field-line" />
                </div>

                <div className={`form-field ${focused === 'message' || formData.message ? 'active' : ''}`}>
                  <label htmlFor="contact-message">Message</label>
                  <textarea
                    id="contact-message"
                    rows="5"
                    required
                    value={formData.message}
                    onChange={handleChange('message')}
                    onFocus={() => setFocused('message')}
                    onBlur={() => setFocused(null)}
                  />
                  <div className="field-line" />
                </div>

                <button
                  type="submit"
                  className={`btn-send ${status === 'sending' ? 'loading' : ''}`}
                  disabled={status === 'sending'}
                >
                  {status === 'sending' ? (
                    <>
                      <span className="btn-spinner" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <i className="fa-solid fa-paper-plane" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
