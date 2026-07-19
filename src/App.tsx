import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutGrid, 
  Sparkles, 
  BookOpen, 
  Volume2, 
  HeartHandshake, 
  Tag, 
  FolderCheck, 
  ExternalLink, 
  Clock, 
  Award, 
  TrendingUp, 
  Users, 
  Palette, 
  Smile, 
  ChevronDown, 
  ShieldCheck, 
  Star, 
  ShieldAlert, 
  HelpCircle,
  ArrowRight,
  Sparkle
} from 'lucide-react';

import Hero from './components/Hero';
import Carousel from './components/Carousel';
import CheckoutModal from './components/CheckoutModal';
import { featuresData, benefitsData, bonusData, testimonialsData, faqData } from './data';

export default function App() {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ minutes: 15, seconds: 0 });
  const [bannerTimeLeft, setBannerTimeLeft] = useState({ minutes: 20, seconds: 0 });
  const [activeFaq, setActiveFaq] = useState<string | null>(null);

  // 20-minute countdown timer logic for the banner with localStorage persistence
  useEffect(() => {
    const bannerTimerKey = 'aesthetic_pack_banner_timer_target';
    let targetTime = localStorage.getItem(bannerTimerKey);

    if (!targetTime) {
      const now = Date.now();
      const twentyMinutes = 20 * 60 * 1000;
      targetTime = (now + twentyMinutes).toString();
      localStorage.setItem(bannerTimerKey, targetTime);
    }

    const calculateBannerTimeLeft = () => {
      const difference = parseInt(targetTime!, 10) - Date.now();
      
      if (difference <= 0) {
        const newTarget = (Date.now() + 20 * 60 * 1000).toString();
        localStorage.setItem(bannerTimerKey, newTarget);
        return { minutes: 20, seconds: 0 };
      }

      const totalSeconds = Math.floor(difference / 1000);
      const m = Math.floor(totalSeconds / 60);
      const s = totalSeconds % 60;

      return { minutes: m, seconds: s };
    };

    setBannerTimeLeft(calculateBannerTimeLeft());

    const interval = setInterval(() => {
      setBannerTimeLeft(calculateBannerTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // 15-minute countdown timer logic with localStorage persistence
  useEffect(() => {
    const timerKey = 'aesthetic_pack_timer_target';
    let targetTime = localStorage.getItem(timerKey);

    if (!targetTime) {
      const now = Date.now();
      const fifteenMinutes = 15 * 60 * 1000;
      targetTime = (now + fifteenMinutes).toString();
      localStorage.setItem(timerKey, targetTime);
    }

    const calculateTimeLeft = () => {
      const difference = parseInt(targetTime!, 10) - Date.now();
      
      if (difference <= 0) {
        // If timer runs out, reset it to represent another batch/session or keep at zero.
        // To prevent "fake scarcity" breaking, we can keep it at 0 or auto-reset politely.
        // Let's reset it to another 15 minutes to keep the demo experience fluid,
        // but mark that it was renewed.
        const newTarget = (Date.now() + 15 * 60 * 1000).toString();
        localStorage.setItem(timerKey, newTarget);
        return { minutes: 15, seconds: 0 };
      }

      const totalSeconds = Math.floor(difference / 1000);
      const m = Math.floor(totalSeconds / 60);
      const s = totalSeconds % 60;

      return { minutes: m, seconds: s };
    };

    // Initial set
    setTimeLeft(calculateTimeLeft());

    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Format single digit numbers to double digit strings (e.g. 9 -> '09')
  const formatTime = (num: number) => num.toString().padStart(2, '0');

  // Helper to map string to Lucide Icon Component dynamically
  const renderIcon = (iconName: string, className: string = "w-6 h-6") => {
    switch (iconName) {
      case 'LayoutGrid': return <LayoutGrid className={className} />;
      case 'Sparkles': return <Sparkles className={className} />;
      case 'BookOpen': return <BookOpen className={className} />;
      case 'Volume2': return <Volume2 className={className} />;
      case 'HeartHandshake': return <HeartHandshake className={className} />;
      case 'Tag': return <Tag className={className} />;
      case 'FolderCheck': return <FolderCheck className={className} />;
      case 'ExternalLink': return <ExternalLink className={className} />;
      case 'Clock': return <Clock className={className} />;
      case 'Award': return <Award className={className} />;
      case 'TrendingUp': return <TrendingUp className={className} />;
      case 'Users': return <Users className={className} />;
      case 'Palette': return <Palette className={className} />;
      case 'Smile': return <Smile className={className} />;
      default: return <Sparkles className={className} />;
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const resetTimerManually = () => {
    const timerKey = 'aesthetic_pack_timer_target';
    const newTarget = (Date.now() + 15 * 60 * 1000).toString();
    localStorage.setItem(timerKey, newTarget);
    setTimeLeft({ minutes: 15, seconds: 0 });
  };

  return (
    <div className="min-h-screen bg-aesthetic-dark text-gray-100 font-sans selection:bg-gold-500 selection:text-aesthetic-dark">
      
      {/* Yellow Promotion Banner with 20-minute countdown */}
      <div className="sticky top-0 z-50 w-full bg-[#FFE600] text-black py-2 px-4 font-sans font-bold text-xs md:text-sm tracking-wide shadow-lg flex items-center justify-center gap-x-3 select-none text-center">
        <div className="flex items-center gap-1.5 uppercase font-black">
          <span className="animate-bounce">⚡</span> Última chance:
        </div>
        <div className="flex items-center gap-1 bg-black text-[#FFE600] px-2.5 py-0.5 rounded font-mono text-xs md:text-sm font-black shadow-md">
          <span>{formatTime(bannerTimeLeft.minutes)}</span>
          <span className="animate-pulse">:</span>
          <span>{formatTime(bannerTimeLeft.seconds)}</span>
        </div>
      </div>

      {/* 1ª Seção — Apresentação principal */}
      <Hero onOpenCheckout={() => setIsCheckoutOpen(true)} />

      {/* 2ª Seção — O que você vai receber */}
      <section className="py-20 px-4 md:py-28 bg-aesthetic-purple/40 relative border-y border-gold-500/5" id="features-section">
        <div className="absolute inset-0 bg-gradient-to-r from-aesthetic-dark via-transparent to-aesthetic-dark opacity-80 pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-semibold uppercase tracking-widest text-gold-500">Completo & Estratégico</span>
            <h2 className="text-3xl md:text-5xl font-serif font-semibold tracking-tight text-gold-100">
              Conteúdo profissional pronto para o seu Instagram
            </h2>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed">
              Ao adquirir o <strong>Pack Estética</strong>, você receberá uma coleção com mais de 50 artes profissionais desenvolvidas especialmente para perfis de estética e beleza. Todos os modelos poderão ser personalizados diretamente no Canva, permitindo alterar textos, cores, imagens, fontes, logotipo e informações de contato com extrema simplicidade.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" id="features-grid">
            {featuresData.map((feature, idx) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="p-6 rounded-2xl glass-card border border-gold-500/10 hover:border-gold-500/30 transition-all duration-300 flex flex-col justify-between group"
                id={`feature-card-${feature.id}`}
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-gold-500/10 text-gold-400 border border-gold-500/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-gold-500/20 group-hover:text-gold-300 transition duration-300">
                    {renderIcon(feature.iconName)}
                  </div>
                  <h3 className="font-serif font-semibold text-lg text-gold-100 group-hover:text-gold-300 transition">
                    {feature.title}
                  </h3>
                </div>
                <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-1 text-[11px] text-gray-500 group-hover:text-gold-400/80 transition font-mono">
                  <span>100% Personalizável</span>
                  <span>•</span>
                  <span>Canva</span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-14 p-6 rounded-2xl bg-gold-500/5 border border-gold-500/10 max-w-3xl mx-auto text-center">
            <p className="text-xs md:text-sm text-gold-200 font-light leading-relaxed">
              💡 <strong>Dica Premium:</strong> Não importa qual é a sua especialidade (harmonização, limpeza de pele, massoterapia, micropigmentação ou laser), todos os temas e imagens podem ser adaptados aos seus procedimentos específicos em menos de 2 minutos.
            </p>
          </div>

        </div>
      </section>

      {/* 3ª Seção — Por que escolher nosso material */}
      <section className="py-20 px-4 md:py-28 relative bg-aesthetic-dark overflow-hidden" id="benefits-section">
        {/* Visual Glimmer background */}
        <div className="absolute top-1/2 right-[-200px] w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-semibold uppercase tracking-widest text-gold-500">Benefícios Reais</span>
            <h2 className="text-3xl md:text-5xl font-serif font-semibold tracking-tight text-gold-100">
              Mais praticidade e profissionalismo para o seu perfil
            </h2>
            <p className="text-gray-400 text-sm md:text-base">
              Esqueça a frustração de passar horas tentando criar posts sem obter o visual premium que a sua marca merece. Descubra por que este pack é o investimento ideal:
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="benefits-grid">
            {benefitsData.map((benefit, idx) => (
              <motion.div
                key={benefit.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="p-8 rounded-3xl bg-aesthetic-purple/20 border border-white/5 hover:border-gold-500/20 hover:bg-aesthetic-purple/30 transition-all duration-300 space-y-4 relative overflow-hidden group"
                id={`benefit-card-${benefit.id}`}
              >
                {/* Thin gold top accent border on hover */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gold-gradient scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

                <div className="w-12 h-12 rounded-xl bg-gold-500/5 border border-gold-500/10 text-gold-400 flex items-center justify-center group-hover:text-gold-300 group-hover:scale-105 transition duration-300">
                  {renderIcon(benefit.iconName, "w-6 h-6")}
                </div>

                <h3 className="font-serif font-bold text-xl text-gold-100 group-hover:text-gold-300 transition">
                  {benefit.title}
                </h3>

                <p className="text-gray-400 text-sm leading-relaxed font-light">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 6ª Seção — Exemplos do material (Carousel) - Rendered here for logical sales-page sequence */}
      <Carousel />

      {/* 4ª Seção — Bônus exclusivos */}
      <section className="py-20 px-4 md:py-28 bg-aesthetic-purple/30 relative border-t border-gold-500/5" id="bonus-section">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-gold-500/5 rounded-full blur-[80px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-semibold uppercase tracking-widest text-gold-500 font-mono font-bold">Presente Especial</span>
            <h2 className="text-3xl md:text-5xl font-serif font-semibold tracking-tight text-gold-100">
              Garanta também um bônus especial
            </h2>
            <p className="text-gray-400 text-sm md:text-base">
              Ao comprar hoje o Pack Estética, você leva de presente um material complementar de alta qualidade, pronto para alavancar sua comunicação digital de ponta a ponta.
            </p>
          </div>

          {/* Bonus Card Centered Layout */}
          <div className="flex justify-center" id="bonus-grid">
            {bonusData.map((bonus, idx) => (
              <motion.div
                key={bonus.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative rounded-3xl p-8 bg-[#130F24] border-2 border-gold-500/20 hover:border-gold-500/50 glow-gold hover:scale-[1.01] transition duration-300 flex flex-col justify-between max-w-md w-full"
                id={`bonus-card-${bonus.id}`}
              >
                {/* Gold Highlight Badge */}
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 text-[9px] font-bold tracking-widest text-aesthetic-dark bg-gold-gradient rounded-full shadow-md uppercase">
                    BÔNUS INCLUSO
                  </span>
                </div>

                <div className="space-y-6">
                  <span className="inline-block text-xs font-mono font-bold text-gold-400 tracking-widest border-b border-gold-500/20 pb-1">
                    {bonus.badge}
                  </span>
                  
                  <h3 className="font-serif font-bold text-2xl text-gold-100 leading-tight">
                    {bonus.title}
                  </h3>
                  
                  <p className="text-gray-300 text-sm leading-relaxed font-light">
                    {bonus.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-gold-300/80 font-mono">
                  <span>Acesso Imediato</span>
                  <span>Grátis</span>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 8ª Seção — Garantia de sete dias */}
      <section className="py-20 px-4 md:py-24 bg-gradient-to-b from-aesthetic-dark to-[#0f0b1e] relative overflow-hidden" id="guarantee-section">
        <div className="max-w-4xl mx-auto relative z-10 p-8 md:p-12 rounded-3xl bg-aesthetic-purple/45 border border-gold-500/15 glow-purple">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-10 text-center md:text-left">
            
            {/* Guarantee Badge Seal - Styled with HTML/CSS beautifully */}
            <div className="relative w-36 h-36 flex-shrink-0 flex items-center justify-center select-none" id="guarantee-seal-logo">
              <div className="absolute inset-0 bg-gold-gradient rounded-full animate-pulse opacity-20 blur-md" />
              <div className="absolute inset-0 border-4 border-double border-gold-500/40 rounded-full" />
              <div className="w-28 h-28 rounded-full bg-gold-gradient text-aesthetic-dark font-serif flex flex-col items-center justify-center border-2 border-white/10 shadow-lg rotate-[-5deg]">
                <span className="text-[9px] uppercase font-bold tracking-widest leading-none">GARANTIA</span>
                <span className="text-3xl font-black leading-none my-1">7</span>
                <span className="text-[10px] uppercase font-extrabold tracking-wider leading-none">DIAS</span>
              </div>
            </div>

            {/* Guarantee Text */}
            <div className="space-y-4">
              <span className="inline-block px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-gold-400 bg-gold-500/10 rounded border border-gold-500/20">
                COMPRA 100% SEGURA
              </span>
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-gold-100">
                Você tem 7 dias para conhecer o material
              </h2>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed font-light">
                Você poderá acessar e analisar o <strong>Pack Estética</strong> com total tranquilidade. Caso perceba que o produto não atende às suas necessidades ou não goste das artes, basta solicitar o reembolso dentro do prazo de 7 dias, conforme as condições informadas no momento da compra. Seu investimento está totalmente protegido.
              </p>
              <div className="flex items-center gap-2 text-gold-400 text-xs font-semibold pt-2 justify-center md:justify-start">
                <ShieldCheck className="w-4.5 h-4.5" />
                <span>Sua compra protegida com garantia incondicional de 7 dias.</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 7ª Seção — Depoimentos */}
      <section className="py-20 px-4 md:py-28 bg-aesthetic-dark relative" id="testimonials-section">
        <div className="max-w-7xl mx-auto relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-semibold uppercase tracking-widest text-gold-500">Histórias de Sucesso</span>
            <h2 className="text-3xl md:text-5xl font-serif font-semibold tracking-tight text-gold-100">
              O que profissionais da estética dizem
            </h2>
            <p className="text-gray-400 text-sm md:text-base">
              Profissionais reais que economizaram tempo e elevaram o patamar visual de suas marcas nas redes sociais.
            </p>
          </div>

          {/* Internal Warning Notice as requested */}
          <div className="mb-10 max-w-2xl mx-auto p-4 rounded-xl bg-yellow-500/5 border border-yellow-500/20 text-yellow-300 text-xs flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 flex-shrink-0 text-yellow-400" />
            <div className="space-y-1">
              <strong className="font-semibold uppercase tracking-wider">Aviso de Publicação (Apenas para o Administrador)</strong>
              <p className="leading-relaxed opacity-90">
                Os depoimentos abaixo são modelos demonstrativos provisórios estruturados para a página. Lembre-se de substituí-los por depoimentos reais, capturas de tela do WhatsApp ou avaliações autênticas enviadas por suas esteticistas e clientes antes de colocar a página em produção.
              </p>
            </div>
          </div>

          {/* Testimonial Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8" id="testimonials-grid">
            {testimonialsData.map((testimonial, idx) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-8 rounded-3xl bg-aesthetic-purple/20 border border-white/5 flex flex-col justify-between relative group"
                id={`testimonial-card-${testimonial.id}`}
              >
                {/* Visual Quote Icon Accent */}
                <span className="absolute top-6 right-8 text-5xl font-serif text-gold-500/10 group-hover:text-gold-500/20 transition-colors pointer-events-none select-none">
                  “
                </span>

                <div className="space-y-4 relative z-10">
                  {/* Stars */}
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-gold-400 text-gold-400" />
                    ))}
                  </div>

                  <p className="text-gray-300 text-sm leading-relaxed italic font-light">
                    “{testimonial.quote}”
                  </p>
                </div>

                {/* Profile Meta info */}
                <div className="mt-8 pt-6 border-t border-white/5 flex items-center gap-4">
                  <img
                    src={testimonial.avatarUrl}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover border border-gold-500/30"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="font-serif font-bold text-sm text-gold-100">
                      {testimonial.name}
                    </h4>
                    <p className="text-[11px] text-gray-500 font-sans tracking-wide">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 5ª Seção — Oferta especial */}
      <section className="py-20 px-4 md:py-28 bg-[#090712] relative overflow-hidden" id="pricing-section">
        {/* Immersive background flares */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-500/5 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-0 right-10 w-96 h-96 bg-purple-900/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10">
          
          <div className="text-center space-y-4 mb-10">
            <span className="text-xs font-semibold uppercase tracking-widest text-gold-400 border border-gold-500/30 px-3 py-1 rounded-full bg-gold-500/10 font-mono">
              ⚡ Decisão Inteligente
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-gold-100 tracking-tight">
              Oferta especial disponível por tempo limitado
            </h2>
            <p className="text-gray-400 text-sm md:text-base max-w-xl mx-auto font-light">
              Adquira agora mesmo e tenha acesso vitalício ao pack completo + bônus pelo menor preço do ano.
            </p>
          </div>

          {/* Premium Ticket Styling Offer Box */}
          <div className="rounded-3xl bg-aesthetic-purple/40 border-2 border-gold-500 glow-gold overflow-hidden relative" id="pricing-offer-box">
            
            {/* Top decorative gold bar */}
            <div className="h-2 w-full bg-gold-gradient" />

            <div className="p-8 md:p-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              
              {/* Left Column - Pricing & Countdown */}
              <div className="md:col-span-6 space-y-6 text-center md:text-left md:border-r md:border-white/10 md:pr-8">
                
                {/* Interactive Countdown Timer */}
                <div className="space-y-2">
                  <p className="text-xs text-gray-400 font-mono tracking-wider uppercase">
                    O PREÇO IRÁ SUBIR EM:
                  </p>
                  
                  <div className="flex items-center justify-center md:justify-start gap-2">
                    <div className="bg-aesthetic-dark px-3 py-2 rounded-lg border border-gold-500/30 font-mono text-xl md:text-2xl font-bold text-gold-400">
                      {formatTime(timeLeft.minutes)}
                      <span className="block text-[8px] text-gray-500 tracking-normal mt-0.5 uppercase">Minutos</span>
                    </div>
                    <span className="text-gold-400 text-xl font-bold animate-pulse">:</span>
                    <div className="bg-aesthetic-dark px-3 py-2 rounded-lg border border-gold-500/30 font-mono text-xl md:text-2xl font-bold text-gold-400">
                      {formatTime(timeLeft.seconds)}
                      <span className="block text-[8px] text-gray-500 tracking-normal mt-0.5 uppercase">Segundos</span>
                    </div>

                    <button 
                      onClick={resetTimerManually}
                      className="ml-3 p-1 rounded hover:bg-white/5 text-gray-500 hover:text-gray-300 text-[10px] font-mono border border-white/5 hover:border-white/10 transition"
                      title="Resetar temporizador para teste de demonstração"
                      id="reset-timer-demo-btn"
                    >
                      Resetar
                    </button>
                  </div>
                  
                  <p className="text-[10px] text-gray-500 italic">
                    * Condição promocional real configurável. Aproveite o lote promocional.
                  </p>
                </div>

                {/* Price Display */}
                <div className="space-y-1">
                  <p className="text-sm text-gray-400 line-through">
                    De: R$ 47,90
                  </p>
                  
                  <div className="flex items-baseline justify-center md:justify-start gap-1">
                    <span className="text-xs text-gray-400 uppercase font-bold mr-1">Por apenas</span>
                    <span className="text-4xl md:text-5xl font-serif font-black text-gold-100 text-gold-gradient">
                      R$ 19,90
                    </span>
                  </div>
                </div>

              </div>

              {/* Right Column - Checklist & CTA */}
              <div className="md:col-span-6 space-y-6">
                
                <ul className="space-y-2.5 text-xs text-gray-300 text-left">
                  {[
                    'Mais de 50 posts editáveis no Canva',
                    'Calendário de conteúdo para 30 dias (Bônus)',
                    'Acesso imediato após a confirmação',
                    'Garantia incondicional de 7 dias',
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <ShieldCheck className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Main CTA Button with discrete pulsing animation */}
                <div className="pt-2">
                  <a
                    href="https://pay.cakto.com.br/32nmdm2_988210"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative w-full py-4.5 rounded-xl bg-gold-gradient text-aesthetic-dark font-black uppercase tracking-wider text-sm shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer animate-pulse-slow flex items-center justify-center gap-2"
                    id="checkout-cta-btn"
                  >
                    Quero o pack agora
                    <ArrowRight className="w-4 h-4" />
                    <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
                      <div className="shimmer absolute inset-0 opacity-40" />
                    </div>
                  </a>
                  
                  <p className="text-[10px] text-gray-400 text-center mt-2.5 flex items-center justify-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-green-500" />
                    Pagamento seguro • Produto digital • Recebimento imediato
                  </p>
                </div>

              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 9ª Seção — Perguntas frequentes (FAQ Accordion) */}
      <section className="py-20 px-4 md:py-28 bg-[#0a0813] relative border-t border-gold-500/5" id="faq-section">
        <div className="max-w-4xl mx-auto relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-semibold uppercase tracking-widest text-gold-500">FAQ</span>
            <h2 className="text-3xl md:text-5xl font-serif font-semibold tracking-tight text-gold-100">
              Perguntas frequentes
            </h2>
            <p className="text-gray-400 text-sm md:text-base">
              Ainda tem dúvidas? Reunimos aqui as respostas para as perguntas mais comuns de nossos clientes.
            </p>
          </div>

          {/* Accordion List */}
          <div className="space-y-4 max-w-3xl mx-auto" id="faq-accordion-list">
            {faqData.map((faq) => {
              const isOpen = activeFaq === faq.id;
              return (
                <div 
                  key={faq.id}
                  className="rounded-2xl bg-aesthetic-purple/20 border border-white/5 overflow-hidden transition-all duration-300"
                  id={`faq-item-${faq.id}`}
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : faq.id)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between text-gold-100 hover:text-gold-300 transition duration-200 gap-4"
                  >
                    <span className="font-serif font-semibold text-base md:text-lg">
                      {faq.question}
                    </span>
                    <div className={`p-1 rounded bg-white/5 text-gold-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <div className="px-6 pb-6 text-sm text-gray-300 leading-relaxed font-light border-t border-white/5 pt-4">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Repeat Button at bottom of FAQ */}
          <div className="mt-16 text-center">
            <button
              onClick={() => scrollToSection('pricing-section')}
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gold-gradient text-aesthetic-dark font-extrabold uppercase tracking-wider text-xs glow-gold hover:scale-[1.02] active:scale-[0.98] transition cursor-pointer"
              id="faq-bottom-cta"
            >
              QUERO GARANTIR MEU PACK AGORA
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <p className="text-[11px] text-gray-500 mt-2.5">
              Acesso instantâneo e vitalício após confirmação
            </p>
          </div>

        </div>
      </section>

      {/* 10ª Seção — Rodapé */}
      <footer className="bg-[#05040a] text-gray-400 py-16 px-4 border-t border-gold-500/10 text-xs" id="main-footer">
        <div className="max-w-7xl mx-auto space-y-10">
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 pb-10 border-b border-white/5">

            <div className="flex flex-wrap justify-center gap-6 text-gray-400 font-medium">
              <a href="#" className="hover:text-gold-400 transition" onClick={(e) => { e.preventDefault(); alert("Esses links são ilustrativos para fins de demonstração da página de vendas."); }}>Termos de Uso</a>
              <a href="#" className="hover:text-gold-400 transition" onClick={(e) => { e.preventDefault(); alert("Esses links são ilustrativos para fins de demonstração da página de vendas."); }}>Política de Privacidade</a>
              <a href="#" className="hover:text-gold-400 transition" onClick={(e) => { e.preventDefault(); alert("Para suporte, envie e-mail para suporte@packestetica.com"); }}>Suporte / Contato</a>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left text-[11px]">
            <p className="text-gray-500">
              © 2026 Pack Estética. Todos os direitos reservados.
            </p>

            <p className="max-w-md text-gray-600 leading-relaxed md:text-right">
              Este é um produto digital distribuído por link de acesso ao Canva. Os resultados práticos de engajamento, seguidores ou faturamento podem variar de acordo com a aplicação individual, frequência de publicação, nicho de atuação e estratégia comercial de cada profissional de estética.
            </p>
          </div>

        </div>
      </footer>

      {/* Checkout Payment Modal */}
      <CheckoutModal 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)} 
        userEmail="italosdacruz1012@gmail.com" 
      />

    </div>
  );
}
