import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import CategoryIcons from '@/components/sections/CategoryIcons';
import TrustIndicators from '@/components/sections/TrustIndicators';
import ProductGrid from '@/components/sections/ProductGrid';
import FeaturesSection from '@/components/sections/FeaturesSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <CategoryIcons />
        <TrustIndicators />
        <ProductGrid />
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
