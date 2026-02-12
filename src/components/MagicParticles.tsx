import React, { useEffect, useState } from 'react';

interface Particle {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  color: 'gold' | 'green' | 'light';
}

const ensureKeyframes = () => {
  if (typeof window === 'undefined') return;
  if ((window as any).__magicParticlesKeyframesInjected) return;
  const style = document.createElement('style');
  style.textContent = `
    @keyframes mpFloatUp {
      0% { transform: translateY(0); opacity: 0; }
      10% { opacity: 0.9; }
      50% { opacity: 1; }
      100% { transform: translateY(-120vh); opacity: 0; }
    }
  `;
  document.head.appendChild(style);
  (window as any).__magicParticlesKeyframesInjected = true;
};

const MagicParticles: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    ensureKeyframes();
    const newParticles: Particle[] = [];
    for (let i = 0; i < 50; i++) {
      newParticles.push({
        id: i,
        left: Math.random() * 100,
        size: Math.random() * 6 + 2,
        duration: Math.random() * 15 + 8,
        delay: Math.random() * 6,
        color: ['gold', 'green', 'light'][Math.floor(Math.random() * 3)] as 'gold' | 'green' | 'light',
      });
    }
    setParticles(newParticles);
  }, []);

  const getColor = (color: 'gold' | 'green' | 'light') => {
    switch (color) {
      case 'gold': return 'hsl(45, 75%, 55%)';
      case 'green': return 'hsl(80, 60%, 50%)';
      default: return 'hsl(60, 70%, 80%)';
    }
  };

  return (
    // colocamos z muy alto para evitar overlays que los tapen
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[60]">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.left}%`,
            bottom: '-20px',
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: getColor(p.color),
            boxShadow: `0 0 ${p.size * 2}px ${getColor(p.color)}`,
            // usamos la keyframe inyectada
            animation: `mpFloatUp ${p.duration}s linear ${p.delay}s infinite`,
            willChange: 'transform, opacity',
            // si por alguna razón la animación no existe, lo hacemos visible
            opacity: 1,
          }}
        />
      ))}
    </div>
  );
};

export default MagicParticles;
