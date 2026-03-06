import { motion } from "framer-motion";
import { Coins, Sparkles } from "lucide-react";

import qrImage from "@/assets/qr-regalo.jpg";

const GiftSection = () => {
  return (
    <div className="font-body text-lg text-forest leading-relaxed">

      {/* Introducción narrativa */}
      <p className="drop-cap text-xl mb-12 text-center max-w-2xl mx-auto">
        Vuestra presencia en este día sagrado es el mayor tesoro que
        podríamos recibir. No obstante, para quienes deseen ofrecer un
        gesto adicional de cariño y bendición para nuestro nuevo hogar,
        existe una tradición conocida en los antiguos reinos como la{" "}
        <span className="font-uncial text-gold-dark">
          Lluvia de Sobres
        </span>.
      </p>

      {/* Explicación */}
      <motion.div
        className="text-center max-w-2xl mx-auto mb-12"
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <div className="inline-flex items-center gap-3 mb-5">
          <Coins className="w-8 h-8 text-gold" />
          <h3 className="font-medieval text-3xl text-gold-dark">
            Lluvia de Sobres
          </h3>
          <Sparkles className="w-6 h-6 text-gold opacity-80" />
        </div>

        <p className="text-moss italic leading-relaxed">
          Según la tradición, los invitados pueden entregar un pequeño
          sobre con su bendición y buenos deseos, ayudando así a los
          recién unidos aventureros a comenzar su travesía juntos,
          construyendo un nuevo reino lleno de sueños y esperanza.
        </p>
      </motion.div>

      {/* QR mágico */}
      <motion.div
        className="flex justify-center mb-12"
        initial={{ opacity: 0, scale: 0.92 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <div
          className="
          relative
          p-7
          bg-parchment-light/70
          border-[5px]
          border-gold-dark
          rounded-sm
          text-center
          backdrop-blur-sm
        "
          style={{
            boxShadow: "0 0 45px hsl(45 85% 50% / 0.45)",
          }}
        >
          {/* aura mágica */}
          <div className="absolute -inset-2 rounded-sm border border-gold/40 animate-pulse"></div>

          <img
            src={qrImage}
            alt="QR para regalo"
            className="w-64 h-64 mx-auto mb-5 rounded-sm"
          />

          <p className="font-uncial text-lg text-forest">
            Escanea el sello mágico
          </p>

          <p className="text-sm text-moss-light italic mt-1">
            para enviar tu ofrenda al nuevo reino
          </p>
        </div>
      </motion.div>

      {/* Nota final */}
      <div className="mt-10 p-7 border-2 border-gold/50 rounded-sm bg-parchment-light/50 text-center max-w-2xl mx-auto">
        <p className="font-uncial text-lg text-forest mb-3">
          Palabras del Reino
        </p>

        <p className="text-moss-light italic leading-relaxed">
          Para quienes prefieran participar en la lluvia de sobres de
          forma mágica y distante, pueden hacerlo escaneando el sello
          dorado que reposa arriba. Cada gesto será recibido con
          profunda gratitud y guardado como un recuerdo eterno en
          nuestro nuevo hogar.
        </p>
      </div>
    </div>
  );
};

export default GiftSection;