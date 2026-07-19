import { FeatureCard, BenefitItem, BonusItem, TestimonialItem, FAQItem, CarouselSlide } from './types';

export const featuresData: FeatureCard[] = [
  {
    id: 'f1',
    title: 'Mais de 50 posts para o feed',
    iconName: 'LayoutGrid',
  },
  {
    id: 'f2',
    title: 'Artes sobre procedimentos estéticos',
    iconName: 'Sparkles',
  },
  {
    id: 'f3',
    title: 'Posts educativos e informativos',
    iconName: 'BookOpen',
  },
  {
    id: 'f4',
    title: 'Conteúdos para divulgação de serviços',
    iconName: 'Volume2',
  },
  {
    id: 'f5',
    title: 'Posts de interação e engajamento',
    iconName: 'HeartHandshake',
  },
  {
    id: 'f6',
    title: 'Modelos para promoções e chamadas',
    iconName: 'Tag',
  },
  {
    id: 'f7',
    title: 'Arquivos organizados e fáceis de utilizar',
    iconName: 'FolderCheck',
  },
  {
    id: 'f8',
    title: 'Link de acesso aos modelos no Canva',
    iconName: 'ExternalLink',
  },
];

export const benefitsData: BenefitItem[] = [
  {
    id: 'b1',
    title: 'Economize tempo',
    description: 'Não comece todas as publicações do zero. Escolha um modelo pronto, insira suas informações e publique em poucos minutos.',
    iconName: 'Clock',
  },
  {
    id: 'b2',
    title: 'Fortaleça sua imagem profissional',
    description: 'Tenha um feed visualmente organizado, elegante e coerente com a qualidade de alto padrão dos seus serviços de estética.',
    iconName: 'Award',
  },
  {
    id: 'b3',
    title: 'Aumente o engajamento',
    description: 'Publique conteúdos altamente interessantes e mantenha seu perfil ativo com maior frequência sem quebrar a cabeça.',
    iconName: 'TrendingUp',
  },
  {
    id: 'b4',
    title: 'Atraia novos clientes',
    description: 'Apresente seus procedimentos e diferenciais de maneira clara, bonita, sofisticada e altamente persuasiva.',
    iconName: 'Users',
  },
  {
    id: 'b5',
    title: 'Personalize como quiser',
    description: 'Altere textos, imagens, cores e outros elementos para combinar com a paleta de cores e o logotipo da sua marca.',
    iconName: 'Palette',
  },
  {
    id: 'b6',
    title: 'Use mesmo sem saber design',
    description: 'Os modelos foram criados para oferecer uma personalização simples, rápida e 100% intuitiva pelo Canva gratuito ou pro.',
    iconName: 'Smile',
  },
];

export const bonusData: BonusItem[] = [
  {
    id: 'bo1',
    badge: 'BÔNUS 1',
    title: 'Calendário de conteúdo para 30 dias',
    description: 'Um planejamento prático para ajudar o profissional a organizar suas publicações durante o mês e nunca mais ficar sem saber o que postar.',
  },
];

export const testimonialsData: TestimonialItem[] = [
  {
    id: 't1',
    quote: 'Os modelos facilitaram muito a organização do meu perfil. Agora consigo preparar minhas publicações com mais rapidez e manter uma identidade profissional.',
    name: 'Dra. Mariana Silva',
    role: 'Esteticista Avançada',
    rating: 5,
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&h=150&q=80',
  },
  {
    id: 't2',
    quote: 'O material é fácil de editar e ficou perfeito com as cores da minha clínica. Economizei bastante tempo criando meus conteúdos.',
    name: 'Clara Medeiros',
    role: 'Proprietária de Clínica de Estética',
    rating: 5,
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&h=150&q=80',
  },
  {
    id: 't3',
    quote: 'Eu não sabia como organizar meu feed e o pack me ajudou a criar uma apresentação mais bonita e coerente para os meus serviços.',
    name: 'Beatriz Santos',
    role: 'Profissional da Beleza e Micropigmentadora',
    rating: 5,
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150&q=80',
  },
];

export const faqData: FAQItem[] = [
  {
    id: 'faq1',
    question: 'Como receberei o Pack Estética?',
    answer: 'Imediatamente após a confirmação do pagamento, você receberá um e-mail contendo todas as orientações, o link de acesso aos templates e as instruções para abri-los diretamente na sua conta do Canva.',
  },
  {
    id: 'faq2',
    question: 'Preciso ter experiência com o Canva?',
    answer: 'Não. Os modelos são totalmente amigáveis para iniciantes. A personalização é extremamente simples, bastando clicar nos elementos para alterar textos, cores, fontes ou arrastar suas próprias fotos para dentro dos modelos.',
  },
  {
    id: 'faq3',
    question: 'Preciso pagar pelo Canva Pro?',
    answer: 'Não necessariamente. Todos os templates foram projetados e otimizados para funcionar perfeitamente com a conta do Canva gratuito. Caso prefira utilizar imagens premium do próprio Canva, você pode substituí-las por suas próprias imagens ou fotos gratuitas recomendadas no pack.',
  },
  {
    id: 'faq4',
    question: 'Posso personalizar as artes com a identidade da minha clínica?',
    answer: 'Sim, com certeza! Você tem total liberdade de alterar as cores, colocar a sua paleta de cores institucional, escolher novas fontes de texto, adicionar o logotipo da sua clínica, mudar fotos de fundo e incluir suas informações de contato.',
  },
  {
    id: 'faq5',
    question: 'O produto é físico ou digital?',
    answer: 'O Pack Estética é um produto 100% digital. Você receberá o acesso por e-mail para abrir no seu computador ou celular, sem necessidade de frete ou espera por entregas físicas.',
  },
];

export const carouselSlidesData: CarouselSlide[] = [
  {
    id: 'slide1',
    title: 'Protetor solar é o melhor anti-idade',
    subtitle: 'Use protetor solar todos os dias, mesmo em dias nublados. A radiação UV é responsável por 80% do envelhecimento precoce da pele.',
    category: 'DICA DO DIA',
    imageUrl: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=600&q=80',
    colorTheme: 'purple',
  },
  {
    id: 'slide2',
    title: 'Harmonização Facial',
    subtitle: 'Realce sua beleza natural com técnicas minimamente invasivas',
    category: 'Procedimentos',
    imageUrl: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=600&q=80',
    colorTheme: 'purple',
  },
  {
    id: 'slide3',
    title: 'Preenchimento Labial',
    subtitle: 'Volume e contorno natural com ácido hialurônico de última geração. Resultado imediato e duradouro.',
    category: 'Estética Labial',
    imageUrl: 'https://images.unsplash.com/photo-1608248597481-496100c80836?auto=format&fit=crop&w=600&q=80',
    colorTheme: 'dark',
  },
  {
    id: 'slide4',
    title: 'Tratamento Facial Premium',
    subtitle: 'Hidratação profunda + Peeling + LED. Resultados visíveis desde a primeira sessão.',
    category: 'Protocolos',
    imageUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80',
    colorTheme: 'beige',
  },
];
