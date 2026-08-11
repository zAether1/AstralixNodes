'use client';
import React, { useEffect } from 'react';
import Image from 'next/image';
import Navbar from './Navbar';
import Footer from './Footer';
import Price from './Price';
import ComingSoonBlock from './ComingSoonBlock';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface CloudPlan {
  name: string;
  price: string;
  features: string[];
  pid: string;
  popular?: boolean;
}

interface ComingSoonConfig {
  title?: string;
  description: string;
  note?: string;
  hidePlans?: boolean;
  heroCtaText?: string;
  heroCtaHref?: string;
}

interface CloudHostingTemplateProps {
  title: string;
  subtitle: string;
  bgImage: string;
  description: string;
  plans: CloudPlan[];
  benefits: { title: string; desc: string; icon: React.ReactNode }[];
  comingSoon?: ComingSoonConfig;
}

export default function CloudHostingTemplate({ title, subtitle, bgImage, description, plans, benefits, comingSoon }: CloudHostingTemplateProps) {
  useEffect(() => {
    gsap.fromTo('.ch-hero-text', 
      { y: 50, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'power3.out' }
    );
    
    const cards = gsap.utils.toArray('.ch-plan-card');
    cards.forEach((card: any, i) => {
      gsap.fromTo(card,
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          delay: i * 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 85%' }
        }
      );
    });

    const feats = gsap.utils.toArray('.ch-benefit');
    feats.forEach((feat: any, i) => {
      gsap.fromTo(feat,
        { opacity: 0, x: -30 },
        { 
          opacity: 1, 
          x: 0, 
          duration: 0.8, 
          delay: i * 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: feat, start: 'top 90%' }
        }
      );
    });
  }, []);

  return (
    <div className="bg-[#020202] min-h-screen font-sans">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-40 pb-32 px-6 overflow-hidden min-h-[70vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image 
            src={bgImage} 
            alt={title} 
            fill 
            className="object-cover opacity-30 mix-blend-screen scale-105" 
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#020202]/90 via-[#020202]/60 to-[#020202] z-10" />
        </div>

        <div className="max-w-[87.5rem] mx-auto w-full relative z-20 text-center">
          <div className="max-w-4xl mx-auto flex flex-col items-center">
            <div className="ch-hero-text inline-block px-4 py-2 bg-[#64189D]/20 border border-[#64189D]/30 text-[#64189D] font-bold tracking-widest uppercase text-xs rounded-lg mb-6 backdrop-blur-sm">
              {subtitle}
            </div>
            <h1 className="ch-hero-text text-5xl md:text-7xl lg:text-8xl font-black text-white leading-none tracking-tight uppercase mb-6">
              {title.split(' ').map((word, i, arr) => 
                i === arr.length - 1 ? <span key={i} className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#64189D]">{word}</span> : `${word} `
              )}
            </h1>
            <p className="ch-hero-text text-[#999] text-lg md:text-xl leading-relaxed mb-10 max-w-2xl">
              {description}
            </p>
            <div className="ch-hero-text flex flex-wrap justify-center gap-4">
              <a href={comingSoon?.hidePlans ? (comingSoon?.heroCtaHref ?? '/contacto') : (comingSoon?.heroCtaHref ?? '#planes')} className="bg-[#64189D] hover:bg-[#7b1dc2] transition-colors text-white font-bold py-4 px-8 rounded-xl flex items-center gap-2">
                {comingSoon?.hidePlans ? (comingSoon?.heroCtaText ?? 'Contáctanos') : (comingSoon?.heroCtaText ?? 'Ver Planes')}
              </a>
            </div>

            {comingSoon ? (
              <div className="mt-12 max-w-4xl mx-auto">
                <ComingSoonBlock
                  title={comingSoon.title}
                  description={comingSoon.description}
                  note={comingSoon.note}
                />
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {comingSoon?.hidePlans ? null : (
        <section id="planes" className="py-24 px-6 relative z-20 bg-[#020202]">
          <div className="max-w-[87.5rem] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {plans.map((plan, idx) => (
                <div key={idx} className="ch-plan-card bg-[#141414] border border-white/5 rounded-2xl p-8 relative overflow-hidden group hover:border-[#64189D]/50 transition-all duration-300 flex flex-col h-full">
                  {plan.popular && (
                    <div className="absolute top-0 inset-x-0 bg-[#64189D] text-white text-xs font-black tracking-wider uppercase py-1.5 text-center z-10">
                      Recomendado
                    </div>
                  )}
                  
                  <div className="mb-6 mt-4">
                    <h3 className="text-2xl font-black text-white mb-2">{plan.name}</h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-black text-white"><Price eur={parseFloat(String(plan.price).replace(',','.'))} /></span>
                      <span className="text-[#666] text-sm">/mes</span>
                    </div>
                  </div>

                  <ul className="space-y-4 mb-8 flex-1">
                    {plan.features.map((feat, fidx) => (
                      <li key={fidx} className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-[#64189D] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                        <span className="text-[#bbb] text-sm leading-relaxed">{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <a href={`https://clientes.astralixnodes.com/cart.php?a=add&pid=${plan.pid}`} className="block w-full text-center bg-white/5 hover:bg-[#64189D] border border-white/10 hover:border-transparent text-white font-bold py-3 rounded-xl transition-all mt-auto">
                    Desplegar Ahora
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {comingSoon?.hidePlans ? null : (
        <>
          {/* Benefits */}
          <section className="py-24 px-6 bg-[#0a0a0a] border-t border-white/5 relative z-20">
            <div className="max-w-[87.5rem] mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight">Infraestructura <span className="text-[#64189D]">Premium</span></h2>
                <p className="text-[#888] mt-4 max-w-2xl mx-auto text-lg">
                  Soluciones empresariales diseñadas para alta disponibilidad y máxima seguridad.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {benefits.map((feat, idx) => (
                  <div key={idx} className="ch-benefit bg-black/40 border border-white/5 rounded-2xl p-8 hover:border-[#64189D]/30 transition-all">
                    <div className="w-14 h-14 rounded-xl bg-[#64189D]/20 flex items-center justify-center mb-6 text-[#64189D]">
                      {feat.icon}
                    </div>
                    <h4 className="text-white text-xl font-bold mb-3">{feat.title}</h4>
                    <p className="text-[#888] leading-relaxed">{feat.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      <Footer />
    </div>
  );
}
