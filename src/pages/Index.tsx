import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import MusicPlayer from "@/components/MusicPlayer";
import HeroSection from "@/components/HeroSection";
import ChapterSection from "@/components/ChapterSection";
import StorySection from "@/components/StorySection";
import LocationSection from "@/components/LocationSection";
import ProgramSection from "@/components/ProgramSection";
import DressCodeSection from "@/components/DressCodeSection";
import RSVPSection from "@/components/RSVPSection";
import MagicParticles from "@/components/MagicParticles";
import FloatingFairies from "@/components/FloatingFairies";
import SootSpritesPro from "@/components/SootSpritesPro";
import MagicSparkles from "@/components/MagicSparkles";

import totoroImg from "@/assets/navo.png";
import ponio from "@/assets/ponio.png";
import dragonImg from "@/assets/skyrim-dragon.png";

const Index: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Parallax más cinematográfico
  const yDragon = useTransform(scrollYProgress, [0, 1], ["30vh", "-70vh"]);
  const yPonio = useTransform(scrollYProgress, [0, 1], ["100vh", "-10vh"]);
  const yTotoro = useTransform(scrollYProgress, [0, 1], ["160vh", "30vh"]);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen bg-gradient-forest overflow-x-hidden"
    >
      {/* 🌟 Background Effects */}
      <MagicParticles />
      <FloatingFairies />
      <MagicSparkles />
      <SootSpritesPro />

      {/* 📜 Fondo tipo pergamino */}
      <div
        className="fixed inset-0 z-0"
        style={{
          background: `
            linear-gradient(135deg, 
              hsl(42 55% 94% / 0.95) 0%, 
              hsl(40 50% 90% / 0.98) 50%, 
              hsl(38 40% 82% / 0.95) 100%
            )
          `,
        }}
      />

      {/* Textura ruido */}
      <div
        className="fixed inset-0 z-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* 🐉 Capa decorativa Parallax */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden opacity-20">
        {/* Dragón (oculto en móvil) */}
        <motion.img
          src={dragonImg}
          alt="Dragón decorativo"
          style={{ y: yDragon }}
          className="absolute left-0 w-44 h-auto grayscale sepia"
        />

        {/* Totoro */}
        <motion.img
          src={totoroImg}
          alt="Totoro decorativo"
          style={{ y: yTotoro }}
          className="absolute left-10 w-64 h-auto grayscale sepia"
        />

        <motion.img
          src={ponio}
          alt="Ponio decorativo"
          style={{ y: yPonio }}
          className="absolute right-10 w-64 h-auto grayscale sepia"
        />
      </div>

      {/* 🎵 Música */}
      <MusicPlayer />

      {/* 📖 Contenido principal */}
      <main className="relative z-10">
        <HeroSection />

        <ChapterSection
          chapterNumber="Capítulo I"
          chapterTitle="El Llamado del Destino"
          id="historia"
        >
          <StorySection />
        </ChapterSection>

        <ChapterSection
          chapterNumber="Capítulo II"
          chapterTitle="El Reino que nos Acoge"
          id="lugar"
        >
          <LocationSection />
        </ChapterSection>

        <ChapterSection
          chapterNumber="Capítulo III"
          chapterTitle="El Gran Festín"
          id="programa"
        >
          <ProgramSection />
        </ChapterSection>

        <ChapterSection
          chapterNumber="Capítulo IV"
          chapterTitle="El Atuendo del Reino"
          id="vestimenta"
        >
          <DressCodeSection />
        </ChapterSection>

        <ChapterSection
          chapterNumber="Capítulo V"
          chapterTitle="Confirma tu Asistencia"
          id="rsvp"
        >
          <RSVPSection />
        </ChapterSection>

        {/* 🏰 Footer */}
        <footer className="relative py-16 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="text-gold text-2xl">✦</span>
              <span className="text-forest text-3xl">❧</span>
              <span className="text-gold text-2xl">✦</span>
            </div>

            <p className="font-medieval text-2xl md:text-3xl text-gold-dark mb-4">
              Zully Luna & Roger Parra
            </p>

            <p className="font-body text-lg text-forest italic mb-6">
              11 de Octubre de 2026
            </p>

            <p className="font-uncial text-xl text-moss">
              "Y vivieron felices para siempre..."
            </p>

            <div className="flex items-center justify-center mt-10">
              <div className="h-px w-1/4 bg-gradient-to-r from-transparent to-gold-dark" />
              <span className="px-4 text-gold text-lg">🌿</span>
              <div className="h-px w-1/4 bg-gradient-to-l from-transparent to-gold-dark" />
            </div>
          </motion.div>
        </footer>
      </main>
    </div>
  );
};

export default Index;