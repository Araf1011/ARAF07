import React, { useRef, useState } from 'react';

export default function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(99, 102, 241, 0.18)',
  borderColor = 'rgba(129, 140, 248, 0.45)',
  tiltAmount = 7,
  ...props
}) {
  const cardRef = useRef(null);
  const [coords, setCoords] = useState({ x: 0, y: 0, opacity: 0 });
  const [transform, setTransform] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg)');

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calculate rotation (-tiltAmount to +tiltAmount)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -tiltAmount;
    const rotateY = ((x - centerX) / centerX) * tiltAmount;

    setCoords({ x, y, opacity: 1 });
    setTransform(`perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.015, 1.015, 1.015)`);
  };

  const handleMouseLeave = () => {
    setCoords((prev) => ({ ...prev, opacity: 0 }));
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  };

  return (
    <div
      ref={cardRef}
      className={`spotlight-card-wrapper ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform,
        willChange: 'transform',
      }}
      {...props}
    >
      {/* Dynamic Border Spotlight */}
      <div
        className="spotlight-border-glow"
        style={{
          opacity: coords.opacity,
          background: `radial-gradient(400px circle at ${coords.x}px ${coords.y}px, ${borderColor}, transparent 60%)`,
        }}
        aria-hidden="true"
      />

      {/* Dynamic Surface Spotlight */}
      <div
        className="spotlight-surface-glow"
        style={{
          opacity: coords.opacity,
          background: `radial-gradient(500px circle at ${coords.x}px ${coords.y}px, ${spotlightColor}, transparent 65%)`,
        }}
        aria-hidden="true"
      />

      {/* Card Content */}
      <div className="spotlight-card-inner">
        {children}
      </div>
    </div>
  );
}
