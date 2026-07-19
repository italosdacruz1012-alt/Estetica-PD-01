export interface BenefitItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface FeatureCard {
  id: string;
  title: string;
  iconName: string;
}

export interface BonusItem {
  id: string;
  badge: string;
  title: string;
  description: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  name: string;
  role: string;
  rating: number;
  avatarUrl: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface CarouselSlide {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  imageUrl: string;
  colorTheme: 'beige' | 'purple' | 'dark';
}
