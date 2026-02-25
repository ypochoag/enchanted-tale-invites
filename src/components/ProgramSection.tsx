import { motion } from "framer-motion";
import { Clock, Sparkles, Heart, Utensils, Music, Camera } from "lucide-react";

const scheduleItems = [
  {
    time: "2:00 PM",
    title: "La Llegada de los Nobles",
    description: "Los portones del reino se abren para recibir a los invitados. Música de trovadores os dará la bienvenida.",
    icon: Sparkles
  },
  {
    time: "2:30 PM",
    title: "La Ceremonia Sagrada",
    description: "En el jardín encantado, los votos eternos serán pronunciados bajo la bendición de los antiguos robles.",
    icon: Heart
  },
  {
    time: "3:30 PM",
    title: "El Brindis Real",
    description: "Alzad vuestras copas en honor a los recién casados. Hidromiel y elixires mágicos serán servidos.",
    icon: Utensils
  },
  {
    time: "4:30 PM",
    title: "El Gran Festín",
    description: "Un banquete digno de reyes os espera. Manjares del reino serán servidos en abundancia.",
    icon: Utensils
  },
  {
    time: "7:00 PM",
    title: "El Primer Baile",
    description: "Los novios abrirán la pista con su vals encantado, seguido de música y danza para todos.",
    icon: Music
  },
  {
    time: "8:00 PM",
    title: "Retratos del Reino",
    description: "Momento para capturar memorias mágicas en el rincón de los retratos encantados.",
    icon: Camera
  }
];

const ProgramSection = () => {
  return (
    <div className="font-body text-lg text-forest leading-relaxed">
      {/* Intro */}
      <p className="drop-cap text-xl mb-12 text-center max-w-2xl mx-auto">
        Así se desarrollará la jornada en este día de celebración. Cada momento ha sido 
        cuidadosamente orquestado para que viváis una experiencia verdaderamente mágica.
      </p>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-gold via-forest to-gold transform md:-translate-x-1/2" />

        {scheduleItems.map((item, index) => {
          const Icon = item.icon;
          const isEven = index % 2 === 0;
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: isEven ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative flex items-center mb-8 ${
                isEven ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Time marker */}
              <div className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-gold border-2 border-forest transform -translate-x-1/2 z-10"
                   style={{ boxShadow: "0 0 15px hsl(45 85% 50% / 0.6)" }} />

              {/* Content card */}
              <div className={`ml-20 md:ml-0 md:w-5/12 ${isEven ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                <div className="p-5 rounded-sm border-2 border-gold/60 bg-parchment-light/90"
                     style={{ boxShadow: "0 4px 20px hsl(45 85% 50% / 0.15)" }}>
                  <div className={`flex items-center gap-3 mb-2 ${isEven ? "md:justify-end" : ""}`}>
                    <Clock className="w-5 h-5 text-gold hidden md:block" />
                    <span className="font-medieval text-lg text-gold-dark">{item.time}</span>
                    <Icon className="w-5 h-5 text-forest" />
                  </div>
                  <h4 className="font-medieval text-xl text-forest mb-2">{item.title}</h4>
                  <p className="text-moss text-base">{item.description}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgramSection;
