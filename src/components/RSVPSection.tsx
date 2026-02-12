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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formUrl =
      "https://docs.google.com/forms/d/e/1FAIpQLSduoX4JN0E6ARSpYJk94MWdZMVQwLMbBtXXxknhgwJzIyEdeA/formResponse";

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

      setIsSubmitted(true);
    } catch (err) {
      setError("Hubo un problema enviando el mensaje.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
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
        <div
          className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-forest mb-6"
          style={{ boxShadow: "0 0 30px hsl(145 55% 18% / 0.5)" }}
        >
          <Check className="w-10 h-10 text-gold" />
        </div>
        <h3 className="font-medieval text-3xl text-gold-dark mb-4">
          ¡Mensaje Recibido!
        </h3>
        <p className="font-body text-xl text-forest max-w-lg mx-auto">
          Vuestro cuervo mensajero ha llegado al castillo. Os aguardamos con ansias en la celebración.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="font-body text-lg text-forest leading-relaxed">
      <p className="drop-cap text-xl mb-10 text-center max-w-2xl mx-auto">
        Enviad vuestro cuervo mensajero para confirmar vuestra asistencia a esta
        celebración épica. El reino necesita conocer el número de nobles que honrarán
        nuestro banquete.
      </p>

      <motion.form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto p-8 border-4 border-gold-dark rounded-sm bg-parchment-light/90"
      >
        {/* Nombre */}
        <div className="mb-6">
          <label className="flex items-center gap-2 font-medieval text-lg mb-2">
            <User className="w-5 h-5 text-gold" />
            Nombre del Noble
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full"
          />
        </div>

        {/* Email */}
        <div className="mb-6">
          <label className="flex items-center gap-2 font-medieval text-lg mb-2">
            <Mail className="w-5 h-5 text-gold" />
            Paloma Mensajera (Email)
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full"
          />
        </div>

        {/* Asistencia */}
        <div className="mb-6">
          <label className="font-medieval text-lg mb-3 block">
            ¿Honraréis con vuestra presencia?
          </label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="attendance"
                value="si"
                checked={formData.attendance === "si"}
                onChange={handleChange}
                required
              />
              Asistiré con honor
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="attendance"
                value="no"
                checked={formData.attendance === "no"}
                onChange={handleChange}
              />
              No podré asistir
            </label>
          </div>
        </div>

        {/* Invitados */}
        <div className="mb-6">
          <label className="flex items-center gap-2 font-medieval text-lg mb-2">
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

        {/* Personaje */}
        <div className="mb-6">
          <label className="font-medieval text-lg mb-2 block">
            ¿Qué personaje seréis?
          </label>
          <input
            type="text"
            name="costume"
            value={formData.costume}
            onChange={handleChange}
            className="w-full"
          />
        </div>

        {/* Restricciones */}
        <div className="mb-6">
          <label className="font-medieval text-lg mb-2 block">
            Restricciones Alimenticias
          </label>
          <input
            type="text"
            name="dietary"
            value={formData.dietary}
            onChange={handleChange}
            className="w-full"
          />
        </div>

        {/* Mensaje */}
        <div className="mb-8">
          <label className="flex items-center gap-2 font-medieval text-lg mb-2">
            <MessageSquare className="w-5 h-5 text-gold" />
            Mensaje para los Novios
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className="w-full resize-none"
          />
        </div>

        {error && (
          <p className="text-red-600 text-center mb-4">{error}</p>
        )}

        <motion.button
          type="submit"
          disabled={isLoading}
          className="btn-medieval w-full flex items-center justify-center gap-3"
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
