import React, { useState, useEffect, useRef } from 'react';

const NAV_ITEMS = [
  { href: '#home', label: 'Home', icon: 'fa-house' },
  { href: '#about', label: 'About', icon: 'fa-user' },
  { href: '#skills', label: 'Skills', icon: 'fa-gear' },
  { href: '#experience', label: 'Experience', icon: 'fa-briefcase' },
  { href: '#project', label: 'Projects', icon: 'fa-code' },
  { href: '#contact', label: 'Contact', icon: 'fa-envelope' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [pillStyle, setPillStyle] = useState({});
  const navListRef = useRef(null);

  // Update sliding pill position
  useEffect(() => {
    if (!navListRef.current) return;
    const activeEl = navListRef.current.querySelector('li.active a');
    if (!activeEl) return;
    const li = activeEl.parentElement;
    const listRect = navListRef.current.getBoundingClientRect();
    const liRect = li.getBoundingClientRect();
    setPillStyle({
      left: liRect.left - listRect.left,
      width: liRect.width,
    });
  }, [activeSection]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
      const sections = document.querySelectorAll('section[id]');
      let current = 'home';
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 150;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + section.offsetHeight) {
          current = section.getAttribute('id');
        }
      });
      setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
  }, [isMobileMenuOpen]);

  const handleLinkClick = (href) => {
    setIsMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className={`header-wrapper ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="header-content">

          {/* Logo — always top-left */}
          <a
            href="#home"
            className="nav-logo"
            onClick={(e) => { e.preventDefault(); handleLinkClick('#home'); }}
          >
            <span className="text-gradient">Araf</span>
            <span className="nav-logo-dot">.</span>
          </a>

          {/* Desktop Nav — absolutely centered in header */}
          <nav className="desktop-nav" aria-label="Primary Navigation">
            <ul className="desktop-nav-list" ref={navListRef}>
              {pillStyle.width && (
                <div
                  className="nav-active-pill"
                  style={{ left: pillStyle.left, width: pillStyle.width }}
                />
              )}
              {NAV_ITEMS.map((item) => (
                <li
                  key={item.href}
                  className={activeSection === item.href.replace('#', '') ? 'active' : ''}
                >
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(item.href);
                    }}
                  >
                    <i className={`fa-solid ${item.icon}`} />
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Hamburger — right side */}
          <button
            className={`mobile-menu-toggle ${isMobileMenuOpen ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            aria-expanded={isMobileMenuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {/* Mobile Fullscreen Drawer */}
      <div className={`mobile-drawer ${isMobileMenuOpen ? 'open' : ''}`}>
        <ul className="mobile-drawer-links">
          {NAV_ITEMS.map((item) => (
            <li
              key={item.href}
              className={activeSection === item.href.replace('#', '') ? 'active' : ''}
            >
              <a
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(item.href);
                }}
              >
                <i className={`fa-solid ${item.icon}`} />
                <span>{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
