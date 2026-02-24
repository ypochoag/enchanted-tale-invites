import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";

const MusicPlayer = () => {
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.loop = true;
    audio.volume = 0.6;
    audio.muted = true;

    // Autoplay permitido porque está muted
    audio.play().catch(() => {
      console.log("Autoplay bloqueado");
    });

    // Activar sonido en el primer click del usuario
    const enableSound = () => {
      audio.muted = false;
      setIsMuted(false);
      window.removeEventListener("click", enableSound);
    };

    window.addEventListener("click", enableSound);

    return () => {
      window.removeEventListener("click", enableSound);
    };
  }, []);

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = !audio.muted;
    setIsMuted(audio.muted);
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/assets/accidentally-in-love.mp3" // "/enchanted-tale-invites/accidentally-in-love.mp3"
        preload="auto"
      />

      <motion.button
        onClick={toggleMute}
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-forest border-2 border-gold shadow-lg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        style={{
          boxShadow: "0 0 20px hsl(45 85% 50% / 0.4)",
        }}
      >
        {isMuted ? (
          <VolumeX className="w-6 h-6 text-gold-light" />
        ) : (
          <Volume2 className="w-6 h-6 text-gold-light" />
        )}
      </motion.button>
    </>
  );
};

export default MusicPlayer;
