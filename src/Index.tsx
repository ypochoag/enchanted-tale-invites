import { useRef } from "react";
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

import totoroImg from "@/assets/totoro-silhouette.png"; 
import dragonImg from "@/assets/skyrim-dragon.png";   
import sootSpriteImg from "@/assets/soot.png";

const Index = () => {
   const { scrollYProgress } = useScroll();
  
    const yTotoro = useTransform(scrollYProgress, [0, 1], ["10vh", "-50vh"]);
    const yDragon = useTransform(scrollYProgress, [0, 1], ["100vh", "20vh"]);

  return (
    <div className="relative min-h-screen bg-gradient-forest overflow-x-hidden select-none">
      {/* 1. Capas de Efectos Fijos */}
      <MagicParticles />
      <FloatingFairies />

      {/* 2. El Pergamino de Fondo (Fijo) */}
      <div className="fixed inset-0 z-0 bg-[#f4f1ea] parchment-texture" />

      {/* 3. CAPA DE PERSONAJES (Parallax Decorativo) */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden opacity-20">
        
        {/* Totoro escondido en la historia (Capítulo I) */}
        <motion.img 
          style={{ y: yTotoro }}
          src={totoroImg} 
          className="absolute left-10 w-64 h-auto grayscale sepia"
        />

        {/* Un Dragón de Skyrim sobrevolando el Capítulo III/IV */}
        <motion.img 
          style={{ y: yDragon, x: "70vw" }}
          src={dragonImg} 
          className="absolute top-0 w-[40rem] h-auto opacity-40 rotate-12"
        />
      </div>

      {/* 4. Texturas y Marcos Pro-Level */}
      <div className="fixed inset-0 z-5 pointer-events-none overflow-hidden">
        
        {/* Capa de Papel Granulado (Mucho más sutil y elegante) */}
        <div 
          className="absolute inset-0 opacity-[0.15] mix-blend-multiply"
          style={{ 
            backgroundImage: `url("https://www.transparenttextures.com/patterns/stardust.png")`,
          }}
        />

        {/* Viñeta de Enfoque: Oscurece sutilmente los bordes para dar profundidad */}
        <div 
          className="absolute inset-0"
          style={{ 
            background: 'radial-gradient(circle, transparent 50%, rgba(0,0,0,0.15) 100%)' 
          }}
        />
      </div>

      <MusicPlayer />

      {/* 5. CONTENIDO PRINCIPAL */}
      <main className="relative z-10">
        <HeroSection />

        <ChapterSection chapterNumber="Capítulo I" chapterTitle="El Llamado del Destino" id="historia">
          <StorySection />
        </ChapterSection>

        <ChapterSection chapterNumber="Capítulo II" chapterTitle="El Reino que nos Acoge" id="lugar">
          <LocationSection />
        </ChapterSection>

        <ChapterSection chapterNumber="Capítulo III" chapterTitle="El Gran Festín" id="programa">
          <ProgramSection />
        </ChapterSection>

        <ChapterSection chapterNumber="Capítulo IV" chapterTitle="El Atuendo del Reino" id="vestimenta">
          <DressCodeSection />
        </ChapterSection>

        <ChapterSection chapterNumber="Capítulo V" chapterTitle="Confirma tu Asistencia" id="rsvp">
          <RSVPSection />
        </ChapterSection>

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
                Zully Luna & Roger Parra
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
  );
};

export default Index;