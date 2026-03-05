import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Item = {
  src: string;
  type?: "image" | "video";
  originalUrl?: string;
  title?: string;
};

const PinterestCarousel: React.FC<{
  items: Item[];
  ariaLabel?: string;
}> = ({ items, ariaLabel = "Ejemplos de vestimenta" }) => {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [index, setIndex] = useState<number | null>(null);

  const detectType = (item: Item) => {
    if (item.type) return item.type;
    if (item.src.match(/\.(mp4|webm|ogg)$/i)) return "video";
    return "image";
  };

  const scrollByAmount = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.8;
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIndex(null);
      if (e.key === "ArrowLeft") scrollByAmount(-1);
      if (e.key === "ArrowRight") scrollByAmount(1);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!items?.length) return null;

  return (
    <>
      {/* CAROUSEL */}
      <div className="relative">
        {/* Prev */}
        <button
          onClick={() => scrollByAmount(-1)}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-2 bg-parchment/80 rounded-md shadow-md hover:scale-105"
        >
          ‹
        </button>

        <div
          ref={trackRef}
          role="list"
          aria-label={ariaLabel}
          className="w-full overflow-x-auto scroll-smooth snap-x snap-mandatory flex gap-4 py-4 px-8"
        >
          {items.map((item, i) => {
            const mediaType = detectType(item);

            return (
              <div
                key={i}
                role="listitem"
                className="snap-start flex-shrink-0 w-[min(75vw,360px)] cursor-pointer"
                onClick={() => setIndex(i)}
              >
                <div className="relative rounded-sm overflow-hidden border-2 border-gold/40 shadow-lg">
                  {mediaType === "video" ? (
                    <>
                      <video
                        className="w-full h-56 object-cover"
                        muted
                        loop
                        playsInline
                        preload="metadata"
                      >
                        <source src={item.src} type="video/mp4" />
                      </video>

                      {/* Indicador visual */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <div className="bg-white/80 rounded-full p-3 text-black text-lg">
                          ▶
                        </div>
                      </div>
                    </>
                  ) : (
                    <img
                      src={item.src}
                      alt={item.title ?? `Ejemplo ${i + 1}`}
                      loading="lazy"
                      className="w-full h-56 object-cover"
                    />
                  )}
                </div>

                <p className="text-center mt-2 text-sm text-moss">
                  {item.title}
                </p>
              </div>
            );
          })}
        </div>

        {/* Next */}
        <button
          onClick={() => scrollByAmount(1)}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-2 bg-parchment/80 rounded-md shadow-md hover:scale-105"
        >
          ›
        </button>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {index !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6"
            onClick={() => setIndex(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="max-w-[90vw] max-h-[90vh] bg-parchment rounded-md overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {detectType(items[index]) === "video" ? (
                <video
                  controls
                  autoPlay
                  className="max-w-full max-h-[80vh] block"
                >
                  <source src={items[index].src} type="video/mp4" />
                </video>
              ) : (
                <img
                  src={items[index].src}
                  alt={items[index].title ?? `Ejemplo ${index + 1}`}
                  className="max-w-full max-h-[80vh] object-contain bg-black/5"
                />
              )}

              <div className="p-4 flex items-center justify-between gap-4">
                <div>
                  <p className="font-medium text-base text-forest">
                    {items[index].title}
                  </p>

                  {items[index].originalUrl && (
                    <a
                      href={items[index].originalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-amber-800 underline"
                    >
                      Ver en Pinterest
                    </a>
                  )}
                </div>

                <button
                  onClick={() => setIndex(null)}
                  className="px-4 py-2 bg-forest text-parchment rounded-md"
                >
                  Cerrar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PinterestCarousel;