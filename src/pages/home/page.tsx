import BenefitsSection from './components/BenefitsSection';
import ContactSection from './components/ContactSection';
import FAQSection from './components/FAQSection';
import FeaturesSection from './components/FeaturesSection';
import GuaranteeSection from './components/GuaranteeSection';
import HeroSection from './components/HeroSection';
import { MainLayout } from '@/layouts';
import ProductGrid from './components/ProductGrid';
import ProductShowcase from './components/ProductShowcase';
import PromotionSection from './components/PromotionSection';
import React from 'react';
import TestimonialsSection from './components/TestimonialsSection';

const HomePage: React.FC = () => {
	return (
		<MainLayout>
			<HeroSection />
			<BenefitsSection />
			<FeaturesSection />
			<ProductGrid />
			<TestimonialsSection />
			<ProductShowcase />
			<PromotionSection />
			<GuaranteeSection />
			<FAQSection />
			<ContactSection />
		</MainLayout>
	);
};

export default HomePage;
