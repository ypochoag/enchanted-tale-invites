import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";

const MusicPlayer = () => {
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // YouTube video ID for "Accidentally in Love" - Counting Crows
  const videoId = "QUypt2nvorM";

  useEffect(() => {
    // Attempt to autoplay (will be muted due to browser policies)
    setIsPlaying(true);
  }, []);

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (iframeRef.current) {
      const src = iframeRef.current.src;
      if (isMuted) {
        iframeRef.current.src = src.replace("mute=1", "mute=0");
      } else {
        iframeRef.current.src = src.replace("mute=0", "mute=1");
      }
    }
  };

  return (
    <>
      {/* Hidden YouTube iframe for audio */}
      <iframe
        ref={iframeRef}
        className="absolute w-0 h-0 opacity-0 pointer-events-none"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}&mute=${isMuted ? 1 : 0}&controls=0&showinfo=0&modestbranding=1`}
        allow="autoplay"
        title="Background Music"
      />

      {/* Music Control Button */}
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
