"use client";

import React, { useEffect } from 'react';
import Navbar from "./components/template/Navbar";
import HolySection1 from "./components/holy/HolySection1";
import HolySection2 from "./components/holy/HolySection2";
import HolySection3 from "./components/holy/HolySection3";
import FeaturesSection from "./components/template/FeaturesSection";
import HolySection4 from "./components/holy/HolySection4";
import HolySection5 from "./components/holy/HolySection5";
import HolySection6 from "./components/holy/HolySection6";
import PanelShowcase from "./components/template/PanelShowcase";
import HolySection7 from "./components/holy/HolySection7";
import HolySection8 from "./components/holy/HolySection8";
import HolySection9 from "./components/holy/HolySection9";
import FAQSection from "./components/template/FAQSection";
import HolySection10 from "./components/holy/HolySection10";
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
    <div className="min-h-screen bg-[#180228] text-white">
      <Navbar />
      <HolySection1 />
      <HolySection2 />
      <FeaturesSection />
      <HolySection3 />
      <HolySection4 />
      <HolySection5 />
      <PanelShowcase />
      <HolySection6 />
      <HolySection7 />
      <HolySection8 />
      <HolySection9 />
      <FAQSection />
      <HolySection10 />
      <Footer />
    </div>
  )
}
