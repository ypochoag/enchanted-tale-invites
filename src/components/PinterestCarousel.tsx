import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Item = {
  src: string;
  type?: "image" | "video";
  originalUrl?: string;
  title?: string;
};

const UNIQUE_SCROLL_CLASS = "pinterest-carousel-scroll-v1";

const PinterestCarousel: React.FC<{
  items: Item[];
  ariaLabel?: string;
}> = ({ items, ariaLabel = "Ejemplos de vestimenta" }) => {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [index, setIndex] = useState<number | null>(null);

  // inject scoped CSS once (scrollbar + small tweaks)
  useEffect(() => {
    const id = "pinterest-carousel-styles-v1";
    if (document.getElementById(id)) return;

    const style = document.createElement("style");
    style.id = id;
    style.innerHTML = `
      /* Scoped custom scrollbar for the carousel & modal scrollable area */
      .${UNIQUE_SCROLL_CLASS}::-webkit-scrollbar { height: 10px; width: 10px; }
      .${UNIQUE_SCROLL_CLASS}::-webkit-scrollbar-track { background: transparent; }
      .${UNIQUE_SCROLL_CLASS}::-webkit-scrollbar-thumb {
        background: linear-gradient(180deg, rgba(183,128,15,0.95), rgba(124,86,18,0.95));
        border-radius: 999px;
        border: 2px solid rgba(0,0,0,0.06);
      }
      .${UNIQUE_SCROLL_CLASS} { scrollbar-width: thin; scrollbar-color: rgba(183,128,15,0.9) transparent; }

      /* Modal inner scrollbars */
      .pinterest-modal-scroll::-webkit-scrollbar { width: 8px; }
      .pinterest-modal-scroll::-webkit-scrollbar-thumb {
        background: linear-gradient(180deg, rgba(183,128,15,0.9), rgba(124,86,18,0.9));
        border-radius: 999px;
      }

      /* Ensure play-overlay doesn't block click on small screens */
      .pinterest-play-overlay { pointer-events: none; }
    `;
    document.head.appendChild(style);

    return () => {
      // keep styles for other usage; optional removal:
      // document.head.removeChild(style);
    };
  }, []);

  const detectType = (item: Item) => {
    if (item.type) return item.type;
    if (item.src.match(/\.(mp4|webm|ogg)$/i)) return "video";
    return "image";
  };

  const scrollByAmount = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const amount = Math.max(el.clientWidth * 0.75, 300);
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  // keyboard navigation + Escape to close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIndex(null);
      if (e.key === "ArrowLeft") {
        if (index === null) scrollByAmount(-1);
        else setIndex((prev) => (prev === null ? null : Math.max(0, prev - 1)));
      }
      if (e.key === "ArrowRight") {
        if (index === null) scrollByAmount(1);
        else setIndex((prev) => (prev === null ? null : Math.min(items.length - 1, prev + 1)));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, items.length]);

  if (!items?.length) return null;

  return (
    <>
      {/* CAROUSEL */}
      <div className="relative">
        {/* Prev */}
        <button
          onClick={() => scrollByAmount(-1)}
          aria-label="Anterior"
          className="
            absolute left-3 top-1/2 -translate-y-1/2 z-30
            w-10 h-10 rounded-full flex items-center justify-center
            bg-parchment/95 border border-gold/20
            shadow-md hover:scale-105 focus:outline-none focus:ring-2 focus:ring-amber-400
            transition
          "
        >
          ‹
        </button>

        <div
          ref={trackRef}
          role="list"
          aria-label={ariaLabel}
          className={`
            ${UNIQUE_SCROLL_CLASS}
            w-full overflow-x-auto scroll-smooth snap-x snap-mandatory
            flex gap-6 py-6 px-6 sm:px-10
            touch-auto
          `}
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {items.map((item, i) => {
            const mediaType = detectType(item);

            return (
              <motion.div
                key={i}
                role="listitem"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.25 }}
                className="snap-start flex-shrink-0 w-[min(76vw,420px)] cursor-pointer"
                onClick={() => setIndex(i)}
              >
                <div
                  className="
                    relative rounded-lg overflow-hidden
                    border border-gold/10
                    bg-gradient-to-b from-parchment/90 to-parchment/80
                    shadow-[0_12px_30px_rgba(6,16,10,0.18)]
                  "
                >
                  {mediaType === "video" ? (
                    <>
                      <video
                        className="w-full h-[360px] object-cover bg-black"
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        aria-hidden
                      >
                        <source src={item.src} type="video/mp4" />
                      </video>

                      {/* Play overlay (decorative) */}
                      <div className="absolute inset-0 flex items-center justify-center pinterest-play-overlay">
                        <div className="bg-gradient-to-tr from-amber-100/90 to-gold/80 text-forest rounded-full p-3 shadow-md opacity-95">
                          ▶
                        </div>
                      </div>
                    </>
                  ) : (
                    <img
                      src={item.src}
                      alt={item.title ?? `Ejemplo ${i + 1}`}
                      loading="lazy"
                      className="w-full h-[360px] object-cover"
                    />
                  )}
                </div>

                <p className="text-center mt-3 text-sm text-forest font-medium">
                  {item.title}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Next */}
        <button
          onClick={() => scrollByAmount(1)}
          aria-label="Siguiente"
          className="
            absolute right-3 top-1/2 -translate-y-1/2 z-30
            w-10 h-10 rounded-full flex items-center justify-center
            bg-parchment/95 border border-gold/20
            shadow-md hover:scale-105 focus:outline-none focus:ring-2 focus:ring-amber-400
            transition
          "
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
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setIndex(null)}
          >
            <motion.div
              initial={{ scale: 0.96, y: 18 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: 18 }}
              transition={{ duration: 0.22 }}
              className="
                w-full max-w-4xl max-h-[92vh]
                bg-parchment rounded-xl shadow-2xl
                flex flex-col overflow-hidden
              "
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top: media area (scrollable if content tall) */}
              <div className="flex-1 overflow-auto pinterest-modal-scroll p-4 bg-parchment/95">
                {detectType(items[index]) === "video" ? (
                  <video
                    controls
                    autoPlay
                    className="w-full max-h-[74vh] object-contain mx-auto rounded"
                  >
                    <source src={items[index].src} type="video/mp4" />
                  </video>
                ) : (
                  <img
                    src={items[index].src}
                    alt={items[index].title ?? `Ejemplo ${index + 1}`}
                    className="w-full max-h-[74vh] object-contain mx-auto rounded"
                  />
                )}
              </div>

              {/* Footer (sticky-looking, always visible) */}
              <div className="border-t border-gold/10 p-4 flex items-center justify-between gap-3 bg-parchment/98">
                <div className="min-w-0">
                  <p className="font-semibold text-lg text-forest truncate">
                    {items[index].title}
                  </p>

                  {items[index].originalUrl && (
                    <a
                      href={items[index].originalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-amber-800 underline hover:text-amber-600"
                    >
                      Ver en Pinterest
                    </a>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    aria-label="Anterior"
                    onClick={() => setIndex((i) => (i === null ? null : Math.max(0, i - 1)))}
                    className="w-10 h-10 rounded-md flex items-center justify-center bg-forest text-parchment shadow hover:brightness-105 transition"
                  >
                    ‹
                  </button>

                  <button
                    onClick={() => setIndex((i) => (i === null ? null : Math.min(items.length - 1, i + 1)))}
                    aria-label="Siguiente"
                    className="w-10 h-10 rounded-md flex items-center justify-center bg-forest text-parchment shadow hover:brightness-105 transition"
                  >
                    ›
                  </button>

                  <button
                    onClick={() => setIndex(null)}
                    className="px-4 py-2 rounded-md bg-gold text-forest font-semibold shadow hover:brightness-95 transition"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PinterestCarousel;