import { motion } from "framer-motion";
import { useState, useRef } from "react"; // Añadimos useRef
import { Send, User, Mail, MessageSquare } from "lucide-react";

const RSVPSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    guests: "1",
    attendance: "",
    dietary: "",
    costume: "",
    message: ""
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  // Ref para localizar el punto donde queremos que el usuario vea la animación
  const successRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formUrl = "https://docs.google.com/forms/d/e/1FAIpQLSduoX4JN0E6ARSpYJk94MWdZMVQwLMbBtXXxknhgwJzIyEdeA/formResponse";

    const formBody = new FormData();
    formBody.append("entry.1036507936", formData.name);
    formBody.append("entry.2078010478", formData.email);
    formBody.append("entry.655814804", formData.attendance);
    formBody.append("entry.1437296836", formData.guests);
    formBody.append("entry.1302394596", formData.costume);
    formBody.append("entry.108466867", formData.dietary);
    formBody.append("entry.338487351", formData.message);

    try {
      await fetch(formUrl, {
        method: "POST",
        mode: "no-cors",
        body: formBody,
      });

      // 1. Cambiamos el estado
      setIsSubmitted(true);

      // 2. Pequeño delay para dejar que React renderice la Card de éxito 
      // y luego hacemos el scroll suave hacia arriba
      setTimeout(() => {
        successRef.current?.scrollIntoView({ 
          behavior: "smooth", 
          block: "center" // Centra la moneda en la pantalla
        });
      }, 100);

    } catch (err) {
      setError("Hubo un problema enviando el mensaje.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // --- VISTA DE ÉXITO CON AUTO-SCROLL ---
  if (isSubmitted) {
    return (
      <div ref={successRef} className="py-10"> {/* El REF va aquí */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16 bg-parchment-light/95 border-4 border-gold-dark rounded-sm p-10 max-w-3xl mx-auto shadow-2xl relative"
        >
          <div className="relative mb-10 inline-block">
            {/* Brillo mágico */}
            <motion.div 
              animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute inset-[-40px] bg-gold rounded-full blur-3xl"
            />
            
            {/* Moneda de Lilo Gigante */}
            <motion.div
              initial={{ scale: 0, rotate: -720, y: 50 }}
              animate={{ scale: 1, rotate: 0, y: 0 }}
              transition={{ 
                type: "spring", 
                stiffness: 40, 
                damping: 10,
                duration: 2.5 
              }}
              className="relative w-56 h-56 rounded-full border-8 border-gold shadow-[0_0_60px_rgba(212,175,55,0.5)] overflow-hidden bg-[#1a2518]"
            >
              <img 
                src="/assets/lilo.png" 
                alt="Lilo" 
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <h3 className="font-medieval text-5xl text-gold-dark mb-6 uppercase tracking-widest">
              ¡Mensaje Custodiado!
            </h3>
            <p className="font-body text-2xl text-forest max-w-xl mx-auto leading-relaxed italic">
              Vuestra respuesta ha sido entregada. <strong>Lilo</strong> la guardará con su vida hasta el día del banquete.
            </p>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="font-body text-lg text-forest leading-relaxed pb-20">
      <p className="drop-cap text-xl mb-10 text-center max-w-2xl mx-auto">
        Enviad vuestro cuervo mensajero para confirmar vuestra asistencia a esta
        celebración épica. El reino necesita conocer el número de nobles que honrarán
        nuestro banquete.
      </p>

      <motion.form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto p-8 border-4 border-gold-dark rounded-sm bg-parchment-light/90"
      >
        {/* ... (Resto de los inputs permanecen igual que tu código original) ... */}
        <div className="mb-6">
          <label className="flex items-center gap-2 font-medieval text-lg mb-2">
            <User className="w-5 h-5 text-gold" />
            Nombre del Noble
          </label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full" />
        </div>

        <div className="mb-6">
          <label className="flex items-center gap-2 font-medieval text-lg mb-2">
            <Mail className="w-5 h-5 text-gold" />
            Paloma Mensajera (Email)
          </label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full" />
        </div>

        <div className="mb-6">
          <label className="font-medieval text-lg mb-3 block">
            ¿Honraréis con vuestra presencia?
          </label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="attendance" value="si" checked={formData.attendance === "si"} onChange={handleChange} required />
              Asistiré con honor
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="attendance" value="no" checked={formData.attendance === "no"} onChange={handleChange} />
              No podré asistir
            </label>
          </div>
        </div>

        <div className="mb-6">
          <label className="font-medieval text-lg mb-2 block">¿Qué personaje seréis?</label>
          <input type="text" name="costume" value={formData.costume} onChange={handleChange} className="w-full" />
        </div>

        <div className="mb-6">
          <label className="font-medieval text-lg mb-2 block">Restricciones Alimenticias</label>
          <input type="text" name="dietary" value={formData.dietary} onChange={handleChange} className="w-full" />
        </div>

        <div className="mb-8">
          <label className="flex items-center gap-2 font-medieval text-lg mb-2">
            <MessageSquare className="w-5 h-5 text-gold" />
            Mensaje para los Novios
          </label>
          <textarea name="message" value={formData.message} onChange={handleChange} rows={4} className="w-full resize-none" />
        </div>

        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        <motion.button
          type="submit"
          disabled={isLoading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="btn-medieval w-full flex items-center justify-center gap-3 py-4"
        >
          {isLoading ? "Enviando cuervo..." : (
            <>
              <Send className="w-5 h-5" />
              Enviar Cuervo Mensajero
            </>
          )}
        </motion.button>
      </motion.form>
    </div>
  );
};

export default RSVPSection;