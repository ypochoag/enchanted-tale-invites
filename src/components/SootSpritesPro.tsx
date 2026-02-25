import React, { useEffect, useRef, useState } from "react";

type Soot = {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  leader: boolean;
};

const MAX = 80;

const SootSpritesPro: React.FC = () => {
  const [soots, setSoots] = useState<Soot[]>([]);
  const mouse = useRef({ x: 0, y: 0, lastMove: Date.now() });

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      mouse.current.lastMove = Date.now();
    };

    window.addEventListener("mousemove", handleMouse);

    // 🌑 crear grupo inicial
    const initial = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: 0,
      vy: 0,
      size: Math.random() * 20 + 20,
      leader: i === 0, // 👑 líder
    }));

    setSoots(initial);

    let animationFrame: number;

    const loop = () => {
      setSoots((prev) =>
        prev.map((s, i) => {
          const margin = 40; // evita que se peguen al borde
          const width = window.innerWidth;
          const height = window.innerHeight;

          // 🧲 ligera atracción al centro (evita pérdida total)
          const centerX = width / 2;
          const centerY = height / 2;

          
          let vx = s.vx;
          let vy = s.vy;
          
          const dx = s.x - mouse.current.x;
          const dy = s.y - mouse.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          vx += (centerX - s.x) * 0.0005;
          vy += (centerY - s.y) * 0.0005;
          
          // 🏃 huida
          if (dist < 150) {
            vx += (dx / dist) * 3;
            vy += (dy / dist) * 3;
          }

          // 🧠 seguir líder (enjambre)
          const leader = prev[0];
          if (!s.leader) {
            vx += (leader.x - s.x) * 0.002;
            vy += (leader.y - s.y) * 0.002;
          } else {
            // líder se mueve libre
            vx += (Math.random() - 0.5) * 0.5;
            vy += (Math.random() - 0.5) * 0.5;
          }

          // 🌫️ ruido natural
          vx += (Math.random() - 0.5) * 0.3;
          vy += (Math.random() - 0.5) * 0.3;

          vx *= 0.9;
          vy *= 0.9;

          let newX = s.x + vx;
          let newY = s.y + vy;

          // 🧱 colisiones horizontales
          if (newX < margin) {
            newX = margin;
            vx *= -0.6; // rebote suave
          }
          if (newX > width - margin) {
            newX = width - margin;
            vx *= -0.6;
          }

          // 🧱 colisiones verticales
          if (newY < margin) {
            newY = margin;
            vy *= -0.6;
          }
          if (newY > height - margin) {
            newY = height - margin;
            vy *= -0.6;
          }

          return {
            ...s,
            x: newX,
            y: newY,
            vx,
            vy,
          };
        })
      );

      animationFrame = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      window.removeEventListener("mousemove", handleMouse);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {soots.map((s) => (
        <img
          key={s.id}
          src="/soot.png"
          style={{
            position: "absolute",
            left: s.x,
            top: s.y,
            width: s.size,
            height: s.size,
            transform: "translate(-50%, -50%)",
            filter: "drop-shadow(0 5px 10px rgba(0,0,0,0.5))",
            transition: "transform 0.1s linear",
          }}
        />
      ))}
    </div>
  );
};

export default SootSpritesPro;