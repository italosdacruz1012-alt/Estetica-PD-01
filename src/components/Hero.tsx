import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';
import aestheticPackCover from '../assets/images/aesthetic_pack_cover_1784438362854.jpg';

interface HeroProps {
  onOpenCheckout: () => void;
}

export default function Hero({ onOpenCheckout }: HeroProps) {
  const scrollToPricing = () => {
    const element = document.getElementById('pricing-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Helper to render the Checklist card
  const renderChecklistCard = (isDesktop: boolean) => (
    <motion.div
      initial={isDesktop ? { opacity: 0, y: 15 } : { opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className={`relative w-full ${isDesktop ? 'max-w-[540px]' : 'max-w-[480px]'} bg-black/40 backdrop-blur-md p-8 rounded-2xl border border-gold-500/10 shadow-[0_0_50px_rgba(212,175,55,0.05)] space-y-6 ${isDesktop ? 'hidden lg:block' : 'lg:hidden'}`}
    >
      <h3 className="font-serif text-lg font-semibold text-gold-200 tracking-wider uppercase border-b border-gold-500/10 pb-3">
        O que você vai receber:
      </h3>
      <div className="space-y-4">
        {[
          'Mais de 50 modelos prontos',
          'Totalmente editáveis no Canva',
          'Acesso imediato e vitalício',
          'Fácil de personalizar',
          'Não exige experiência em design',
        ].map((prop, idx) => (
          <div key={idx} className="flex items-center gap-3.5 text-base text-gray-200 py-1">
            <div className="w-6 h-6 rounded-full bg-gold-500/10 flex items-center justify-center border border-gold-500/30 flex-shrink-0">
              <CheckCircle2 className="w-4 h-4 text-gold-400" />
            </div>
            <span className="font-light tracking-wide">{prop}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );

  // Helper to render the Cover mockup image
  const renderCoverImage = (isDesktop: boolean) => (
    <motion.div
      initial={isDesktop ? { opacity: 0, x: 20 } : { opacity: 0, scale: 0.95 }}
      animate={isDesktop ? { opacity: 1, x: 0 } : { opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className={`relative w-full ${isDesktop ? 'max-w-[480px] lg:max-w-[520px]' : 'max-w-[420px] mx-auto lg:mx-0'} aspect-square rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(212,175,55,0.12)] border border-gold-500/10 hover:border-gold-500/30 transition-all duration-300 group ${isDesktop ? 'hidden lg:block' : 'lg:hidden'}`}
    >
      <img
        src={aestheticPackCover}
        alt="Pack Estética - 50+ Posts Editáveis no Canva"
        className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
        referrerPolicy="no-referrer"
      />
      {/* Subtle elegant glass overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </motion.div>
  );

  return (
    <section className="relative min-h-screen pt-6 pb-16 px-4 md:pt-12 md:pb-20 overflow-hidden bg-gradient-to-b from-black via-aesthetic-purple to-aesthetic-dark" id="hero-section">
      {/* Golden radial background light flares matching the premium image style */}
      <div className="absolute top-20 left-1/4 w-[400px] h-[400px] bg-gold-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-purple-900/15 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        
        {/* Left Column - Sales Copy & CTA */}
        <div className="lg:col-span-6 space-y-6 md:space-y-8 text-left">
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold tracking-tight text-white leading-[1.1]"
          >
            Transforme o Instagram da sua estética com mais de <span className="text-gold-400 font-normal italic">50 posts</span> profissionais
          </motion.h1>

          {/* Product Cover Image in Left Column (Mobile / Tablet only) */}
          {renderCoverImage(false)}

          {/* Checklist in Left Column (Desktop only) */}
          {renderChecklistCard(true)}

          {/* CTA Button Group */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-3.5"
          >
            <button
              onClick={scrollToPricing}
              className="group relative inline-flex items-center justify-center gap-2 px-8 py-4.5 w-full sm:w-auto rounded-xl bg-gold-gradient text-aesthetic-dark font-bold uppercase tracking-wider text-sm glow-gold hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
              id="hero-cta-btn"
            >
              QUERO GARANTIR MEU PACK
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
              <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
                <div className="shimmer absolute inset-0 opacity-40" />
              </div>
            </button>

            <p className="text-[11px] md:text-xs text-gray-400 font-light tracking-wide flex items-center justify-start gap-1.5 pl-1">
              <span className="inline-block w-1.5 h-1.5 bg-gold-500 rounded-full animate-ping" />
              Compra segura • Acesso imediato • Garantia de 7 dias
            </p>
          </motion.div>
        </div>

         {/* Right Column */}
        <div className="lg:col-span-6 relative flex items-center justify-center pt-8 lg:pt-0">
          
          {/* Ambient light glow behind */}
          <div className="absolute w-[85%] h-[85%] bg-gold-500/10 rounded-full blur-[100px] pointer-events-none" />
          
          {/* Checklist in Right Column (Mobile / Tablet only) */}
          {renderChecklistCard(false)}

          {/* Cover mockup image in Right Column (Desktop only) */}
          {renderCoverImage(true)}
        </div>

      </div>
    </section>
  );
}
