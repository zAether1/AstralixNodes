"use client";
import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import FeaturesHighlights from './components/FeaturesHighlights';
import PriceComparison from './components/PriceComparison';
import AstralixPanelShowcase from './components/AstralixPanelShowcase';
import ReviewsSection from './components/ReviewsSection';
import LocationsSection from './components/LocationsSection';
import StatsSection from './components/StatsSection';
import FaqSection from './components/FAQSection';
import CtaSection from './components/CtaSection';
import CEOSection from './components/CEOSection';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#020202] text-white">
      <Navbar />
      <HeroSection />
      <FeaturesHighlights />
      <PriceComparison />
      <AstralixPanelShowcase />
      <ReviewsSection />
      <LocationsSection />
      <CEOSection />
      <StatsSection />
      <FaqSection />
      <CtaSection />
      <Footer />
    </main>
  )
}
