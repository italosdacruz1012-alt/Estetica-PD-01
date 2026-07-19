import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ZoomIn, X, Sparkles, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { carouselSlidesData } from '../data';

// Import high-resolution generated original template images
import templateSunscreen from '../assets/images/template_sunscreen_1784485176407.jpg';
import templateBotox from '../assets/images/template_botox_1784485191763.jpg';
import templateHarmonizacao from '../assets/images/template_harmonizacao_1784485210176.jpg';
import templateTratamento from '../assets/images/template_tratamento_1784485225402.jpg';

export default function Carousel() {
  const [zoomIndex, setZoomIndex] = useState<number | null>(null);

  const openZoom = (index: number) => {
    setZoomIndex(index);
  };

  const closeZoom = () => {
    setZoomIndex(null);
  };

  const prevZoom = () => {
    if (zoomIndex === null) return;
    setZoomIndex((prev) => (prev === 0 ? carouselSlidesData.length - 1 : prev! - 1));
  };

  const nextZoom = () => {
    if (zoomIndex === null) return;
    setZoomIndex((prev) => (prev === carouselSlidesData.length - 1 ? 0 : prev! + 1));
  };

  const renderSlideContent = (index: number, isLightbox = false) => {
    let src = '';
    let alt = '';

    if (index === 0) {
      src = templateSunscreen;
      alt = 'Modelo 1 - Protetor Solar';
    } else if (index === 1) {
      src = templateBotox;
      alt = 'Modelo 2 - Botox Premium';
    } else if (index === 2) {
      src = templateHarmonizacao;
      alt = 'Modelo 3 - Harmonização Facial';
    } else if (index === 3) {
      src = templateTratamento;
      alt = 'Modelo 4 - Tratamento Facial Premium';
    }

    if (!src) return null;

    return (
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover select-none"
        referrerPolicy="no-referrer"
      />
    );
  };

  return (
    <section className="relative py-20 px-4 md:py-28 overflow-hidden bg-gradient-to-b from-aesthetic-dark to-aesthetic-purple" id="carousel-section">
      {/* Decorative Golden Glimmer background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto text-center relative z-10">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-gold-400 bg-gold-500/10 rounded-full border border-gold-500/20 mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          Preview Exclusivo
        </span>
        <h2 className="text-3xl md:text-5xl font-serif font-semibold tracking-tight text-gold-100 mb-4">
          Veja os modelos que você poderá personalizar
        </h2>
        <p className="text-gray-400 text-sm md:text-base max-w-3xl mx-auto mb-14">
          Estes são exemplos reais de publicações inclusas no pack. Clique em qualquer modelo para ampliar em alta definição e conferir a qualidade premium dos detalhes que você poderá editar diretamente no Canva.
        </p>

        {/* Responsive Preview Grid */}
        <div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8" 
          id="templates-preview-grid"
        >
          {carouselSlidesData.map((slide, index) => (
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative aspect-square rounded-3xl overflow-hidden border border-gold-500/10 bg-aesthetic-indigo/20 p-2.5 shadow-xl hover:border-gold-500/30 transition-all duration-300 group cursor-pointer"
              onClick={() => openZoom(index)}
              id={`template-preview-card-${index}`}
            >
              {/* Nested template frame */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/5 bg-aesthetic-dark select-none">
                {renderSlideContent(index)}

                {/* Always-on subtle badge */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 w-full px-3 text-center pointer-events-none">
                  <div className="inline-flex items-center gap-1 bg-black/80 backdrop-blur-sm text-gold-300 font-sans font-bold text-[9px] uppercase tracking-wider py-1 px-2.5 rounded-full shadow-lg border border-gold-500/20">
                    <span>Modelo {index + 1}</span>
                  </div>
                </div>

                {/* High-quality hover effect */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-all duration-300 z-35">
                  <div className="p-3 bg-gold-500 text-aesthetic-dark rounded-full shadow-lg scale-90 group-hover:scale-100 transition-transform duration-300 mb-2">
                    <ZoomIn className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-gold-200">
                    Clique para Ampliar
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="text-xs text-gray-500 mt-10 italic">
          * As artes acima são visualizações reais do material editável. Você poderá alterar todas as fotos por imagens de seus próprios clientes com 1 clique diretamente no Canva.
        </p>
      </div>

      {/* Lightbox / Expand Zoom Modal */}
      <AnimatePresence>
        {zoomIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md"
            onClick={closeZoom}
            id="lightbox-container"
          >
            <motion.div
              initial={{ scale: 0.9, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 10 }}
              className="relative max-w-xl w-full aspect-square rounded-3xl overflow-hidden glass-card border border-gold-500/20 shadow-2xl p-1"
              onClick={(e) => e.stopPropagation()} // stop click bubbling
            >
              {/* Close button */}
              <button
                onClick={closeZoom}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-gray-300 hover:text-white border border-white/10 hover:bg-black/80 transition z-50 cursor-pointer"
                aria-label="Fechar ampliação"
                id="close-lightbox-btn"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Navigation Arrows inside Lightbox to swap between templates easily */}
              <button
                onClick={prevZoom}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 border border-white/10 text-gray-300 hover:text-white hover:bg-black/80 transition z-50 cursor-pointer"
                aria-label="Modelo anterior"
                id="lightbox-prev-btn"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextZoom}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 border border-white/10 text-gray-300 hover:text-white hover:bg-black/80 transition z-50 cursor-pointer"
                aria-label="Próximo modelo"
                id="lightbox-next-btn"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Main zoom render */}
              <div className="w-full h-full relative rounded-2xl overflow-hidden">
                {renderSlideContent(zoomIndex, true)}
                
                {/* Overlay indicating it can be edited */}
                <div className="absolute top-4 left-4 z-20">
                  <span className="text-[10px] uppercase font-semibold tracking-widest text-gold-300 bg-black/80 px-3 py-1 rounded border border-gold-500/30 font-serif">
                    FÁCIL DE EDITAR NO CANVA
                  </span>
                </div>

                {/* Index Indicator */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20">
                  <span className="text-xs font-semibold text-gray-300 bg-black/70 px-3.5 py-1.5 rounded-full border border-white/5">
                    Modelo {zoomIndex + 1} de {carouselSlidesData.length}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

