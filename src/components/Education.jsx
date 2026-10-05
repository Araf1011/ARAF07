import React, { useEffect, useRef, useState } from 'react';
import SpotlightCard from './SpotlightCard.jsx';

const EDUCATION = [
  {
    id: 1,
    degree: 'B.Sc in Computer Science & Engineering',
    institution: 'IIUC — International Islamic University Chittagong',
    location: 'Chittagong, Bangladesh',
    period: '2024 — Present',
    status: 'ongoing',
    icon: 'fa-solid fa-graduation-cap',
    color: '#6366f1',
    highlights: [
      'Data Structures & Algorithms',
      'Object-Oriented Programming',
      'Database Management Systems',
      'Computer Networks',
      'Software Engineering',
      'Discrete Mathematics',
    ],
    achievements: [
      { icon: 'fa-solid fa-code', text: 'Active competitive programmer on Codeforces' },
      { icon: 'fa-solid fa-laptop-code', text: 'Built multiple full-stack projects during studies' },
      { icon: 'fa-solid fa-users', text: 'Collaborative team projects & hackathons' },
    ],
  },
  {
    id: 2,
    degree: 'Higher Secondary Certificate (HSC)',
    institution: 'Science Background',
    location: 'Bangladesh',
    period: '2021 — 2023',
    status: 'completed',
    icon: 'fa-solid fa-school',
    color: '#8b5cf6',
    highlights: [
      'Physics',
      'Chemistry',
      'Mathematics',
      'Biology',
      'ICT',
      'English',
    ],
    achievements: [
      { icon: 'fa-solid fa-flask', text: 'Strong foundation in science & mathematics' },
      { icon: 'fa-solid fa-star', text: 'Developed analytical problem-solving skills' },
    ],
  },
  {
    id: 3,
    degree: 'Secondary School Certificate (SSC)',
    institution: 'Science Background',
    location: 'Bangladesh',
    period: 'Completed 2021',
    status: 'completed',
    icon: 'fa-solid fa-book-open',
    color: '#10b981',
    highlights: [
      'Mathematics',
      'Physics',
      'Chemistry',
      'ICT',
      'English',
      'Bengali',
    ],
    achievements: [
      { icon: 'fa-solid fa-seedling', text: 'Foundation in logical reasoning & computation' },
    ],
  },
];

const CERTIFICATIONS = [
  {
    id: 1,
    title: 'React & Frontend Development',
    issuer: 'Self-driven — Projects & Practice',
    icon: 'fa-brands fa-react',
    color: '#61dafb',
    year: '2025',
  },
  {
    id: 2,
    title: 'Python & Machine Learning Fundamentals',
    issuer: 'Ongoing Learning Path',
    icon: 'fa-brands fa-python',
    color: '#f59e0b',
    year: '2025',
  },
  {
    id: 3,
    title: 'Codeforces Competitive Programming',
    issuer: 'Codeforces — Pupil Rank',
    icon: 'fa-solid fa-trophy',
    color: '#4ade80',
    year: '2024 — Present',
  },
  {
    id: 4,
    title: 'Full Stack Web Development',
    issuer: 'Project-based Learning',
    icon: 'fa-solid fa-layer-group',
    color: '#a78bfa',
    year: '2025',
  },
];

export default function Education() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [activeCard, setActiveCard] = useState(1);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const activeEdu = EDUCATION.find((e) => e.id === activeCard);

  return (
    <section className="education-section" id="education" ref={sectionRef}>
      <div className="container">
        <div className="section-title-wrapper">
          <span className="section-subtitle">Academic Background</span>
          <h2 className="heading-lg">Education</h2>
          <p className="section-desc">
            The foundations that shaped my thinking — from science classrooms to computer labs.
          </p>
        </div>

        <div className={`edu-layout ${visible ? 'edu-layout--visible' : ''}`}>

          {/* Left — Timeline Selector */}
          <div className="edu-timeline">
            <div className="edu-tl-line" />
            {EDUCATION.map((edu, i) => (
              <div
                key={edu.id}
                className={`edu-timeline-item ${activeCard === edu.id ? 'edu-timeline-item--active' : ''}`}
                style={{ '--edu-color': edu.color, animationDelay: `${i * 0.15}s` }}
                onClick={() => setActiveCard(edu.id)}
              >
                <div className="edu-tl-dot">
                  <i className={edu.icon} />
                  {edu.status === 'ongoing' && <span className="edu-pulse" />}
                </div>
                <div className="edu-tl-info">
                  <span className="edu-tl-period">{edu.period}</span>
                  <p className="edu-tl-degree">{edu.degree}</p>
                  <span className="edu-tl-inst">{edu.institution}</span>
                </div>
                {edu.status === 'ongoing' && (
                  <span className="edu-ongoing-badge">Ongoing</span>
                )}
              </div>
            ))}
          </div>

          {/* Right — Detail Card */}
          {activeEdu && (
            <div className="edu-detail-wrapper" key={activeEdu.id}>
              <SpotlightCard
                className="edu-detail-card"
                spotlightColor={`${activeEdu.color}20`}
                borderColor={`${activeEdu.color}50`}
                tiltAmount={3}
              >
                <div className="edu-card-header" style={{ '--edu-color': activeEdu.color }}>
                  <div className="edu-card-icon">
                    <i className={activeEdu.icon} />
                  </div>
                  <div className="edu-card-meta">
                    <span className="edu-card-period">{activeEdu.period}</span>
                    {activeEdu.status === 'ongoing' ? (
                      <span className="edu-status-badge">
                        <span className="edu-status-dot" /> Currently Enrolled
                      </span>
                    ) : (
                      <span className="edu-status-badge edu-status-badge--done">
                        <i className="fa-solid fa-circle-check" /> Completed
                      </span>
                    )}
                  </div>
                </div>

                <h3 className="edu-card-degree">{activeEdu.degree}</h3>
                <p className="edu-card-inst">
                  <i className="fa-solid fa-building-columns" />
                  {activeEdu.institution}
                </p>
                <p className="edu-card-loc">
                  <i className="fa-solid fa-location-dot" />
                  {activeEdu.location}
                </p>

                <div className="edu-card-divider" style={{ background: `linear-gradient(90deg, ${activeEdu.color}60, transparent)` }} />

                <div className="edu-courses">
                  <p className="edu-courses-label">
                    <i className="fa-solid fa-book" /> Key Subjects
                  </p>
                  <div className="edu-courses-grid">
                    {activeEdu.highlights.map((h) => (
                      <span key={h} className="edu-course-chip" style={{ '--edu-color': activeEdu.color }}>
                        {h}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="edu-achievements">
                  <p className="edu-courses-label">
                    <i className="fa-solid fa-star" /> Highlights
                  </p>
                  {activeEdu.achievements.map((a, i) => (
                    <div key={i} className="edu-achievement-row" style={{ '--edu-color': activeEdu.color }}>
                      <i className={a.icon} />
                      <span>{a.text}</span>
                    </div>
                  ))}
                </div>
              </SpotlightCard>
            </div>
          )}
        </div>

        {/* Certifications & Learning */}
        <div className={`edu-certs-section ${visible ? 'edu-certs--visible' : ''}`}>
          <div className="edu-certs-header">
            <i className="fa-solid fa-certificate" />
            <h3>Certifications & Continuous Learning</h3>
          </div>
          <div className="edu-certs-grid">
            {CERTIFICATIONS.map((cert, i) => (
              <SpotlightCard
                key={cert.id}
                className="edu-cert-card"
                spotlightColor={`${cert.color}15`}
                tiltAmount={6}
              >
                <div className="edu-cert-icon" style={{ color: cert.color, background: `${cert.color}18` }}>
                  <i className={cert.icon} />
                </div>
                <div className="edu-cert-info">
                  <p className="edu-cert-title">{cert.title}</p>
                  <span className="edu-cert-issuer">{cert.issuer}</span>
                  <span className="edu-cert-year" style={{ color: cert.color }}>{cert.year}</span>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
