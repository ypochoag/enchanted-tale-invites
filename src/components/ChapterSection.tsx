import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ChapterSectionProps {
  chapterNumber: string;
  chapterTitle: string;
  children: ReactNode;
  id?: string;
}

const ChapterSection = ({ chapterNumber, chapterTitle, children, id }: ChapterSectionProps) => {
  return (
    <motion.section
      id={id}
      className="relative min-h-screen py-16 md:py-24 px-4"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Ornate top border */}
        <div className="flex items-center justify-center mb-8">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold-dark to-transparent" />
          <span className="px-6 text-gold text-2xl">❧</span>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold-dark to-transparent" />
        </div>

        {/* Chapter header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <span className="font-uncial text-xl md:text-2xl text-forest block mb-2 tracking-wider">
            {chapterNumber}
          </span>
          <h2 className="font-medieval text-3xl md:text-4xl lg:text-5xl text-gold-dark tracking-wide"
              style={{
                textShadow: "2px 2px 0 hsl(145 55% 18% / 0.3), 0 0 20px hsl(45 85% 50% / 0.3)"
              }}>
            {chapterTitle}
          </h2>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {children}
        </motion.div>

        {/* Ornate bottom border */}
        <div className="flex items-center justify-center mt-12">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold-dark to-transparent" />
          <span className="px-6 text-gold text-2xl rotate-180">❧</span>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold-dark to-transparent" />
        </div>
      </div>
    </motion.section>
  );
};

export default ChapterSection;
