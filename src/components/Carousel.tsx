import React, { useState, useRef, TouchEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, ZoomIn, X, Sparkles } from 'lucide-react';
import { carouselSlidesData } from '../data';

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoomIndex, setZoomIndex] = useState<number | null>(null);

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? carouselSlidesData.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === carouselSlidesData.length - 1 ? 0 : prev + 1));
  };

  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 50; // minimum distance to register swipe

    if (diff > threshold) {
      nextSlide();
    } else if (diff < -threshold) {
      prevSlide();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  const openZoom = (index: number) => {
    setZoomIndex(index);
  };

  const closeZoom = () => {
    setZoomIndex(null);
  };

  const renderSlideContent = (index: number, isLightbox = false) => {
    if (index === 0) {
      return (
        <div className={`absolute inset-0 flex flex-col bg-[#FDF3EE] text-left transition-all duration-500 font-sans ${isLightbox ? 'p-2' : ''}`}>
          {/* Top Section: Deep Purple */}
          <div className={`${isLightbox ? 'py-8 px-6' : 'p-5'} bg-[#200E32] text-center flex flex-col items-center justify-center border-b border-gold-500/10`}>
            <span className={`${isLightbox ? 'text-sm tracking-[0.3em] mb-2' : 'text-[11px] md:text-xs tracking-[0.25em] mb-1.5'} font-serif font-semibold text-[#D4AF37] uppercase`}>
              Dica do Dia
            </span>
            <h3 className={`${isLightbox ? 'text-xl md:text-2xl' : 'text-lg md:text-xl'} font-serif font-medium leading-tight text-white max-w-md`}>
              Protetor solar é o melhor anti-idade
            </h3>
            <div className="w-12 h-[1.5px] bg-[#D4AF37] mt-3 opacity-80" />
          </div>
          
          {/* Middle Section: Text with beige background */}
          <div className={`${isLightbox ? 'px-8 py-6' : 'px-6 py-4'} text-center`}>
            <p className={`${isLightbox ? 'text-sm md:text-base' : 'text-xs md:text-sm'} text-[#3A2A2F] font-light leading-relaxed max-w-md mx-auto`}>
              Use protetor solar todos os dias, mesmo em dias nublados. A radiação UV é responsável por 80% do envelhecimento precoce da pele.
            </p>
          </div>

          {/* Bottom Section: Product Image */}
          <div className="flex-1 relative bg-[#FDF3EE] flex items-center justify-center pb-6">
            <img
              src="https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=600&q=80"
              alt="Protetor solar"
              className={`h-full ${isLightbox ? 'max-h-[220px] md:max-h-[260px]' : 'max-h-[140px] md:max-h-[160px]'} object-contain drop-shadow-2xl`}
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-2 right-8 opacity-30 text-base text-[#200E32] font-serif">★</div>
            <div className="absolute bottom-4 left-8 opacity-20 text-lg text-[#200E32] font-serif">★</div>
          </div>
        </div>
      );
    }

    if (index === 1) {
      return (
        <div className={`absolute inset-0 flex flex-col bg-[#200E32] text-left transition-all duration-500 font-sans ${isLightbox ? 'p-2' : ''}`}>
          {/* Top Section: Facial close-up image */}
          <div className={`${isLightbox ? 'h-[50%]' : 'h-[45%]'} relative overflow-hidden`}>
            <img
              src="https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=600&q=80"
              alt="Harmonização Facial"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#200E32] via-transparent to-transparent" />
          </div>
          
          {/* Bottom Section: Dark purple content */}
          <div className={`flex-1 ${isLightbox ? 'p-8' : 'p-5 md:p-6'} flex flex-col justify-center text-center`}>
            <span className={`${isLightbox ? 'text-xs tracking-[0.3em] mb-1.5' : 'text-[10px] md:text-xs tracking-[0.25em] mb-1'} font-serif font-bold text-[#D4AF37] uppercase`}>
              Harmonização
            </span>
            <h3 className={`${isLightbox ? 'text-3xl md:text-4xl mb-3' : 'text-2xl md:text-3xl mb-2'} font-serif font-semibold leading-tight text-white tracking-[0.05em] uppercase`}>
              Facial
            </h3>
            <p className={`${isLightbox ? 'text-xs md:text-sm mb-6' : 'text-[11px] md:text-xs mb-4'} text-gray-300 font-light leading-relaxed max-w-sm mx-auto`}>
              Realce sua beleza natural com técnicas minimamente invasivas
            </p>
            
            {/* 2x2 Grid of procedures */}
            <div className={`grid grid-cols-2 gap-x-6 ${isLightbox ? 'gap-y-4 text-xs md:text-sm pt-4' : 'gap-y-2.5 text-[10px] md:text-[11px] pt-3'} text-gray-200 max-w-md mx-auto text-left font-light border-t border-gold-500/20`}>
              <div className="flex items-center gap-1.5">
                <span className="text-[#D4AF37] font-bold">+</span>
                <span>Preenchimento labial</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[#D4AF37] font-bold">+</span>
                <span>Bichectomia</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[#D4AF37] font-bold">+</span>
                <span>Rinomodelação</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[#D4AF37] font-bold">+</span>
                <span>Contorno mandibular</span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (index === 2) {
      return (
        <div className={`absolute inset-0 flex flex-col bg-[#200E32] text-left transition-all duration-500 font-sans ${isLightbox ? 'p-2' : ''}`}>
          {/* Top Section: Lips close-up image */}
          <div className={`${isLightbox ? 'h-[50%]' : 'h-[48%]'} relative overflow-hidden`}>
            <img
              src="https://images.unsplash.com/photo-1608248597481-496100c80836?auto=format&fit=crop&w=600&q=80"
              alt="Preenchimento Labial"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#200E32] via-transparent to-transparent" />
          </div>
          
          {/* Bottom Section: Left-aligned content */}
          <div className={`flex-1 ${isLightbox ? 'p-8 md:p-10' : 'p-5 md:p-6'} flex flex-col justify-center`}>
            <h3 className={`${isLightbox ? 'text-xl md:text-2xl' : 'text-lg md:text-xl'} font-serif font-bold text-white uppercase tracking-wider leading-none`}>
              Preenchimento
            </h3>
            <h4 className={`${isLightbox ? 'text-2xl md:text-3xl mb-3' : 'text-xl md:text-2xl mb-2'} font-serif font-bold text-[#D4AF37] uppercase tracking-wider leading-tight`}>
              Labial
            </h4>
            <p className={`${isLightbox ? 'text-xs md:text-sm mb-6' : 'text-[11px] md:text-xs mb-4'} text-gray-300 font-light leading-relaxed max-w-md`}>
              Volume e contorno natural com ácido hialurônico de última geração. Resultado imediato e duradouro.
            </p>
            
            <div>
              <span className={`inline-block ${isLightbox ? 'px-8 py-2.5 text-xs' : 'px-6 py-2 text-[10px] md:text-xs'} bg-[#E2B785] text-black font-serif font-semibold uppercase tracking-[0.15em] rounded shadow-md`}>
                Agendar
              </span>
            </div>
          </div>
        </div>
      );
    }

    if (index === 3) {
      return (
        <div className={`absolute inset-0 flex flex-col bg-[#200E32] text-left transition-all duration-500 font-sans ${isLightbox ? 'p-2' : ''}`}>
          {/* Top Section: Skincare Treatment image */}
          <div className={`${isLightbox ? 'h-[50%]' : 'h-[48%]'} relative overflow-hidden`}>
            <img
              src="https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80"
              alt="Tratamento Facial Premium"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#200E32] via-transparent to-transparent" />
          </div>
          
          {/* Bottom Section: Centered content */}
          <div className={`flex-1 ${isLightbox ? 'p-8' : 'p-5 md:p-6'} flex flex-col justify-center text-center`}>
            <span className={`${isLightbox ? 'text-xs tracking-[0.25em] mb-1' : 'text-[11px] md:text-xs tracking-[0.2em] mb-0.5'} font-serif font-bold text-[#D4AF37] uppercase`}>
              Tratamento Facial
            </span>
            <h3 className={`${isLightbox ? 'text-2xl md:text-3xl mb-3' : 'text-xl md:text-2xl mb-2'} font-serif font-extrabold text-white tracking-[0.08em] uppercase`}>
              Premium
            </h3>
            <p className={`${isLightbox ? 'text-sm md:text-base mb-1' : 'text-xs mb-1'} text-gray-200 font-semibold tracking-wide`}>
              Hidratação profunda + Peeling + LED
            </p>
            <p className={`${isLightbox ? 'text-xs md:text-sm mb-6' : 'text-[10px] md:text-[11px] mb-4'} text-gray-300 font-light max-w-sm mx-auto`}>
              Resultados visíveis desde a primeira sessão
            </p>
            
            <div>
              <span className={`inline-block ${isLightbox ? 'px-8 py-2.5 text-xs' : 'px-6 py-2 text-[10px] md:text-xs'} bg-[#E6D4C3] text-black font-serif font-semibold uppercase tracking-[0.15em] rounded shadow-md`}>
                Saiba Mais
              </span>
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <section className="relative py-20 px-4 md:py-28 overflow-hidden bg-gradient-to-b from-aesthetic-dark to-aesthetic-purple" id="carousel-section">
      {/* Decorative Golden Glimmer background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-gold-400 bg-gold-500/10 rounded-full border border-gold-500/20 mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          Preview Exclusivo
        </span>
        <h2 className="text-3xl md:text-5xl font-serif font-semibold tracking-tight text-gold-100 mb-4">
          Veja os modelos que você poderá personalizar
        </h2>
        <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto mb-12">
          Estes são exemplos reais de publicações inclusas no pack. Toque nas setas ou deslize para navegar. Clique na lupa ou na imagem para ampliar e conferir os detalhes em alta definição.
        </p>

        {/* Carousel Container */}
        <div 
          className="relative max-w-lg mx-auto bg-aesthetic-indigo/20 p-4 rounded-3xl border border-gold-500/10 shadow-2xl overflow-hidden touch-pan-y"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          id="carousel-main-container"
        >
          {/* Active Slide Display */}
          <div className="relative aspect-square rounded-2xl overflow-hidden border border-white/5 shadow-inner bg-aesthetic-dark select-none group">
            {renderSlideContent(currentIndex)}

            {/* Placeholder warning / edit notice overlay */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 w-full px-4 text-center pointer-events-none">
              <div className="inline-block bg-gold-500/90 text-aesthetic-dark font-sans font-bold text-[9px] uppercase tracking-wider py-1 px-2.5 rounded-full shadow-lg border border-white/20">
                Modelo {currentIndex + 1} — Editável no Canva
              </div>
            </div>

            {/* Zoom Hover Overlay */}
            <button
              onClick={() => openZoom(currentIndex)}
              className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 flex items-center justify-center transition duration-300 cursor-pointer z-30"
              aria-label="Ampliar Imagem"
              id={`zoom-slide-${currentIndex}`}
            >
              <div className="p-3.5 bg-gold-500 text-aesthetic-dark rounded-full shadow-lg hover:scale-110 transition">
                <ZoomIn className="w-6 h-6" />
              </div>
            </button>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-6 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-aesthetic-purple/90 border border-gold-500/20 text-gold-300 hover:text-white hover:bg-gold-500 hover:scale-105 active:scale-95 transition z-30 shadow-lg cursor-pointer"
            aria-label="Slide anterior"
            id="prev-carousel-slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-6 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-aesthetic-purple/90 border border-gold-500/20 text-gold-300 hover:text-white hover:bg-gold-500 hover:scale-105 active:scale-95 transition z-30 shadow-lg cursor-pointer"
            aria-label="Próximo slide"
            id="next-carousel-slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Carousel Indicators / Dots */}
        <div className="flex justify-center items-center gap-2 mt-6" id="carousel-indicators">
          {carouselSlidesData.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                index === currentIndex ? 'w-8 bg-gold-500' : 'w-2 bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Ir para slide ${index + 1}`}
              id={`indicator-dot-${index}`}
            />
          ))}
        </div>

        <p className="text-xs text-gray-500 mt-4 italic">
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
              className="relative max-w-xl w-full aspect-square rounded-2xl overflow-hidden glass-card border border-gold-500/20 shadow-2xl p-1"
              onClick={(e) => e.stopPropagation()} // stop click bubbling
            >
              {/* Close button in zoom */}
              <button
                onClick={closeZoom}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-gray-300 hover:text-white border border-white/10 hover:bg-black/80 transition z-50 cursor-pointer"
                aria-label="Fechar ampliação"
                id="close-lightbox-btn"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Main zoom render */}
              <div className="w-full h-full relative rounded-xl overflow-hidden">
                {renderSlideContent(zoomIndex, true)}
                
                {/* Overlay indicating it can be edited */}
                <div className="absolute top-4 left-4 z-20">
                  <span className="text-[10px] uppercase font-semibold tracking-widest text-gold-300 bg-black/80 px-3 py-1 rounded border border-gold-500/30 font-serif">
                    FÁCIL DE EDITAR NO CANVA
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
