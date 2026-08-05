"use client";

import React, { useEffect } from 'react';
import HolyHeaderStatic from "./components/holy/HolyHeaderStatic";
import HolyFooterStatic from "./components/holy/HolyFooterStatic";
import HolySection1 from "./components/holy/HolySection1"
import HolySection3 from "./components/holy/HolySection3"
import HolySection4 from "./components/holy/HolySection4"
import HolySection5 from "./components/holy/HolySection5"
import HolySection6 from "./components/holy/HolySection6"
import HolySection7 from "./components/holy/HolySection7"
import HolySection8 from "./components/holy/HolySection8"
import HolySection9 from "./components/holy/HolySection9"
import HolySection10 from "./components/holy/HolySection10"

import PanelShowcase from "./components/template/PanelShowcase"
import FeaturesSection from "./components/template/FeaturesSection"

export default function Home() {
  useEffect(() => {
    // Basic IntersectionObserver to trigger 'in-view' animations if they exist
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible', 'in-view', 'animate-in');
          (entry.target as HTMLElement).style.opacity = '1';
          (entry.target as HTMLElement).style.transform = 'none';
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('[style*="opacity: 0"], [style*="opacity:0"]').forEach(el => observer.observe(el));
    
    // Attempt to reveal anything hidden by default
    setTimeout(() => {
      document.querySelectorAll('[style*="opacity: 0"], [style*="opacity:0"]').forEach(el => {
        (el as HTMLElement).style.opacity = '1';
        (el as HTMLElement).style.transform = 'none';
        (el as HTMLElement).style.transition = 'all 0.8s ease-out';
      });
    }, 500);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#020202]">
      <HolyHeaderStatic />
      <HolySection1 />
      <HolySection3 />
      <HolySection4 />
      <HolySection5 />
      <HolySection6 />
      <HolySection7 />
      <HolySection8 />
      <HolySection9 />
      <HolySection10 />
      
      {/* Template Sections */}
      <div className="pt-24 pb-12 border-t border-white/5 mt-12 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4 uppercase">Explora Más de AstralixNodes</h2>
          <p className="text-[#999] max-w-2xl mx-auto">Estas son algunas características adicionales que ofrecemos para asegurar el mejor rendimiento.</p>
        </div>
        <PanelShowcase />
        <FeaturesSection />
      </div>

      <HolyFooterStatic />
    </div>
  )
}
