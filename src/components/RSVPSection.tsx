import { motion } from "framer-motion";
import { useState } from "react";
import { Send, User, Mail, Users, MessageSquare, Check } from "lucide-react";

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

  // Google Forms URL - Replace with actual form URL
  const googleFormsUrl = "https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, this would submit to Google Forms
    console.log("Form submitted:", formData);
    setIsSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-forest mb-6"
             style={{ boxShadow: "0 0 30px hsl(145 55% 18% / 0.5)" }}>
          <Check className="w-10 h-10 text-gold" />
        </div>
        <h3 className="font-medieval text-3xl text-gold-dark mb-4">¡Mensaje Recibido!</h3>
        <p className="font-body text-xl text-forest max-w-lg mx-auto">
          Vuestro cuervo mensajero ha llegado al castillo. Os aguardamos con ansias en la celebración.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="font-body text-lg text-forest leading-relaxed">
      {/* Intro */}
      <p className="drop-cap text-xl mb-10 text-center max-w-2xl mx-auto">
        Enviad vuestro cuervo mensajero para confirmar vuestra asistencia a esta 
        celebración épica. El reino necesita conocer el número de nobles que honrarán 
        nuestro banquete.
      </p>

      {/* Form */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-2xl mx-auto p-8 border-4 border-gold-dark rounded-sm bg-parchment-light/90"
        style={{ boxShadow: "0 0 40px hsl(45 85% 50% / 0.3)" }}
      >
        {/* Name */}
        <div className="mb-6">
          <label className="flex items-center gap-2 font-medieval text-lg text-forest mb-2">
            <User className="w-5 h-5 text-gold" />
            Nombre del Noble
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Ej: Sir Lancelot del Valle"
            className="w-full"
          />
        </div>

        {/* Email */}
        <div className="mb-6">
          <label className="flex items-center gap-2 font-medieval text-lg text-forest mb-2">
            <Mail className="w-5 h-5 text-gold" />
            Paloma Mensajera (Email)
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="noble@reino.com"
            className="w-full"
          />
        </div>

        {/* Attendance */}
        <div className="mb-6">
          <label className="font-medieval text-lg text-forest mb-3 block">
            ¿Honraréis con vuestra presencia?
          </label>
          <div className="flex gap-4 flex-wrap">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="attendance"
                value="yes"
                checked={formData.attendance === "yes"}
                onChange={handleChange}
                className="w-5 h-5 accent-forest"
              />
              <span>Asistiré con honor</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="attendance"
                value="no"
                checked={formData.attendance === "no"}
                onChange={handleChange}
                className="w-5 h-5 accent-forest"
              />
              <span>Lamentablemente no podré</span>
            </label>
          </div>
        </div>

        {/* Number of guests */}
        <div className="mb-6">
          <label className="flex items-center gap-2 font-medieval text-lg text-forest mb-2">
            <Users className="w-5 h-5 text-gold" />
            Número de Acompañantes
          </label>
          <select
            name="guests"
            value={formData.guests}
            onChange={handleChange}
            className="w-full"
          >
            <option value="1">Solo yo</option>
            <option value="2">2 personas</option>
            <option value="3">3 personas</option>
            <option value="4">4 personas</option>
            <option value="5">5 o más</option>
          </select>
        </div>

        {/* Costume idea */}
        <div className="mb-6">
          <label className="flex items-center gap-2 font-medieval text-lg text-forest mb-2">
            <span className="text-gold">👑</span>
            ¿Qué personaje seréis?
          </label>
          <input
            type="text"
            name="costume"
            value={formData.costume}
            onChange={handleChange}
            placeholder="Ej: Elfo del bosque, Caballero medieval..."
            className="w-full"
          />
        </div>

        {/* Dietary restrictions */}
        <div className="mb-6">
          <label className="flex items-center gap-2 font-medieval text-lg text-forest mb-2">
            <span className="text-gold">🍖</span>
            Restricciones Alimenticias
          </label>
          <input
            type="text"
            name="dietary"
            value={formData.dietary}
            onChange={handleChange}
            placeholder="Vegetariano, alergias, etc."
            className="w-full"
          />
        </div>

        {/* Message */}
        <div className="mb-8">
          <label className="flex items-center gap-2 font-medieval text-lg text-forest mb-2">
            <MessageSquare className="w-5 h-5 text-gold" />
            Mensaje para los Novios
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            placeholder="Escribid vuestras bendiciones..."
            className="w-full resize-none"
          />
        </div>

        {/* Submit */}
        <motion.button
          type="submit"
          className="btn-medieval w-full flex items-center justify-center gap-3"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Send className="w-5 h-5" />
          Enviar Cuervo Mensajero
        </motion.button>
      </motion.form>

      {/* Deadline */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        viewport={{ once: true }}
        className="text-center mt-8 text-moss italic"
      >
        Os rogamos confirmar antes del 1 de Septiembre de 2026
      </motion.p>
    </div>
  );
};

export default RSVPSection;
