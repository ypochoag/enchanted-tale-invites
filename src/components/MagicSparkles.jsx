import React, { useEffect, useRef } from "react";

const MagicSparkles = () => {
  const canvasRef = useRef(null);
  const particles = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = (e) => {
      for (let i = 0; i < 20; i++) {
        particles.current.push({
          x: e.clientX,
          y: e.clientY,
          vx: (Math.random() - 0.5) * 10,
          vy: (Math.random() - 0.5) * 10,
          size: Math.random() * 3 + 1,
          life: 1.0,
          color: Math.random() > 0.5 ? "#FFD700" : "#FFF5B7",
          shadow: Math.random() > 0.5 ? "#FFA500" : "#FFF"
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.current.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.15; // Gravedad
        p.life -= 0.015;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.shadow;
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.life;
        ctx.fill();

        if (p.life <= 0) particles.current.splice(i, 1);
      });
      requestAnimationFrame(animate);
    };

    window.addEventListener("resize", resize);
    window.addEventListener("click", createParticles);
    resize();
    const id = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("click", createParticles);
      cancelAnimationFrame(id);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-20"
      style={{ filter: "contrast(1.2) brightness(1.2)" }}
    />
  );
};

export default MagicSparkles;