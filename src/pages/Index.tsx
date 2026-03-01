import React from 'react';
import { motion } from "framer-motion";
import borderFrame from "@/assets/border-frame.png";
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

const Index: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-gradient-forest overflow-x-hidden">
        {/* Magical background effects */}
        <MagicParticles />
        <FloatingFairies />
        <MagicSparkles />
        <SootSpritesPro />

      <div className="relative min-h-screen overflow-x-hidden">

        {/* Background texture with parchment effect */}
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

        {/* Noise texture overlay */}
        <div 
          className="fixed inset-0 z-0 opacity-30 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Border frame overlay */}
        <div 
          className="fixed inset-0 z-5 pointer-events-none bg-contain bg-center bg-no-repeat opacity-15"
          style={{ backgroundImage: `url(${borderFrame})` }}
        />

        {/* Music player */}
        <MusicPlayer />

        {/* Main content */}
        <main className="relative z-10">
          {/* Hero Section */}
          <HeroSection />

          {/* Chapter I: The Call of Destiny */}
          <ChapterSection
            chapterNumber="Capítulo I"
            chapterTitle="El Llamado del Destino"
            id="historia"
          >
            <StorySection />
          </ChapterSection>

          {/* Chapter II: The Meeting of Souls (Location) */}
          <ChapterSection
            chapterNumber="Capítulo II"
            chapterTitle="El Reino que nos Acoge"
            id="lugar"
          >
            <LocationSection />
          </ChapterSection>

          {/* Chapter III: The Great Feast (Program) */}
          <ChapterSection
            chapterNumber="Capítulo III"
            chapterTitle="El Gran Festín"
            id="programa"
          >
            <ProgramSection />
          </ChapterSection>

          {/* Chapter IV: The Kingdom's Attire (Dress Code) */}
          <ChapterSection
            chapterNumber="Capítulo IV"
            chapterTitle="El Atuendo del Reino"
            id="vestimenta"
          >
            <DressCodeSection />
          </ChapterSection>

          {/* Chapter V: RSVP */}
          <ChapterSection
            chapterNumber="Capítulo V"
            chapterTitle="Confirma tu Asistencia"
            id="rsvp"
          >
            <RSVPSection />
          </ChapterSection>

          {/* Footer */}
          <footer className="relative py-16 text-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              {/* Decorative element */}
              <div className="flex items-center justify-center gap-4 mb-6">
                <span className="text-gold text-2xl">✦</span>
                <span className="text-forest text-3xl">❧</span>
                <span className="text-gold text-2xl">✦</span>
              </div>

              <p className="font-medieval text-2xl md:text-3xl text-gold-dark mb-4">
                Alexandra Luna & Roger Alejandro
              </p>
              
              <p className="font-body text-lg text-forest italic mb-6">
                11 de Octubre de 2026
              </p>

              <p className="font-uncial text-xl text-moss">
                "Y vivieron felices para siempre..."
              </p>

              {/* Bottom vine decoration */}
              <div className="flex items-center justify-center mt-10">
                <div className="h-px w-1/4 bg-gradient-to-r from-transparent to-gold-dark" />
                <span className="px-4 text-gold text-lg">🌿</span>
                <div className="h-px w-1/4 bg-gradient-to-l from-transparent to-gold-dark" />
              </div>
            </motion.div>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default Index;
