import React, { useEffect, useRef, useState } from 'react';
import SpotlightCard from './SpotlightCard.jsx';

const STATS = [
  { icon: 'fa-solid fa-rocket', value: 25, suffix: '+', label: 'Projects Built', color: 'var(--primary)' },
  { icon: 'fa-solid fa-layer-group', value: 15, suffix: '+', label: 'Tech Stack', color: 'var(--secondary)' },
  { icon: 'fa-solid fa-mug-hot', value: 500, suffix: '+', label: 'Hours Coded', color: '#f43f5e' },
  { icon: 'fa-solid fa-star', value: 1, suffix: '+', label: 'Years of Learning', color: '#f59e0b' },
];

function useCountUp(target, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(ease * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

function StatCard({ stat, animate }) {
  const count = useCountUp(stat.value, 1600, animate);
  return (
    <SpotlightCard className="stat-card" tiltAmount={5}>
      <div className="stat-icon" style={{ color: stat.color, background: `${stat.color}18` }}>
        <i className={stat.icon} />
      </div>
      <div>
        <h3 style={{ color: stat.color }}>{count}{stat.suffix}</h3>
        <p>{stat.label}</p>
      </div>
    </SpotlightCard>
  );
}

export default function About() {
  const [animated, setAnimated] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="about" id="about" ref={sectionRef}>
      <div className="container">
        <div className="section-title-wrapper">
          <span className="section-subtitle">About Me</span>
          <h2 className="heading-lg">The Person Behind the Code</h2>
        </div>

        <div className="about-container">
          {/* Image Column */}
          <div className="about-image-wrapper">
            <div className="about-image-inner">
              {/* Decorative frame elements */}
              <div className="about-img-frame-tl" />
              <div className="about-img-frame-br" />
              <img src="/images/img.jpg" alt="Araf" loading="lazy" />
              <div className="experience-badge">
                <span className="badge-num">01+</span>
                <span className="badge-text">Years of<br />Learning</span>
              </div>
            </div>

            {/* Floating availability card */}
            <div className="about-availability-card">
              <span className="avail-dot" />
              <div>
                <p className="avail-label">Status</p>
                <p className="avail-value">Open to Opportunities</p>
              </div>
            </div>
          </div>

          {/* Content Column */}
          <div className="about-content">
            <div className="about-text">
              <p className="lead-text">
                I'm a Computer Science student at <strong>IIUC</strong> with a passion for
                building exceptional digital experiences.
              </p>
              <p>
                My journey is more than academic — it's a pursuit of technical excellence.
                I bridge the gap between complex backend logic and intuitive, aesthetic
                frontend design, crafting solutions that are both powerful and beautiful.
              </p>
              <p>
                I thrive in environments that challenge my problem-solving skills, constantly
                evolving my stack to include the latest advancements in Web Architecture and
                Artificial Intelligence.
              </p>
            </div>

            {/* Animated Stats Grid */}
            <div className="about-stats">
              {STATS.map((stat, i) => (
                <StatCard key={i} stat={stat} animate={animated} />
              ))}
            </div>

            {/* Signature Skills */}
            <div className="about-skill-chips">
              {['React.js', 'Python', 'Node.js', 'Machine Learning', 'UI/UX', 'DSA'].map((s) => (
                <span key={s} className="skill-chip">{s}</span>
              ))}
            </div>

            <div className="about-cta">
              <a href="#contact" className="btn-primary">
                Let's Talk <i className="fa-solid fa-arrow-right" />
              </a>
              <a href="/file/resume.pdf" download="resume_araf.pdf" className="btn-secondary">
                <i className="fa-solid fa-download" /> Download CV
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
