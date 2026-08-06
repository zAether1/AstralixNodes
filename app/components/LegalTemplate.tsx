'use client';
import React, { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import gsap from 'gsap';

interface LegalTemplateProps {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}

export default function LegalTemplate({ title, lastUpdated, children }: LegalTemplateProps) {
  useEffect(() => {
    gsap.fromTo('.legal-content', 
      { y: 30, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
    );
  }, []);

  return (
    <div className="bg-[#020202] min-h-screen text-[#888]">
      <Navbar />
      
      <div className="pt-40 pb-20 px-6 max-w-4xl mx-auto legal-content">
        <h1 className="text-4xl md:text-5xl font-black text-white mb-4 uppercase">{title}</h1>
        <p className="text-sm font-bold text-[#64189D] mb-12 tracking-widest uppercase">Última actualización: {lastUpdated}</p>
        
        <div className="prose prose-invert prose-p:leading-relaxed prose-h2:text-white prose-h2:font-bold prose-h2:mt-10 prose-a:text-[#64189D] max-w-none">
          {children}
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
