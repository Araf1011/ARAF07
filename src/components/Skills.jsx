import React from 'react';
import SpotlightCard from './SpotlightCard.jsx';

const SKILL_CARDS = [
  { icon: 'fa-brands fa-html5', title: 'Structure', desc: 'HTML5 / Semantic Web' },
  { icon: 'fa-brands fa-css3-alt', title: 'Aesthetics', desc: 'CSS3 / Modern Layouts' },
  { icon: 'fa-brands fa-react', title: 'Frontend', desc: 'React.js / JavaScript ES6+' },
  { icon: 'fa-brands fa-python', title: 'Intelligence', desc: 'Python / ML Core' },
  { icon: 'fa-solid fa-code-merge', title: 'Version Control', desc: 'Git / GitHub Workflow' },
  { icon: 'fa-solid fa-terminal', title: 'Logic & Algo', desc: 'DSA / Problem Solving' },
];

const MARQUEE_ICONS = [
  { icon: 'fa-brands fa-html5', title: 'HTML5' },
  { icon: 'fa-brands fa-css3-alt', title: 'CSS3' },
  { icon: 'fa-brands fa-js', title: 'JavaScript' },
  { icon: 'fa-brands fa-react', title: 'React' },
  { icon: 'fa-brands fa-python', title: 'Python' },
  { icon: 'fa-brands fa-node', title: 'Node.js' },
  { icon: 'fa-brands fa-git-alt', title: 'Git' },
  { icon: 'fa-brands fa-docker', title: 'Docker' },
  { icon: 'fa-brands fa-aws', title: 'AWS' },
  { icon: 'fa-brands fa-figma', title: 'Figma' },
  { icon: 'fa-brands fa-java', title: 'Java' },
  { icon: 'fa-brands fa-linux', title: 'Linux' },
];

export default function Skills() {
  return (
    <section className="skills" id="skills">
      <div className="container">
        <div className="section-title-wrapper">
          <span className="section-subtitle">My Arsenal</span>
          <h2 className="heading-lg">Technical Expertise</h2>
        </div>

        <div className="skills-card-grid">
          {SKILL_CARDS.map((card, i) => (
            <SpotlightCard
              key={i}
              className="skill-mini-card"
              spotlightColor="rgba(99, 102, 241, 0.2)"
              borderColor="rgba(139, 92, 246, 0.5)"
              tiltAmount={6}
            >
              <div className="mini-icon">
                <i className={card.icon}></i>
              </div>
              <div className="mini-info">
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
              </div>
            </SpotlightCard>
          ))}
        </div>

        {/* Tech Stack Marquee */}
        <div className="tech-stack-marquee">
          <div className="marquee-track">
            {/* First Set */}
            {MARQUEE_ICONS.map((item, index) => (
              <div key={`m1-${index}`} className="marquee-item" title={item.title}>
                <i className={item.icon}></i>
              </div>
            ))}
            {/* Second Set for continuous loop */}
            {MARQUEE_ICONS.map((item, index) => (
              <div key={`m2-${index}`} className="marquee-item" title={item.title}>
                <i className={item.icon}></i>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
