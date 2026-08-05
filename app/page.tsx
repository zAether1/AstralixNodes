"use client";

import React, { useEffect } from 'react';
import Navbar from "./components/template/Navbar";
import HeroSection from "./components/template/HeroSection";
import FeaturesSection from "./components/template/FeaturesSection";
import HolySection7 from "./components/holy/HolySection7";
import PanelShowcase from "./components/template/PanelShowcase";
import PricingSection from "./components/template/PricingSection";
import FAQSection from "./components/template/FAQSection";
import Footer from "./components/template/Footer";

export default function Home() {
  useEffect(() => {
    // Basic IntersectionObserver to trigger 'in-view' animations if they exist
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLElement;
          target.classList.add('visible', 'in-view', 'animate-in');
          target.style.opacity = '1';
          target.style.transform = 'none';
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll<HTMLElement>('[style*="opacity: 0"], [style*="opacity:0"]').forEach(el => observer.observe(el));
    
    // Attempt to reveal anything hidden by default
    setTimeout(() => {
      document.querySelectorAll<HTMLElement>('[style*="opacity: 0"], [style*="opacity:0"]').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'none';
        el.style.transition = 'all 0.8s ease-out';
      });
    }, 500);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#180228] transition-colors duration-300">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HolySection7 />
      <PanelShowcase />
      <PricingSection />
      <FAQSection />
      <Footer />
    </div>
  )
}
