import React, { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);

  useEffect(() => {
    // Only activate on devices with fine pointer (mouse/trackpad)
    if (window.matchMedia && !window.matchMedia('(pointer: fine)').matches) {
      return;
    }

    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;
    let animationFrameId;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;

      // Ambient background track
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      document.body.style.setProperty('--mouse-x', `${x}%`);
      document.body.style.setProperty('--mouse-y', `${y}%`);
    };

    const render = () => {
      followerX += (mouseX - followerX) * 0.15;
      followerY += (mouseY - followerY) * 0.15;
      follower.style.left = `${followerX}px`;
      follower.style.top = `${followerY}px`;
      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animationFrameId = requestAnimationFrame(render);

    const handleLinkEnter = () => {
      follower.style.transform = 'translate(-50%, -50%) scale(1.8)';
      follower.style.background = 'rgba(99, 102, 241, 0.15)';
      follower.style.borderColor = 'transparent';
    };

    const handleLinkLeave = () => {
      follower.style.transform = 'translate(-50%, -50%) scale(1)';
      follower.style.background = 'transparent';
      follower.style.borderColor = 'var(--primary)';
    };

    const attachHoverListeners = () => {
      const interactives = document.querySelectorAll('a, button, input, textarea, .stat-card, .skill-mini-card, .project-compact-card');
      interactives.forEach(el => {
        el.addEventListener('mouseenter', handleLinkEnter);
        el.addEventListener('mouseleave', handleLinkLeave);
      });
    };

    attachHoverListeners();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="custom-cursor" aria-hidden="true" />
      <div ref={followerRef} className="custom-cursor-follower" aria-hidden="true" />
    </>
  );
}
