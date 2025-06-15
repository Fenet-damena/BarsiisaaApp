
import React, { useEffect } from 'react';

const colors = ['#FFC700', '#FF0000', '#2E3192', '#44A048', '#93278F', '#F06521', '#40E0D0', '#FF69B4'];

const Particle = ({ angle, distance }: { angle: number; distance: number }) => {
  const x = distance * Math.cos(angle);
  const y = distance * Math.sin(angle);

  const style = {
    backgroundColor: colors[Math.floor(Math.random() * colors.length)],
    '--x-end': `${x}px`,
    '--y-end': `${y}px`,
  } as React.CSSProperties;

  return <div className="particle" style={style} />;
};


const Firework = ({ delay }: { delay: number }) => {
  const particleCount = 50;
  const particles = [];
  for (let i = 0; i < particleCount; i++) {
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 100 + 50; // 50 to 150px
    particles.push(<Particle key={i} angle={angle} distance={distance} />);
  }
  
  const style = {
    left: `${Math.random() * 80 + 10}%`,
    top: `${Math.random() * 40 + 20}%`,
    animationDelay: `${delay}s`,
  };

  return (
    <div className="firework" style={style}>
      {particles}
    </div>
  );
};


const Fireworks = ({ onComplete }: { onComplete: () => void }) => {
  const fireworksCount = 7;
  
  useEffect(() => {
    const totalDuration = (fireworksCount - 1) * 200 + 2000; // last delay + animation time
    const timer = setTimeout(onComplete, totalDuration);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fireworks-container">
      {Array.from({ length: fireworksCount }).map((_, i) => (
        <Firework key={i} delay={i * 0.2} />
      ))}
    </div>
  );
};

export default Fireworks;
