import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Fairy {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  color: "green" | "gold";
}

const FairyParticles = () => {
  const [fairies, setFairies] = useState<Fairy[]>([]);

  useEffect(() => {
    const generateFairies = () => {
      const newFairies: Fairy[] = [];
      for (let i = 0; i < 20; i++) {
        newFairies.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 8 + 4,
          duration: Math.random() * 6 + 6,
          delay: Math.random() * 4,
          color: Math.random() > 0.5 ? "green" : "gold",
        });
      }
      setFairies(newFairies);
    };

    generateFairies();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {fairies.map((fairy) => (
        <motion.div
          key={fairy.id}
          className={`absolute rounded-full ${
            fairy.color === "green"
              ? "bg-fairy shadow-[0_0_15px_hsl(85_60%_55%),0_0_30px_hsl(85_60%_55%_/_0.5)]"
              : "bg-gold-light shadow-[0_0_15px_hsl(48_90%_62%),0_0_30px_hsl(48_90%_62%_/_0.5)]"
          }`}
          style={{
            left: `${fairy.x}%`,
            top: `${fairy.y}%`,
            width: fairy.size,
            height: fairy.size,
          }}
          animate={{
            x: [0, 30, -20, 40, -30, 0],
            y: [0, -40, -20, -60, -30, 0],
            opacity: [0.3, 0.8, 0.5, 1, 0.6, 0.3],
            scale: [0.8, 1.2, 0.9, 1.3, 1, 0.8],
          }}
          transition={{
            duration: fairy.duration,
            delay: fairy.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default FairyParticles;
