import React, { useState } from 'react';

const PROJECTS = [
  {
    id: 1,
    title: 'EventEra',
    subtitle: 'Event Management Platform',
    tag: 'Full Stack',
    stack: ['React', 'Node.js', 'MongoDB'],
    image: '/images/EventEra.png',
    github: 'https://github.com/Araf1011',
    demo: 'https://iiuc-event-era-ky69.vercel.app/',
    accent: 'rgba(99, 102, 241, 0.8)',
    size: 'large',
  },
  {
    id: 2,
    title: 'JerseyLagbe',
    subtitle: 'Football Jersey E-Commerce',
    tag: 'E-Commerce',
    stack: ['React', 'Firebase', 'CSS3'],
    image: '/images/JerseyLagbe.png',
    github: 'https://github.com/Araf1011',
    demo: 'https://jersey-lagbe-chi.vercel.app/',
    accent: 'rgba(239, 68, 68, 0.8)',
    size: 'normal',
  },
  {
    id: 3,
    title: 'Araf07 Portfolio',
    subtitle: 'Developer Portfolio',
    tag: 'Web Design',
    stack: ['React', 'Vite', 'CSS'],
    image: '/images/MyPortfolio.png',
    github: 'https://github.com/Araf1011',
    demo: 'https://arafx07.netlify.app',
    accent: 'rgba(16, 185, 129, 0.8)',
    size: 'normal',
  },
  {
    id: 4,
    title: 'Nexus Intelligence',
    subtitle: 'AI / Machine Learning Platform',
    tag: 'AI / ML',
    stack: ['Python', 'TensorFlow', 'React'],
    image: '/images/ComingSoon.png',
    github: 'https://github.com/Araf1011',
    demo: null,
    accent: 'rgba(245, 158, 11, 0.8)',
    size: 'normal',
    wip: true,
  },
  {
    id: 5,
    title: 'Future Store',
    subtitle: 'Next-Gen E-Commerce',
    tag: 'E-Commerce',
    stack: ['Next.js', 'Stripe', 'Tailwind'],
    image: '/images/ComingSoon.png',
    github: 'https://github.com/Araf1011',
    demo: null,
    accent: 'rgba(139, 92, 246, 0.8)',
    size: 'normal',
    wip: true,
  },
];

const FILTERS = ['All', 'Full Stack', 'E-Commerce', 'Web Design', 'AI / ML'];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [hovered, setHovered] = useState(null);

  const filtered = PROJECTS.filter(
    (p) => activeFilter === 'All' || p.tag === activeFilter
  );

  return (
    <section className="project" id="project">
      <div className="container">
        <div className="section-title-wrapper">
          <span className="section-subtitle">Work</span>
          <h2 className="heading-lg">Featured Projects</h2>
          <p className="section-desc">
            A selection of things I've built — from full-stack platforms to polished UI experiments.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="project-filters">
          {FILTERS.map((f) => (
            <button
              key={f}
              className={`filter-pill ${activeFilter === f ? 'active' : ''}`}
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <div className="project-bento-grid">
          {filtered.map((p) => (
            <div
              key={p.id}
              className={`project-bento-card ${p.size === 'large' ? 'card-large' : ''}`}
              onMouseEnter={() => setHovered(p.id)}
              onMouseLeave={() => setHovered(null)}
              style={{ '--accent': p.accent }}
            >
              {/* Image */}
              <div className="pb-image">
                <img src={p.image} alt={p.title} loading="lazy" />
                <div className="pb-image-overlay" />
                {/* Glow accent */}
                <div className="pb-accent-glow" />
              </div>

              {/* WIP Badge */}
              {p.wip && (
                <div className="pb-wip-badge">
                  <span className="wip-dot" />
                  In Progress
                </div>
              )}

              {/* Content */}
              <div className="pb-content">
                <div className="pb-top">
                  <span className="pb-tag">{p.tag}</span>
                  <div className="pb-actions">
                    {p.github && (
                      <a
                        href={p.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="pb-icon-btn"
                        title="View Source"
                        aria-label="GitHub Repository"
                      >
                        <i className="fa-brands fa-github" />
                      </a>
                    )}
                    {p.demo && (
                      <a
                        href={p.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="pb-icon-btn pb-icon-btn--primary"
                        title="Live Demo"
                        aria-label="Live Demo"
                      >
                        <i className="fa-solid fa-arrow-up-right-from-square" />
                      </a>
                    )}
                  </div>
                </div>

                <div className="pb-body">
                  <h3 className="pb-title">{p.title}</h3>
                  <p className="pb-subtitle">{p.subtitle}</p>
                </div>

                <div className="pb-stack">
                  {p.stack.map((s) => (
                    <span key={s} className="pb-stack-pill">{s}</span>
                  ))}
                </div>
              </div>

              {/* Active border accent */}
              <div className="pb-border-glow" />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="project-cta">
          <a
            href="https://github.com/Araf1011"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            <i className="fa-brands fa-github" />
            View All on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
