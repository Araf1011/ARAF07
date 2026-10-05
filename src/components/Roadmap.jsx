import React, { useEffect, useRef } from 'react';

const MILESTONES = [
  {
    id: 1,
    icon: 'fa-solid fa-graduation-cap',
    date: '2024 — Present',
    title: 'B.Sc in Computer Science',
    org: 'IIUC — Chittagong',
    desc: 'Mastering core fundamentals — data structures, algorithms, and modern software engineering. Building a foundation for everything ahead.',
    status: 'current',
    direction: 'right',
    tags: ['DSA', 'OOP', 'Algorithms'],
    color: '#6366f1',
  },
  {
    id: 2,
    icon: 'fa-solid fa-code',
    date: '2025 — Present',
    title: 'Frontend & React Ecosystem',
    org: 'Self-driven Innovation',
    desc: 'Designing high-fidelity, performant interfaces. Crafting responsive, user-centric web apps with React, Vite, and modern JavaScript.',
    status: 'current',
    direction: 'left',
    tags: ['React', 'JavaScript', 'CSS3'],
    color: '#8b5cf6',
  },
  {
    id: 3,
    icon: 'fa-solid fa-brain',
    date: 'Near Future',
    title: 'Machine Learning & AI',
    org: 'Career Path',
    desc: 'Diving deep into ML fundamentals, neural networks, and applied AI — bridging intelligence with beautiful interfaces.',
    status: 'upcoming',
    direction: 'right',
    tags: ['Python', 'TensorFlow', 'NLP'],
    color: '#f43f5e',
  },
  {
    id: 4,
    icon: 'fa-solid fa-rocket',
    date: 'Destination',
    title: 'Full Stack & AI Engineer',
    org: 'The Goal',
    desc: 'Becoming a complete engineer — building intelligent, scalable systems from database to deployment to UI.',
    status: 'future',
    direction: 'left',
    tags: ['Node.js', 'Databases', 'DevOps'],
    color: '#f59e0b',
  },
];

export default function Roadmap() {
  const pathRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const cards = sectionRef.current?.querySelectorAll('.rm-card');
          cards?.forEach((card, i) => {
            setTimeout(() => {
              card.classList.add('rm-card--visible');
            }, i * 200);
          });
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="experience" id="experience" ref={sectionRef}>
      <div className="container">
        <div className="section-title-wrapper">
          <span className="section-subtitle">The Journey</span>
          <h2 className="heading-lg">My Learning Road</h2>
          <p className="section-desc">A winding path of milestones, skills, and destinations ahead.</p>
        </div>

        <div className="rm-road-wrapper">
          {/* SVG Road — winding path */}
          <svg
            className="rm-svg-road"
            viewBox="0 0 800 1400"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
          >
            {/* Road base — wide gray */}
            <path
              className="rm-road-base"
              d="M400,60 C400,60 400,120 400,180 C400,240 320,280 280,340 C240,400 240,460 280,520 C320,580 480,620 520,680 C560,740 560,800 520,860 C480,920 320,960 280,1020 C240,1080 240,1140 280,1200 C320,1260 400,1300 400,1380"
            />
            {/* Center dashed line */}
            <path
              className="rm-road-center"
              ref={pathRef}
              d="M400,60 C400,60 400,120 400,180 C400,240 320,280 280,340 C240,400 240,460 280,520 C320,580 480,620 520,680 C560,740 560,800 520,860 C480,920 320,960 280,1020 C240,1080 240,1140 280,1200 C320,1260 400,1300 400,1380"
            />
            {/* Animated car/dot traveling the road */}
            <circle className="rm-car" r="8">
              <animateMotion
                dur="8s"
                repeatCount="indefinite"
                path="M400,60 C400,60 400,120 400,180 C400,240 320,280 280,340 C240,400 240,460 280,520 C320,580 480,620 520,680 C560,740 560,800 520,860 C480,920 320,960 280,1020 C240,1080 240,1140 280,1200 C320,1260 400,1300 400,1380"
              />
            </circle>
          </svg>

          {/* Milestone Cards */}
          <div className="rm-milestones">
            {MILESTONES.map((m, idx) => (
              <div
                key={m.id}
                className={`rm-card rm-card--${m.direction} rm-card--${m.status}`}
                style={{ '--rm-color': m.color }}
              >
                {/* Connector line from card to road */}
                <div className="rm-connector" />

                {/* Stop marker on road */}
                <div className="rm-stop-marker">
                  <i className={m.icon} />
                  {m.status === 'current' && <span className="rm-pulse-ring" />}
                </div>

                {/* Card content */}
                <div className="rm-card-body">
                  {/* Road sign top */}
                  <div className="rm-sign-header">
                    <div className="rm-sign-icon">
                      <i className={m.icon} />
                    </div>
                    <div>
                      <span className="rm-date">{m.date}</span>
                      <span className={`rm-status-badge rm-status-badge--${m.status}`}>
                        {m.status === 'current' ? '🟢 Active' : m.status === 'upcoming' ? '🔵 Next Stop' : '🏁 Destination'}
                      </span>
                    </div>
                  </div>

                  <h3 className="rm-title">{m.title}</h3>
                  <p className="rm-org">{m.org}</p>
                  <p className="rm-desc">{m.desc}</p>

                  <div className="rm-tags">
                    {m.tags.map((t) => (
                      <span key={t} className="rm-tag">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Road ending */}
        <div className="rm-destination">
          <div className="rm-finish-flag">
            <i className="fa-solid fa-flag-checkered" />
          </div>
          <p>Destination Ahead</p>
        </div>
      </div>
    </section>
  );
}
