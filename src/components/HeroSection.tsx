import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import castleDragon from "@/assets/castle-dragon.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Castle Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
        style={{ backgroundImage: `url(${castleDragon})` }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-parchment/80 via-parchment/60 to-parchment" />

      {/* Content */}
      <div className="relative z-20 text-center px-6 max-w-4xl mx-auto">
        {/* Decorative top element */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mb-8"
        >
          <span className="text-gold text-4xl md:text-5xl">✦</span>
        </motion.div>

        {/* "Ye are invited" text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="font-uncial text-xl md:text-2xl text-forest mb-4 tracking-wider"
        >
          Os invitamos a celebrar
        </motion.p>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="font-medieval text-4xl md:text-6xl lg:text-7xl mb-6 leading-tight"
          style={{
            color: "hsl(40 70% 38%)",
            textShadow: "3px 3px 0 hsl(145 55% 18% / 0.4), 0 0 30px hsl(45 85% 50% / 0.4)"
          }}
        >
          La Unión de
        </motion.h1>

        {/* Names */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.3 }}
          className="mb-8"
        >
          <h2 className="font-medieval text-3xl md:text-5xl lg:text-6xl text-forest-light mb-2"
              style={{ textShadow: "2px 2px 0 hsl(45 85% 50% / 0.3)" }}>
            Lady Alexandra Luna
          </h2>
          <span className="font-uncial text-2xl md:text-3xl text-gold block my-4">&</span>
          <h2 className="font-medieval text-3xl md:text-5xl lg:text-6xl text-forest-light"
              style={{ textShadow: "2px 2px 0 hsl(45 85% 50% / 0.3)" }}>
            Sir Roger Alejandro
          </h2>
        </motion.div>

        {/* Date */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.6 }}
          className="mb-12"
        >
          <div className="inline-block px-8 py-4 border-2 border-gold-dark rounded-sm"
               style={{ 
                 background: "linear-gradient(135deg, hsl(42 55% 94% / 0.9), hsl(40 50% 90% / 0.95))",
                 boxShadow: "0 0 30px hsl(45 85% 50% / 0.2)"
               }}>
            <p className="font-body text-lg md:text-xl text-forest italic mb-1">
              Sábado, 11 de Octubre de 2026
            </p>
            <p className="font-medieval text-2xl md:text-3xl text-gold-dark">
              4:00 de la tarde
            </p>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ 
            opacity: { duration: 1, delay: 2 },
            y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <ChevronDown className="w-10 h-10 text-gold-dark" />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
