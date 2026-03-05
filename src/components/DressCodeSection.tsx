import { motion } from "framer-motion";
import dressCodeExamples from "@/assets/dress-code-examples.png";
import PinterestCarousel, { Item } from "@/components/PinterestCarousel";

const pinterestItems: Item[] = [
  {
    type: "video",
    src: "/assets/video1.mp4",
    originalUrl: "https://pin.it/HDjAIz0QB",
    title: "Estilo medieval"
  },
  {
    type: "image",
    src: "/assets/imagen1.jpg",
    originalUrl: "https://pin.it/7k6wg6wbq",
    title: "Traje élfico mujer"
  },
  {
    type: "video",
    src: "/assets/video2.mp4",
    originalUrl: "https://pin.it/5v9YggGOd",
    title: "Hada del bosque"
  },
  {
    type: "image",
    src: "/assets/imagen2.jpg",
    originalUrl: "https://pin.it/4XIuYgMYs",
    title: "Hadas encantadas"
  },
  {
    type: "image",
    src: "/assets/imagen3.png",
    originalUrl: "https://pin.it/7gRMAS9RD",
    title: "Vestido élfico"
  },
  {
    type: "image",
    src: "/assets/imagen4.jpg",
    originalUrl: "https://pin.it/5NoZ2rQwP",
    title: "Coronel de guerra"
  },
  {
    type: "image",
    src: "/assets/imagen5.jpg",
    originalUrl: "https://pin.it/7aZmJlqBi",
    title: "Caballero medieval"
  },
  {
    type: "image",
    src: "/assets/imagen6.jpg",
    originalUrl: "https://pin.it/64jqGzg9p",
    title: "Caballero Oscuro"
  },
  {
    type: "image",
    src: "/assets/imagen7.jpg",
    originalUrl: "https://pin.it/HZRnpeZFW",
    title: "Elfo del bosque"
  }
];

const dressCodeItems = [
  {
    title: "Damas Nobles",
    description: "Vestidos largos medievales, túnicas élficas con capas fluidas, vestidos de princesa con corsé, atuendos de hada del bosque con alas delicadas.",
    icon: "👸"
  },
  {
    title: "Caballeros y Señores",
    description: "Armaduras ligeras con capas, túnicas de caballero con jubón, atuendos de noble medieval, trajes de mago o druida con capucha.",
    icon: "⚔️"
  },
  {
    title: "Criaturas del Bosque",
    description: "Hadas, elfos, druidas, magos, criaturas míticas del bosque encantado. ¡Dejad volar vuestra imaginación!",
    icon: "🧚"
  }
];

const DressCodeSection = () => {
  return (
    <div className="font-body text-lg text-forest leading-relaxed">
      {/* Intro */}
      <div className="text-center mb-10 max-w-3xl mx-auto">
        <p className="drop-cap text-xl mb-6">
          Todo noble invitado deberá vestir ropajes dignos de un cuento de hadas. 
          Os suplicamos que arriéis vuestras mejores galas medievales, élficas o de fantasía, 
          pues este día el reino entero cobrará vida mágica.
        </p>
        <div className="inline-block px-6 py-3 bg-forest text-parchment-light rounded-sm font-medieval text-xl"
             style={{ boxShadow: "0 0 20px hsl(145 55% 18% / 0.4)" }}>
          ¡DISFRACES OBLIGATORIOS!
        </div>
      </div>

      {/* Visual Examples */}
        <motion.div 
        className="mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <img 
          src={dressCodeExamples} 
          alt="Ejemplos de código de vestimenta medieval y fantástica"
          className="w-full rounded-sm border-4 border-gold-dark"
          style={{ boxShadow: "0 0 30px hsl(45 85% 50% / 0.3)" }}
        />
      </motion.div>

      {/* Categories */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        {dressCodeItems.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            viewport={{ once: true }}
            className="p-6 rounded-sm border-2 border-gold/60 bg-parchment-light/80 text-center"
            style={{ boxShadow: "0 4px 20px hsl(45 85% 50% / 0.15)" }}
          >
            <span className="text-4xl block mb-3">{item.icon}</span>
            <h4 className="font-medieval text-xl text-gold-dark mb-3">{item.title}</h4>
            <p className="text-moss text-base leading-relaxed">{item.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Carrusel de ejemplos */}
      <motion.div 
        className="mb-12" 
        initial={{ opacity: 0, y: 30 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }} 
        viewport={{ once: true }}>
        <PinterestCarousel items={pinterestItems} />
      </motion.div>

      {/* Color palette suggestion */}
      <motion.div 
        className="p-6 border-2 border-vine/50 rounded-sm bg-forest/10 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <p className="font-uncial text-lg text-forest mb-3">Colores del Reino</p>
        <div className="flex justify-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-full bg-forest border-2 border-gold" title="Verde Bosque" />
          <div className="w-12 h-12 rounded-full bg-moss border-2 border-gold" title="Verde Musgo" />
          <div className="w-12 h-12 rounded-full bg-gold border-2 border-forest" title="Dorado" />
          <div className="w-12 h-12 rounded-full bg-parchment border-2 border-gold-dark" title="Crema" />
          <div className="w-12 h-12 rounded-full bg-amber-800 border-2 border-gold" title="Marrón" />
        </div>
        <p className="text-moss-light italic text-sm">
          Sugerimos colores de la naturaleza: verdes, dorados, marrones, cremas y tonos tierra.
        </p>
      </motion.div>
    </div>
  );
};

export default DressCodeSection;
