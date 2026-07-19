import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle, CreditCard, ShieldCheck, Mail, Sparkles } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  userEmail?: string;
}

export default function CheckoutModal({ isOpen, onClose, userEmail = 'seu-email@exemplo.com' }: CheckoutModalProps) {
  const [step, setStep] = useState<'form' | 'loading' | 'success'>('form');
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'card'>('pix');
  const [formData, setFormData] = useState({
    name: '',
    email: userEmail,
    whatsapp: '',
    cardNumber: '4444 5555 6666 7777',
    cardName: '',
    cardExpiry: '12/30',
    cardCvv: '123'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('loading');
    setTimeout(() => {
      setStep('success');
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-lg overflow-hidden rounded-2xl glass-card border border-gold-500/30 text-white shadow-2xl"
          id="checkout-modal-container"
        >
          {/* Top Decorative Border */}
          <div className="h-1.5 w-full bg-gold-gradient" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition"
            aria-label="Fechar"
            id="close-checkout-modal-btn"
          >
            <X className="w-5 h-5" />
          </button>

          {step === 'form' && (
            <div className="p-6 md:p-8">
              <div className="mb-6">
                <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gold-400 bg-gold-500/10 rounded-full border border-gold-500/20 mb-2">
                  Você está Garantindo Seu Acesso
                </span>
                <h3 className="text-2xl font-serif font-bold text-gold-100">
                  Pack Estética Premium
                </h3>
                <p className="text-sm text-gray-400 mt-1">
                  50+ Posts Editáveis + Todos os Bônus Exclusivos
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-300 uppercase tracking-wider mb-1.5">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Seu nome profissional"
                    className="w-full px-4 py-2.5 rounded-lg bg-aesthetic-indigo/40 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-gold-500 transition text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-300 uppercase tracking-wider mb-1.5">
                    E-mail para Receber o Link
                  </label>
                  <input
                    type="email"
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="nome@exemplo.com"
                    className="w-full px-4 py-2.5 rounded-lg bg-aesthetic-indigo/40 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-gold-500 transition text-sm"
                  />
                  <p className="text-[11px] text-gray-400 mt-1 flex items-center gap-1">
                    <Mail className="w-3 h-3 text-gold-500" />
                    O material será enviado imediatamente para este e-mail.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-300 uppercase tracking-wider mb-1.5">
                    WhatsApp para Suporte
                  </label>
                  <input
                    type="tel"
                    required
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleInputChange}
                    placeholder="(00) 99999-9999"
                    className="w-full px-4 py-2.5 rounded-lg bg-aesthetic-indigo/40 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-gold-500 transition text-sm"
                  />
                </div>

                {/* Payment Selection */}
                <div className="pt-2 border-t border-white/5">
                  <label className="block text-xs font-medium text-gray-300 uppercase tracking-wider mb-3">
                    Método de Pagamento
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('pix')}
                      className={`flex items-center justify-center gap-2 py-3 rounded-xl border font-medium transition text-sm ${
                        paymentMethod === 'pix'
                          ? 'bg-gold-500/10 border-gold-500 text-gold-300'
                          : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                      }`}
                    >
                      <Sparkles className="w-4 h-4" />
                      PIX (Acesso Instantâneo)
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`flex items-center justify-center gap-2 py-3 rounded-xl border font-medium transition text-sm ${
                        paymentMethod === 'card'
                          ? 'bg-gold-500/10 border-gold-500 text-gold-300'
                          : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                      }`}
                    >
                      <CreditCard className="w-4 h-4" />
                      Cartão de Crédito
                    </button>
                  </div>
                </div>

                {paymentMethod === 'card' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="space-y-3 pt-2"
                  >
                    <div>
                      <input
                        type="text"
                        placeholder="Número do Cartão"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded-lg bg-aesthetic-indigo/40 border border-white/10 text-white text-sm"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="Validade (MM/AA)"
                        name="cardExpiry"
                        value={formData.cardExpiry}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded-lg bg-aesthetic-indigo/40 border border-white/10 text-white text-sm"
                      />
                      <input
                        type="text"
                        placeholder="CVV"
                        name="cardCvv"
                        value={formData.cardCvv}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded-lg bg-aesthetic-indigo/40 border border-white/10 text-white text-sm"
                      />
                    </div>
                  </motion.div>
                )}

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-gold-gradient text-aesthetic-dark font-bold uppercase tracking-wider text-sm glow-gold hover:scale-[1.02] active:scale-[0.98] transition duration-200"
                    id="submit-payment-btn"
                  >
                    {paymentMethod === 'pix' ? 'Gerar PIX e Concluir' : 'Confirmar e Finalizar'}
                  </button>
                </div>
              </form>

              <div className="mt-4 flex items-center justify-center gap-4 text-[11px] text-gray-400 border-t border-white/5 pt-4">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-green-500" />
                  Ambiente 100% Seguro
                </span>
                <span>•</span>
                <span>Garantia de 7 dias</span>
                <span>•</span>
                <span>Acesso Imediato</span>
              </div>
            </div>
          )}

          {step === 'loading' && (
            <div className="p-12 text-center flex flex-col items-center justify-center min-h-[350px]">
              <div className="relative w-16 h-16 mb-6">
                <div className="absolute inset-0 rounded-full border-4 border-gold-500/10 border-t-gold-500 animate-spin" />
              </div>
              <h4 className="text-xl font-serif font-bold text-gold-100 mb-2">
                Processando seu Pedido...
              </h4>
              <p className="text-sm text-gray-400 max-w-xs">
                Estamos validando seu cadastro e preparando seu acesso imediato ao Canva.
              </p>
            </div>
          )}

          {step === 'success' && (
            <div className="p-8 text-center min-h-[350px] flex flex-col items-center justify-center">
              <div className="w-16 h-16 bg-green-500/10 text-green-400 border border-green-500/20 rounded-full flex items-center justify-center mb-6">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-serif font-bold text-gold-100 mb-2">
                Parabéns, {formData.name || 'Esteticista'}!
              </h4>
              <p className="text-sm text-green-400 font-medium mb-2">
                Pagamento confirmado com sucesso!
              </p>
              <p className="text-sm text-gray-300 max-w-sm mb-6">
                Enviamos um e-mail para <strong className="text-white">{formData.email}</strong> com seu material e notas fiscais. Você também pode acessar o Canva agora clicando abaixo:
              </p>

              <div className="w-full space-y-3">
                <a
                  href="https://canva.com"
                  target="_blank"
                  referrerPolicy="no-referrer"
                  rel="noopener noreferrer"
                  className="block w-full py-4 rounded-xl bg-gold-gradient text-aesthetic-dark font-bold uppercase tracking-wider text-sm text-center shadow-lg hover:scale-[1.02] active:scale-[0.98] transition"
                  id="canva-access-link"
                >
                  ABRIR PACK NO CANVA (LINK OFICIAL)
                </a>
                <button
                  onClick={() => {
                    setStep('form');
                    onClose();
                  }}
                  className="w-full py-2.5 text-xs text-gray-400 hover:text-white transition"
                  id="close-success-btn"
                >
                  Fechar Janela
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
