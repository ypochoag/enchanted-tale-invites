import React, { useEffect, useState } from 'react';

interface Fairy {
  id: number;
  top: number;
  left: number;
  size: number;
  delay: number;
}

const ensureFairyKeyframes = () => {
  if (typeof window === 'undefined') return;
  if ((window as any).__floatingFairiesKeyframesInjected) return;
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fairyDance {
      0% { transform: translateY(0) translateX(0) rotate(0deg); opacity: 0.6; }
      25% { transform: translateY(-6px) translateX(3px) rotate(2deg); opacity: 1; }
      50% { transform: translateY(0) translateX(-3px) rotate(-2deg); opacity: 0.9; }
      75% { transform: translateY(4px) translateX(2px) rotate(1deg); opacity: 0.95; }
      100% { transform: translateY(0) translateX(0) rotate(0deg); opacity: 0.6; }
    }
    @keyframes fairyGlow {
      0% { transform: scale(0.8); opacity: 0.2; }
      50% { transform: scale(1.05); opacity: 0.8; }
      100% { transform: scale(0.9); opacity: 0.2; }
    }
  `;
  document.head.appendChild(style);
  (window as any).__floatingFairiesKeyframesInjected = true;
};

const FloatingFairies: React.FC = () => {
  const [fairies, setFairies] = useState<Fairy[]>([]);

  useEffect(() => {
    ensureFairyKeyframes();
    const newFairies: Fairy[] = [];
    for (let i = 0; i < 8; i++) {
      newFairies.push({
        id: i,
        top: Math.random() * 80 + 10,
        left: Math.random() * 90 + 5,
        size: Math.random() * 20 + 15,
        delay: Math.random() * 5,
      });
    }
    setFairies(newFairies);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[70]">
      {fairies.map((f) => (
        <div
          key={f.id}
          className="absolute"
          style={{
            top: `${f.top}%`,
            left: `${f.left}%`,
            width: `${f.size}px`,
            height: `${f.size}px`,
            transform: 'translate(-50%, -50%)',
            animation: `fairyDance ${6 + Math.random() * 6}s ease-in-out ${f.delay}s infinite`,
            willChange: 'transform, opacity',
            pointerEvents: 'none',
          }}
        >
          {/* Glow */}
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              width: `${f.size * 2}px`,
              height: `${f.size * 2}px`,
              borderRadius: '50%',
              background: 'radial-gradient(circle, hsla(80, 60%, 60%, 0.45) 0%, transparent 70%)',
              animation: `fairyGlow ${4 + Math.random() * 3}s ease-in-out ${f.delay}s infinite`,
            }}
          />
          {/* SVG sparkle */}
          <div style={{ width: `${f.size}px`, height: `${f.size}px`, position: 'relative' }}>
            <svg viewBox="0 0 24 24" fill="none" style={{ width: '100%', height: '100%', filter: 'drop-shadow(0 0 6px hsl(80 60% 60%))' }}>
              <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" fill="hsl(60 80% 75%)"/>
              <circle cx="12" cy="10" r="2" fill="hsl(45 75% 65%)"/>
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FloatingFairies;
