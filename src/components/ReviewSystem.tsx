import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, MessageSquare, Check, Trash2, ShieldCheck, Heart, User } from 'lucide-react';
import { TestimonialItem } from '../types';
import { testimonialsData } from '../data';

const STORAGE_KEY = 'aesthetic_pack_client_reviews_v1';

export default function ReviewSystem() {
  const [reviews, setReviews] = useState<TestimonialItem[]>([]);
  const [showForm, setShowForm] = useState(false);
  
  // Form State
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [quote, setQuote] = useState('');
  const [avatarStyle, setAvatarStyle] = useState('gold');
  const [successMsg, setSuccessMsg] = useState(false);

  // Load reviews on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setReviews(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Erro ao ler avaliações salvas:', e);
    }
  }, []);

  // Save reviews
  const saveReviews = (updated: TestimonialItem[]) => {
    setReviews(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Erro ao salvar avaliações:', e);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !role.trim() || !quote.trim()) {
      return;
    }

    const newReview: TestimonialItem = {
      id: `user-review-${Date.now()}`,
      name: name.trim(),
      role: role.trim(),
      quote: quote.trim(),
      rating,
      avatarUrl: avatarStyle, // We use this string to determine background style in our render
    };

    const updated = [newReview, ...reviews];
    saveReviews(updated);

    // Reset Form
    setName('');
    setRole('');
    setQuote('');
    setRating(5);
    setSuccessMsg(true);
    setTimeout(() => {
      setSuccessMsg(false);
      setShowForm(false);
    }, 2500);
  };

  const handleDelete = (id: string) => {
    const updated = reviews.filter((r) => r.id !== id);
    saveReviews(updated);
  };

  // Combine testimonialsData with client reviews from localStorage
  const allReviews = [...reviews, ...testimonialsData];

  // Calculations for stats
  const totalReviews = allReviews.length;
  const averageRating = (
    allReviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
  ).toFixed(1);

  // Distribution calculation
  const distribution = [0, 0, 0, 0, 0]; // 1 to 5 stars
  allReviews.forEach((r) => {
    if (r.rating >= 1 && r.rating <= 5) {
      distribution[r.rating - 1]++;
    }
  });

  const ratingPhrases: Record<number, string> = {
    5: 'Excelente — Recomendo muito!',
    4: 'Muito bom — Alta qualidade',
    3: 'Bom — Atendeu minhas expectativas',
    2: 'Regular — Pode melhorar',
    1: 'Ruim — Não gostei',
  };

  // Render initials or background for the avatar
  const renderAvatar = (review: TestimonialItem) => {
    const initials = review.name
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();

    // Check if the avatarUrl is one of our custom style tags
    if (review.avatarUrl === 'gold') {
      return (
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold-300 via-gold-500 to-gold-600 flex items-center justify-center border border-gold-400/30 text-aesthetic-dark font-serif font-black text-sm tracking-wider">
          {initials}
        </div>
      );
    }
    if (review.avatarUrl === 'rose') {
      return (
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#fbc2eb] to-[#a6c1ee] flex items-center justify-center border border-pink-400/20 text-[#3a3d52] font-serif font-black text-sm tracking-wider">
          {initials}
        </div>
      );
    }
    if (review.avatarUrl === 'purple') {
      return (
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#84fab0] to-[#8fd3f4] flex items-center justify-center border border-teal-400/20 text-[#213547] font-serif font-black text-sm tracking-wider">
          {initials}
        </div>
      );
    }
    if (review.avatarUrl === 'luxury') {
      return (
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#30cfd0] to-[#33086f] flex items-center justify-center border border-purple-400/20 text-white font-serif font-black text-sm tracking-wider">
          {initials}
        </div>
      );
    }

    // Default image url
    return (
      <img
        src={review.avatarUrl}
        alt={review.name}
        className="w-12 h-12 rounded-full object-cover border border-gold-500/30"
        referrerPolicy="no-referrer"
        onError={(e) => {
          // Fallback if image fails to load
          const target = e.target as HTMLElement;
          target.style.display = 'none';
          const sibling = target.nextSibling as HTMLElement;
          if (sibling) sibling.style.display = 'flex';
        }}
      />
    );
  };

  const renderFallbackAvatar = (review: TestimonialItem) => {
    const initials = review.name
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
    return (
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold-400 to-amber-600 flex items-center justify-center border border-gold-500/30 text-aesthetic-dark font-serif font-bold text-sm tracking-wider">
        {initials}
      </div>
    );
  };

  return (
    <div className="space-y-12" id="client-reviews-container">
      {/* Dynamic Statistics Block */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 bg-aesthetic-purple/10 border border-gold-500/10 p-8 rounded-3xl" id="review-stats-card">
        {/* Average Stars Column */}
        <div className="md:col-span-4 flex flex-col items-center justify-center text-center space-y-3 p-4 border-b md:border-b-0 md:border-r border-white/5">
          <span className="text-gray-400 font-sans text-xs uppercase tracking-wider font-semibold">Avaliação Geral</span>
          <div className="flex items-baseline gap-2">
            <span className="text-6xl font-serif font-black text-gold-100 text-gold-gradient">{averageRating}</span>
            <span className="text-gray-500 text-sm">/ 5.0</span>
          </div>
          <div className="flex gap-1 justify-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-5 h-5 ${
                  star <= Math.round(parseFloat(averageRating))
                    ? 'fill-gold-400 text-gold-400'
                    : 'text-gray-600'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-400 font-light flex items-center gap-1.5 justify-center">
            <Check className="w-3.5 h-3.5 text-green-500" /> Based on {totalReviews} reviews
          </span>
        </div>

        {/* Breakdown Bars Column */}
        <div className="md:col-span-5 flex flex-col justify-center space-y-2 p-2">
          {[5, 4, 3, 2, 1].map((stars) => {
            const count = distribution[stars - 1];
            const percent = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
            return (
              <div key={stars} className="flex items-center gap-3 text-xs">
                <span className="w-3 font-medium text-gray-400 text-right">{stars}</span>
                <Star className="w-3.5 h-3.5 fill-gold-400 text-gold-400 flex-shrink-0" />
                <div className="flex-1 h-2 bg-black/40 rounded-full overflow-hidden border border-white/5">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percent}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="h-full bg-gold-gradient rounded-full"
                  />
                </div>
                <span className="w-12 text-gray-400 text-right font-mono">{percent.toFixed(0)}%</span>
              </div>
            );
          })}
        </div>

        {/* Action Button Column */}
        <div className="md:col-span-3 flex flex-col items-center justify-center p-4">
          <p className="text-xs text-gray-400 text-center mb-4 leading-relaxed font-light">
            Já adquiriu o Pack Estética? Compartilhe sua experiência e ajude outros profissionais!
          </p>
          <button
            onClick={() => {
              setShowForm(!showForm);
              setSuccessMsg(false);
            }}
            className="w-full py-3.5 px-5 rounded-xl bg-gold-gradient text-aesthetic-dark font-black text-xs uppercase tracking-wider shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
            id="write-review-btn"
          >
            <MessageSquare className="w-4 h-4" />
            {showForm ? 'Fechar Formuário' : 'Avaliar Produto'}
          </button>
        </div>
      </div>

      {/* Slide-down Interactive Review Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="overflow-hidden"
            id="interactive-review-form"
          >
            <form
              onSubmit={handleSubmit}
              className="bg-[#0c0a18] border border-gold-500/20 rounded-3xl p-6 md:p-8 space-y-6 shadow-[0_0_50px_rgba(212,175,55,0.03)]"
            >
              <div className="border-b border-white/5 pb-4">
                <h3 className="font-serif text-xl font-bold text-gold-100 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-gold-400 animate-pulse" /> Deixe sua Avaliação Sincera
                </h3>
                <p className="text-gray-400 text-xs mt-1 font-light">
                  Sua opinião é de extrema importância para continuarmos elevando a qualidade do nosso material.
                </p>
              </div>

              {/* Success Message Cover */}
              {successMsg ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 flex flex-col items-center justify-center text-center space-y-4"
                >
                  <div className="w-16 h-16 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400">
                    <ShieldCheck className="w-10 h-10 animate-bounce" />
                  </div>
                  <h4 className="font-serif text-2xl font-bold text-gold-100">Avaliação Enviada com Sucesso!</h4>
                  <p className="text-gray-400 text-sm max-w-md font-light">
                    Sua avaliação foi registrada e já está visível para a nossa comunidade de profissionais. Muito obrigado!
                  </p>
                </motion.div>
              ) : (
                <div className="space-y-6">
                  {/* Rating Selector */}
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400">
                      Sua Nota para o Produto
                    </label>
                    <div className="flex items-center gap-3">
                      <div className="flex gap-1.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(null)}
                            className="p-1 cursor-pointer transition-transform duration-100 hover:scale-110 active:scale-95"
                          >
                            <Star
                              className={`w-8 h-8 transition-colors ${
                                star <= (hoverRating !== null ? hoverRating : rating)
                                  ? 'fill-gold-400 text-gold-400'
                                  : 'text-gray-700'
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                      <span className="text-sm font-medium text-gold-300 font-serif">
                        {ratingPhrases[rating]}
                      </span>
                    </div>
                  </div>

                  {/* Input Fields Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="review-name-input" className="block text-xs font-semibold uppercase tracking-wider text-gray-400">
                        Nome Completo
                      </label>
                      <input
                        id="review-name-input"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ex: Dra. Juliana Costa"
                        className="w-full px-4 py-3.5 rounded-xl bg-black/40 border border-white/10 text-gray-200 placeholder-gray-500 text-sm focus:border-gold-500/40 focus:outline-none focus:ring-1 focus:ring-gold-500/20 transition-all"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="review-role-input" className="block text-xs font-semibold uppercase tracking-wider text-gray-400">
                        Profissão / Especialidade
                      </label>
                      <input
                        id="review-role-input"
                        type="text"
                        required
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        placeholder="Ex: Biomédica Esteta / Dona de Clínica"
                        className="w-full px-4 py-3.5 rounded-xl bg-black/40 border border-white/10 text-gray-200 placeholder-gray-500 text-sm focus:border-gold-500/40 focus:outline-none focus:ring-1 focus:ring-gold-500/20 transition-all"
                      />
                    </div>
                  </div>

                  {/* Comment Textarea */}
                  <div className="space-y-2">
                    <label htmlFor="review-quote-input" className="block text-xs font-semibold uppercase tracking-wider text-gray-400">
                      Sua Opinião / Comentário sobre os Modelos
                    </label>
                    <textarea
                      id="review-quote-input"
                      required
                      rows={4}
                      value={quote}
                      onChange={(e) => setQuote(e.target.value)}
                      placeholder="Conte para nós como o Pack Estética te ajudou ou o que você achou das artes editáveis..."
                      className="w-full px-4 py-3.5 rounded-xl bg-black/40 border border-white/10 text-gray-200 placeholder-gray-500 text-sm focus:border-gold-500/40 focus:outline-none focus:ring-1 focus:ring-gold-500/20 transition-all resize-none"
                    />
                  </div>

                  {/* Avatar Style Selector */}
                  <div className="space-y-3">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400">
                      Escolha o Estilo do seu Perfil
                    </label>
                    <div className="flex flex-wrap gap-4 items-center">
                      {[
                        { id: 'gold', label: 'Ouro Real', bg: 'from-gold-300 via-gold-500 to-gold-600' },
                        { id: 'rose', label: 'Rosa Quartz', bg: 'from-[#fbc2eb] to-[#a6c1ee]' },
                        { id: 'purple', label: 'Acqua Pearl', bg: 'from-[#84fab0] to-[#8fd3f4]' },
                        { id: 'luxury', label: 'Deep Lux', bg: 'from-[#30cfd0] to-[#33086f]' },
                      ].map((style) => (
                        <button
                          key={style.id}
                          type="button"
                          onClick={() => setAvatarStyle(style.id)}
                          className={`flex items-center gap-2 px-3 py-2 rounded-xl border transition-all duration-200 cursor-pointer ${
                            avatarStyle === style.id
                              ? 'border-gold-500 bg-gold-500/5'
                              : 'border-white/10 bg-black/20 hover:border-white/20'
                          }`}
                        >
                          <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${style.bg} border border-white/10`} />
                          <span className="text-xs font-medium text-gray-300">{style.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end pt-2">
                    <button
                      type="submit"
                      className="py-3.5 px-8 rounded-xl bg-gold-gradient text-aesthetic-dark font-black text-sm uppercase tracking-wider shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                    >
                      Enviar Minha Avaliação
                    </button>
                  </div>
                </div>
              )}
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Render All Reviews (Both pre-existing and user-added) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8" id="testimonials-grid-enhanced">
        {allReviews.map((testimonial, idx) => {
          const isUserAdded = testimonial.id.startsWith('user-review-');
          return (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: Math.min(idx * 0.1, 0.4) }}
              className="p-8 rounded-3xl bg-aesthetic-purple/20 border border-white/5 flex flex-col justify-between relative group shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-sm hover:border-gold-500/10 transition-colors"
              id={`testimonial-card-${testimonial.id}`}
            >
              {/* Visual Quote Icon Accent */}
              <span className="absolute top-6 right-8 text-5xl font-serif text-gold-500/10 group-hover:text-gold-500/20 transition-colors pointer-events-none select-none">
                “
              </span>

              {/* Verified buyer badge or delete action */}
              <div className="absolute top-6 left-8 flex items-center gap-1.5">
                {isUserAdded ? (
                  <button
                    onClick={() => handleDelete(testimonial.id)}
                    className="p-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-colors cursor-pointer"
                    title="Excluir minha avaliação"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <div className="px-2 py-0.5 rounded bg-gold-500/10 border border-gold-500/20 text-[9px] font-bold text-gold-400 uppercase tracking-wider flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-gold-400" /> Compra Verificada
                  </div>
                )}
              </div>

              <div className="space-y-4 relative z-10 pt-6">
                {/* Stars */}
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < testimonial.rating
                          ? 'fill-gold-400 text-gold-400'
                          : 'text-gray-700'
                      }`}
                    />
                  ))}
                </div>

                <p className="text-gray-300 text-sm leading-relaxed italic font-light">
                  “{testimonial.quote}”
                </p>
              </div>

              {/* Profile Meta info */}
              <div className="mt-8 pt-6 border-t border-white/5 flex items-center gap-4">
                <div className="relative">
                  {renderAvatar(testimonial)}
                  {/* Secondary hidden fallback inside DOM to guarantee graceful rendering */}
                  <div className="hidden" style={{ display: 'none' }}>
                    {renderFallbackAvatar(testimonial)}
                  </div>
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm text-gold-100 flex items-center gap-1.5">
                    {testimonial.name}
                  </h4>
                  <p className="text-[11px] text-gray-500 font-sans tracking-wide">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
