import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const StorySection = () => {
  return (
    <div className="font-body text-lg text-forest leading-relaxed">
      <div className="max-w-2xl mx-auto text-center">
        {/* Decorative hearts */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex justify-center gap-4 mb-8"
        >
          <Heart className="w-6 h-6 text-gold fill-gold/30" />
          <Heart className="w-8 h-8 text-gold-dark fill-gold/50" />
          <Heart className="w-6 h-6 text-gold fill-gold/30" />
        </motion.div>

        {/* Story text */}
        <p className="drop-cap text-xl mb-8 leading-relaxed">
          Cuenta la leyenda que en una tierra lejana, donde el destino teje sus hilos más 
          misteriosos, dos almas estaban destinadas a encontrarse. Lady Alexandra Luna, 
          de espíritu noble y corazón puro, y Sir Roger Alejandro, valiente caballero de 
          inquebrantable lealtad.
        </p>

        <p className="text-xl mb-8 leading-relaxed">
          Sus caminos se cruzaron como lo predijeron las estrellas, y desde aquel momento 
          mágico, supieron que sus destinos estaban entrelazados para siempre. Juntos han 
          atravesado montañas, cruzado ríos encantados y superado los desafíos que el 
          destino les ha puesto.
        </p>

        <p className="text-xl mb-8 leading-relaxed">
          Y ahora, cuando la luna de octubre brille sobre el reino, unirán sus vidas en 
          sagrado matrimonio, sellando con un juramento eterno el amor que los ha guiado 
          hasta este momento.
        </p>

        {/* Quote */}
        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-10 p-6 border-l-4 border-gold bg-forest/10 rounded-r-sm italic"
        >
          <p className="font-body text-xl text-forest-light mb-2">
            "El amor verdadero no es cuestión de suerte, sino de destino."
          </p>
          <footer className="text-moss text-base not-italic">
            — Antiguo Proverbio del Reino
          </footer>
        </motion.blockquote>
      </div>
    </div>
  );
};

export default StorySection;
