import { motion } from "framer-motion";
import { MapPin, Navigation } from "lucide-react";

const LocationSection = () => {
  const googleMapsUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3975.659652952215!2d-74.23868855506136!3d4.828372584458147!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f7f7667ec9a47%3A0x2f7302c96af718a9!2sCASA%20ARAG%C3%93N!5e0!3m2!1sen!2sco!4v1770865811825!5m2!1sen!2sco";
  const directionsUrl = "https://www.google.com/maps/dir/?api=1&destination=Hacienda+La+Victoria+Subachoque+Cundinamarca";

  return (
    <div className="font-body text-lg text-forest leading-relaxed">
      {/* Story intro */}
      <p className="drop-cap text-xl mb-8 text-center max-w-2xl mx-auto">
        En las tierras místicas de Cundinamarca, donde las montañas guardan secretos ancestrales 
        y los vientos susurran canciones de amor eterno, se alza majestuosa la Casa Aragón, 
        el reino elegido para esta sagrada unión.
      </p>

      {/* Location details */}
      <motion.div 
        className="text-center mb-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="inline-flex items-center gap-3 mb-4">
          <MapPin className="w-8 h-8 text-gold" />
          <h3 className="font-medieval text-2xl md:text-3xl text-gold-dark">
            Casa Aragón
          </h3>
        </div>
        <p className="text-forest-light text-lg mb-2">
          Vía Subachoque, Subachoque
        </p>
        <p className="text-moss italic">
          Cundinamarca, Colombia
        </p>
      </motion.div>

      {/* Map */}
      <motion.div 
        className="relative rounded-sm overflow-hidden mb-8 border-4 border-gold-dark"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        style={{ boxShadow: "0 0 30px hsl(45 85% 50% / 0.3)" }}
      >
        <iframe
          src={googleMapsUrl}
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Ubicación de la Casa Aragón"
          className="grayscale-[30%] sepia-[20%]"
        />
      </motion.div>

      {/* Directions button */}
      <motion.div 
        className="text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-medieval inline-flex items-center gap-3"
        >
          <Navigation className="w-5 h-5" />
          Obtener Direcciones
        </a>
      </motion.div>

      {/* Additional info */}
      <div className="mt-10 p-6 border-2 border-gold/50 rounded-sm bg-parchment-light/50 text-center">
        <p className="font-uncial text-lg text-forest mb-2">Nota del Reino</p>
        <p className="text-moss-light italic">
          Se recomienda arribar 30 minutos antes de la hora señalada, 
          para que vuestras carrozas encuentren reposo adecuado.
        </p>
      </div>
    </div>
  );
};

export default LocationSection;
