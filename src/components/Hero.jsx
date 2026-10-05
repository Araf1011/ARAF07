import React, { useState, useEffect } from 'react';

const WORDS = [
  'Frontend Developer',
  'ML & AI Enthusiast',
  'UI/UX Designer',
  'Lifelong Learner',
];

const BARCODE = [3,1,4,1,3,2,1,3,2,1,2,3,1,2,3,1,4,1,3,2,1,2,3,1,2,4,1,3,1,2,3,1,4,2,1,3,2,1,3,1,2,4,1,2,3];
const QR      = [1,0,1,1,0,1,0,1,0,1,1,0,1,0,1,1,1,0,1,0,0,1,1,0,1,1,0,1,1,0,0,1,0,1,1,0,1,0,1,1,0,1,1,0,0,1,1,0,1,0,1,1,1,0,1,0,0,1,1,0,1,0,1,1];

export default function Hero() {
  const [wordIdx, setWordIdx]     = useState(0);
  const [charIdx, setCharIdx]     = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  /* Typewriter */
  useEffect(() => {
    const word = WORDS[wordIdx];
    let t;
    if (!isDeleting && charIdx < word.length)
      t = setTimeout(() => setCharIdx(p => p + 1), 90);
    else if (!isDeleting && charIdx === word.length)
      t = setTimeout(() => setIsDeleting(true), 2000);
    else if (isDeleting && charIdx > 0)
      t = setTimeout(() => setCharIdx(p => p - 1), 45);
    else {
      setIsDeleting(false);
      setWordIdx(p => (p + 1) % WORDS.length);
    }
    return () => clearTimeout(t);
  }, [charIdx, isDeleting, wordIdx]);

  /* Auto-flip every 6 s */
  useEffect(() => {
    const iv = setInterval(() => setIsFlipped(p => !p), 6000);
    return () => clearInterval(iv);
  }, []);

  const handleDownloadCV = () => {
    const a = document.createElement('a');
    a.href = '/file/resume.pdf';
    a.download = 'resume_araf.pdf';
    a.click();
  };

  return (
    <section className="hero" id="home">
      <div className="container">
        <div className="hero-container">

          {/* ── Left: text ── */}
          <div className="hero-info">
            <div className="status-badge">
              <span className="status-dot"></span>
              Available for new opportunities
            </div>

            <h1 className="heading-xl">
              Hi, I'm <span className="text-gradient">Araf</span>
            </h1>

            <div className="typing-container">
              <span>{WORDS[wordIdx].substring(0, charIdx)}</span>
              <span className="typing-cursor">|</span>
            </div>

            <div className="hero-desc">
              <p className="hero-bio">
                I build websites using&nbsp;
                <span className="itech itech--react">
                  <i className="fa-brands fa-react"></i>
                  <span>React</span>
                </span>
                &nbsp;&amp;&nbsp;
                <span className="itech itech--nextjs">
                  <svg viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Next.js">
                    <circle cx="90" cy="90" r="90" fill="currentColor"/>
                    <path d="M149.508 157.52L69.142 54H54V125.97H66.139V70.896L139.936 164.84C143.231 162.493 146.423 159.985 149.508 157.52Z" fill="white"/>
                    <rect x="115" y="54" width="12" height="72" fill="url(#ng1)"/>
                    <defs>
                      <linearGradient id="ng1" x1="121" y1="54" x2="121" y2="126" gradientUnits="userSpaceOnUse">
                        <stop stopColor="white"/><stop offset="1" stopColor="white" stopOpacity="0"/>
                      </linearGradient>
                    </defs>
                  </svg>
                  <span>Next.js</span>
                </span>
                , add stunning 3D with&nbsp;
                <span className="itech itech--threejs">
                  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Three.js">
                    <polygon points="50,6 94,80 6,80" stroke="currentColor" strokeWidth="6" fill="none"/>
                    <polygon points="50,26 76,68 24,68" stroke="currentColor" strokeWidth="3.5" fill="none" opacity="0.55"/>
                    <line x1="50" y1="6"  x2="50" y2="26" stroke="currentColor" strokeWidth="3.5" opacity="0.45"/>
                    <line x1="94" y1="80" x2="76" y2="68" stroke="currentColor" strokeWidth="3.5" opacity="0.45"/>
                    <line x1="6"  y1="80" x2="24" y2="68" stroke="currentColor" strokeWidth="3.5" opacity="0.45"/>
                  </svg>
                  <span>Three.js</span>
                </span>
                , and power everything with&nbsp;
                <span className="itech itech--js">
                  <i className="fa-brands fa-js"></i>
                  <span>JavaScript</span>
                </span>
                &nbsp;— crafting interfaces that feel alive.
              </p>
            </div>
            <div className="hero-meta">
              <p><i className="fa-solid fa-location-dot"></i> Chittagong, Bangladesh</p>
              <p><i className="fa-solid fa-briefcase"></i> Open to Opportunities</p>
            </div>

            <div className="hero-actions">
              <a href="#contact" className="btn-primary">
                Hire Me <i className="fa-solid fa-arrow-right"></i>
              </a>
              <button className="btn-secondary" onClick={handleDownloadCV}>
                <i className="fa-solid fa-download"></i> Download CV
              </button>
            </div>
          </div>

          {/* ── Right: Lanyard ID Card ── */}
          <div className="lanyard-root">

            {/* Ambient glow blobs */}
            <div className="lanyard-glow lanyard-glow--a"></div>
            <div className="lanyard-glow lanyard-glow--b"></div>

            {/* The whole hanging assembly swings as one unit */}
            <div className="lanyard-assembly">

              {/* SVG lanyard cord */}
              <svg
                className="lanyard-cord"
                viewBox="0 0 120 90"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                {/* left side of the Y-cord */}
                <path d="M 60 90 Q 30 60 18 0"  fill="none" stroke="url(#lanyardGrad)" strokeWidth="3.5" strokeLinecap="round"/>
                {/* right side */}
                <path d="M 60 90 Q 90 60 102 0" fill="none" stroke="url(#lanyardGrad)" strokeWidth="3.5" strokeLinecap="round"/>
                <defs>
                  <linearGradient id="lanyardGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%"   stopColor="#6366f1" stopOpacity="0.9"/>
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.6"/>
                  </linearGradient>
                </defs>
              </svg>

              {/* Metal bail / clip at top of card */}
              <div className="lanyard-bail">
                <div className="bail-outer">
                  <div className="bail-inner"></div>
                </div>
                <div className="bail-stem"></div>
              </div>

              {/* Card flipper */}
              <div
                className={`badge-scene ${isFlipped ? 'is-flipped' : ''}`}
                onClick={() => setIsFlipped(p => !p)}
                title="Click to flip"
              >

                {/* ══ FRONT FACE ══ */}
                <div className="badge badge--front">

                  {/* Holographic shimmer overlay */}
                  <div className="badge__holo"></div>

                  {/* Top colour band */}
                  <div className="badge__topband">
                    <div className="topband__left">
                      <i className="fa-solid fa-code"></i>
                      <div>
                        <p className="topband__org">DEVELOPER PORTFOLIO</p>
                        <p className="topband__dept">Dept. of CSE</p>
                      </div>
                    </div>
                    <div className="topband__year">
                      <span>2026</span>
                      <span className="topband__dot"></span>
                    </div>
                  </div>

                  {/* Photo section */}
                  <div className="badge__photo-section">
                    <div className="badge__photo-frame">
                      <img src="/images/img2.jpg" alt="Araf" />
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="badge__divider">
                    <div className="divider-line"></div>
                    <i className="fa-solid fa-star-of-life divider-icon"></i>
                    <div className="divider-line"></div>
                  </div>

                  {/* Name + role */}
                  <div className="badge__name-block">
                    <h2 className="badge__name">MD Al Araf Hossain</h2>
                    <p className="badge__role">Frontend Dev · ML Enthusiast</p>
                  </div>

                  {/* Info grid */}
                  <div className="badge__info-grid">
                    <div className="badge__info-item">
                      <i className="fa-solid fa-envelope"></i>
                      <span>myselfaraf1457@gmail.com</span>
                    </div>
                    <div className="badge__info-item">
                      <i className="fa-solid fa-phone"></i>
                      <span>+880 1887789984</span>
                    </div>
                    <div className="badge__info-item">
                      <i className="fa-solid fa-location-dot"></i>
                      <span>Chittagong, Bangladesh</span>
                    </div>
                  </div>

                  {/* Barcode footer + hint together */}
                  <div className="badge__footer">
                    <div className="badge__barcode">
                      {BARCODE.map((w, i) => (
                        <div key={i} className="bc-bar" style={{ width: `${w}px` }} />
                      ))}
                    </div>
                    <p className="badge__barcode-num">ARAF · 2026 · CTG · 0042</p>
                    <p className="badge__hint"><i className="fa-solid fa-rotate"></i> Tap to flip</p>
                  </div>
                </div>

                {/* ══ BACK FACE ══ */}
                <div className="badge badge--back">

                  <div className="badge__holo badge__holo--back"></div>

                  {/* Magnetic stripe */}
                  <div className="badge__mag-stripe"></div>

                  {/* Signature strip */}
                  <div className="badge__sig-strip">
                    <p className="sig-label">AUTHORISED SIGNATURE</p>
                    <div className="sig-line">
                      <svg viewBox="0 0 160 30" fill="none">
                        <path d="M10 20 Q35 5 55 18 Q75 30 95 12 Q115 0 150 15"
                          stroke="#6366f1" strokeWidth="2" strokeLinecap="round" fill="none"/>
                      </svg>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="back-section">
                    <p className="back-label"><i className="fa-solid fa-layer-group"></i> SKILLS</p>
                    <div className="back-skill-tags">
                      {['React','Python','JavaScript','ML / AI','UI/UX','CSS3','Java','Git','Node.js'].map(s => (
                        <span key={s} className="skill-chip">{s}</span>
                      ))}
                    </div>
                  </div>

                  {/* Links */}
                  <div className="back-section">
                    <p className="back-label"><i className="fa-solid fa-link"></i> FIND ME</p>
                    <div className="back-links">
                      <a className="back-link-row" href="https://github.com/ARAF07" target="_blank" rel="noreferrer">
                        <i className="fa-brands fa-github"></i><span>github.com/ARAF07</span>
                      </a>
                      <a className="back-link-row" href="https://www.linkedin.com/in/mohammad-hossain-b11350278/" target="_blank" rel="noreferrer">
                        <i className="fa-brands fa-linkedin"></i><span>linkedin.com/in/mohammad-hossain-b11350278</span>
                      </a>
                      <a className="back-link-row" href="https://araf07.me" target="_blank" rel="noreferrer">
                        <i className="fa-solid fa-globe"></i><span>araf07.me</span>
                      </a>
                    </div>
                  </div>

                  {/* Bottom: QR + status + hint all in one footer */}
                  <div className="back-footer">
                    <div className="back-bottom">
                      <div className="back-status">
                        <span className="back-status-dot"></span>
                        <span>Open to work</span>
                      </div>
                      <div className="back-qr">
                        <div className="qr-wrap">
                          {QR.map((on, i) => (
                            <div key={i} className={`qr-px ${on ? 'on' : ''}`} />
                          ))}
                        </div>
                        <p>Portfolio</p>
                      </div>
                    </div>
                    <p className="badge__hint"><i className="fa-solid fa-rotate"></i> Tap to flip back</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
