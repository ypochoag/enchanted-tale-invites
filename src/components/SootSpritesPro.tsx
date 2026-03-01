import React, { useEffect, useRef, useState } from "react";

const GROUPS = 5;
const SOOTS_PER_GROUP = 8;

const SootSpritesPro = () => {
  const containerRef = useRef(null);
  const sootsRef = useRef([]);
  const mouse = useRef({ x: 0, y: 0 });
  const scatterActive = useRef(false);

  const [initialSoots] = useState(() => 
    Array.from({ length: GROUPS * SOOTS_PER_GROUP }).map((_, i) => ({
      id: i,
      x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
      y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
      vx: 0,
      vy: 0,
      size: Math.random() * 8 + 22,
      groupId: Math.floor(i / SOOTS_PER_GROUP),
      isLeader: i % SOOTS_PER_GROUP === 0,
      pulseDur: `${0.8 + Math.random()}s` 
    }))
  );

  useEffect(() => {
    sootsRef.current = [...initialSoots];

    const handleMouse = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const handleClick = () => {
      scatterActive.current = true;
      setTimeout(() => { scatterActive.current = false; }, 1200);
    };

    window.addEventListener("mousemove", handleMouse);
    window.addEventListener("click", handleClick);

    let animationFrame;

    const loop = () => {
      if (!containerRef.current) return;
      
      const width = window.innerWidth;
      const height = window.innerHeight;
      const margin = 100;
      
      const groupTargets = [
        { x: width / 2, y: height / 2 },
        { x: margin, y: margin },
        { x: width - margin, y: margin },
        { x: margin, y: height - margin },
        { x: width - margin, y: height - margin },
      ];

      const sootElements = containerRef.current.children;

      sootsRef.current.forEach((s, i) => {
        let vx = s.vx;
        let vy = s.vy;

        // --- 1. MIGRACIÓN (EFECTO RESTAURADO) ---
        // Aumentamos ligeramente la probabilidad y añadimos un pequeño impulso inicial
        if (Math.random() < 0.002) { 
          s.groupId = Math.floor(Math.random() * GROUPS);
          // Le damos un pequeño "empujoncito" en la dirección del nuevo grupo
          const newTarget = groupTargets[s.groupId];
          vx += (newTarget.x - s.x) * 0.05;
          vy += (newTarget.y - s.y) * 0.05;
        }

        // --- 2. SEPARACIÓN ---
        sootsRef.current.forEach((other) => {
          if (s.id === other.id) return;
          const dx = s.x - other.x;
          const dy = s.y - other.y;
          const distSq = dx * dx + dy * dy;
          const minDist = (s.size + other.size) * 0.7;
          if (distSq < minDist * minDist && distSq > 0) {
            const dist = Math.sqrt(distSq);
            vx += (dx / dist) * 0.1; 
            vy += (dy / dist) * 0.1;
          }
        });

        // --- 3. MOUSE ---
        const dxM = s.x - mouse.current.x;
        const dyM = s.y - mouse.current.y;
        const distM = Math.sqrt(dxM * dxM + dyM * dyM) || 1;

        if (scatterActive.current || distM < 150) {
          const power = scatterActive.current ? 18 : 4;
          vx += (dxM / distM) * power;
          vy += (dyM / distM) * power;
        }

        // --- 4. RETORNO DINÁMICO ---
        const target = groupTargets[s.groupId];
        const dxT = target.x - s.x;
        const dyT = target.y - s.y;
        const distT = Math.sqrt(dxT * dxT + dyT * dyT);
        
        // Aceleración equilibrada para que se vea el viaje entre grupos
        const accel = distT > 300 ? 0.007 : 0.0025; 
        
        vx += dxT * accel;
        vy += dyT * accel;

        // --- 5. FRICCIÓN (0.91 para mejor inercia) ---
        vx *= 0.91;
        vy *= 0.91;
        
        s.x += vx;
        s.y += vy;
        s.vx = vx;
        s.vy = vy;

        // --- 6. RENDERIZADO SIN BLINK ---
        const el = sootElements[i];
        if (el) {
          const rx = Math.round(s.x);
          const ry = Math.round(s.y);
          el.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
        }
      });

      animationFrame = requestAnimationFrame(loop);
    };

    animationFrame = requestAnimationFrame(loop);
    
    return () => {
      window.removeEventListener("mousemove", handleMouse);
      window.removeEventListener("click", handleClick);
      cancelAnimationFrame(animationFrame);
    };
  }, [initialSoots]);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {initialSoots.map((s) => (
        <div
          key={s.id}
          style={{
            position: "absolute",
            width: s.size,
            height: s.size,
            left: 0,
            top: 0,
            transform: `translate3d(${Math.round(s.x)}px, ${Math.round(s.y)}px, 0)`,
            willChange: "transform",
            backfaceVisibility: "hidden",
            transformStyle: "preserve-3d"
          }}
        >
          <div className="relative w-full h-full -translate-x-1/2 -translate-y-1/2">
            <img
              src="/soot.png"
              alt="soot"
              className="animate-pulse w-full h-full"
              style={{
                filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.4))",
                animationDuration: s.pulseDur,
                pointerEvents: "none",
                opacity: 0.9
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SootSpritesPro;