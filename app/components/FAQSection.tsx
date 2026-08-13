'use client';
import React, { useRef, useState } from 'react';
import { gsap, useGSAP, ScrollTrigger, MOTION, prefersReducedMotion } from '@/lib/gsap';
import GlowCard from './animations/GlowCard';
import ScrollReveal from './animations/ScrollReveal';

const faqCategories = [
  { id: 'general', label: 'General', icon: <svg className="w-4 h-4" viewBox="0 0 512 512" fill="currentColor"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336l24 0 0-64-24 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l48 0c13.3 0 24 10.7 24 24l0 88 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-80 0c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"></path></svg> },
  { id: 'minecraft', label: 'Minecraft', icon: <svg className="w-4 h-4" viewBox="0 0 512 512" fill="currentColor"><path d="M234.5 5.7c13.9-5.3 29.2-5.3 43.1 0l192 73.1C493.5 87.3 512 109.4 512 134.9l0 242.2c0 25.5-18.5 47.6-42.4 56.1l-192 73.1c-13.9 5.3-29.2 5.3-43.1 0l-192-73.1C18.5 424.7 0 402.6 0 377.1l0-242.2c0-25.5 18.5-47.6 42.4-56.1l192-73.1zM256 66.2L96.8 126.9 256 187.6l159.2-60.7L256 66.2zM48 182.4l0 194.7l192 73.1 0-194.7L48 182.4zm256 267.8l192-73.1 0-194.7-192 73.1 0 194.7z"></path></svg> },
  { id: 'juegos', label: 'Juegos', icon: <svg className="w-4 h-4" viewBox="0 0 640 512" fill="currentColor"><path d="M192 64C86 64 0 150 0 256S86 448 192 448l256 0c106 0 192-86 192-192s-86-192-192-192L192 64zM496 168a40 40 0 1 1 0 80 40 40 0 1 1 0-80zM392 304a40 40 0 1 1 80 0 40 40 0 1 1-80 0zM168 200c0-13.3 10.7-24 24-24s24 10.7 24 24l0 32 32 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-32 0 0 32c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-32-32 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l32 0 0-32z"></path></svg> },
  { id: 'dedicado', label: 'Servidor Dedicado', icon: <svg className="w-4 h-4" viewBox="0 0 512 512" fill="currentColor"><path d="M64 32C28.7 32 0 60.7 0 96l0 64c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-64c0-35.3-28.7-64-64-64L64 32zm280 72a24 24 0 1 1 0 48 24 24 0 1 1 0-48zm48 24a24 24 0 1 1 48 0 24 24 0 1 1-48 0zM64 288c-35.3 0-64 28.7-64 64l0 64c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-64c0-35.3-28.7-64-64-64L64 288zm280 72a24 24 0 1 1 0 48 24 24 0 1 1 0-48zm48 24a24 24 0 1 1 48 0 24 24 0 1 1-48 0z"></path></svg> }
];

const faqs = {
  general: [
    {
      q: '¿Qué métodos de pago aceptan?',
      a: 'Aceptamos tarjetas de crédito/débito, PayPal, MercadoPago, transferencia bancaria, y criptomonedas. También aceptamos pagos en pesos argentinos (ARS) y dólares (USD).'
    },
    {
      q: 'Actualmente estoy con otro host, ¿Puedo migrarme a AstralixNodes?',
      a: 'Por supuesto, ofrecemos migración gratuita. Nuestro equipo de soporte se encargará de transferir todos tus archivos, mundos, plugins y configuraciones sin tiempo de inactividad.'
    },
    {
      q: '¿Qué plan debería elegir?',
      a: 'Depende de tus necesidades. Para un servidor vanilla con 5-10 jugadores, recomendamos 2GB. Para modpacks ligeros 4GB, y para modpacks pesados como ATM o RLCraft, 6-8GB. Nuestro soporte puede ayudarte a elegir.'
    },
    {
      q: '¿Podré subir o bajar mi plan luego de comprar?',
      a: 'Absolutamente, todo desde el área de clientes. Simplemente abre un ticket de soporte si no encuentras la manera de hacerlo o necesitas una recomendación.'
    },
    {
      q: '¿Porque debería elegir AstralixNodes?',
      a: 'Puedes elegir el proveedor que quieras, pero creemos que somos tu mejor opción: soporte en español con experiencia, precios accesibles sin publicidad, comunidad activa en Discord y hardware potente para un rendimiento fluido, alojando el servidor de cientos de creadores de contenido :)'
    }
  ],
  minecraft: [
    {
      q: '¿Tienen soporte para Bedrock o Geyser?',
      a: 'Sí, soportamos servidores Bedrock nativos y también puedes usar GeyserMC en servidores Java para permitir la conexión de jugadores de Bedrock (Crossplay).'
    }
  ],
  juegos: [
    {
      q: '¿Ofrecen servidores para otros juegos?',
      a: 'Sí, ofrecemos servidores para Rust, ARK, Terraria, Palworld, CS:GO, GMod, y muchos otros. Puedes ver la lista completa en la sección de juegos.'
    }
  ],
  dedicado: [
    {
      q: '¿Cuál es la diferencia de los planes dedicados?',
      a: 'Los planes dedicados ofrecen recursos garantizados (CPU y RAM) que no se comparten con otros usuarios, ideal para servidores grandes con cientos de jugadores.'
    }
  ]
};

interface AccordionItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

const AccordionItem = ({ question, answer, isOpen, onToggle }: AccordionItemProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (prefersReducedMotion()) {
      gsap.set(contentRef.current, { height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 });
      return;
    }

    gsap.to(contentRef.current, {
      height: isOpen ? 'auto' : 0,
      opacity: isOpen ? 1 : 0,
      duration: 0.35,
      ease: MOTION.ease.smooth,
    });
  }, { dependencies: [isOpen] });

  return (
    <div 
      ref={containerRef}
      className={`rounded-xl transition-all duration-300 border ${isOpen ? 'bg-[#140528]/80 border-[#9000FA]/30 shadow-[0_0_20px_rgba(144,0,250,0.1)]' : 'bg-[#0a0118]/60 border-white/5 hover:border-[#9000FA]/20 hover:bg-[#140528]/40'}`}
    >
      <button 
        onClick={onToggle}
        className="w-full px-6 py-5 flex justify-between items-center text-left gap-4 cursor-pointer"
      >
        <h3 className={`font-bold text-sm md:text-base transition-colors duration-300 ${isOpen ? 'text-[#c084fc]' : 'text-white/80'}`}>{question}</h3>
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-[#9000FA] text-white shadow-[0_0_12px_rgba(144,0,250,0.4)] rotate-45' : 'bg-white/5 text-white/40'}`}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"></path>
          </svg>
        </div>
      </button>
      <div 
        ref={contentRef}
        className="overflow-hidden"
        style={{ height: 0, opacity: 0 }}
      >
        <p className="text-white/60 text-sm md:text-base pb-6 px-6 pl-6 md:pl-8 leading-relaxed border-t border-white/5 pt-4">
          {answer}
        </p>
      </div>
    </div>
  );
};

export default function FaqSection() {
  const container = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState('general');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0); // first open by default

  useGSAP(() => {
    gsap.fromTo('.faq-reveal',
      { opacity: 0, y: 25, filter: 'blur(4px)' },
      { 
        opacity: 1, 
        y: 0, 
        filter: 'blur(0px)',
        duration: 0.8, 
        stagger: 0.12,
        ease: MOTION.ease.out,
        scrollTrigger: {
          trigger: container.current,
          start: 'top 80%'
        }
      }
    );
  }, { scope: container });

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  const handleCategoryChange = (id: string) => {
    setActiveCategory(id);
    setOpenFaqIndex(0); // auto-open first item on category change
  };

  const currentFaqs = faqs[activeCategory as keyof typeof faqs] || [];

  return (
    <section ref={container} className="bg-[#0e0320] py-24 px-6 relative overflow-hidden section-glow-top">
      {/* Background decoration */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-[#9000FA]/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="faq-reveal text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-[0.03em] mb-4">
            Preguntas <span className="text-[#9000FA] glow-text">Frecuentes</span>
          </h2>
          <p className="text-white/50 text-sm md:text-base">
            Encuentra respuestas rápidas a las dudas más comunes
          </p>
        </div>

        {/* Category Pills Selector */}
        <div className="faq-reveal flex justify-center gap-2 mb-12 flex-wrap">
          {faqCategories.map(cat => {
            const isSelected = activeCategory === cat.id;
            return (
              <button 
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-full text-xs md:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer border ${
                  isSelected 
                    ? 'bg-[#9000FA] border-[#9000FA] text-white shadow-[0_0_15px_rgba(144,0,250,0.35)]' 
                    : 'bg-[#0a0118]/60 border-white/5 text-white/50 hover:bg-[#140528]/40 hover:text-white'
                }`}
              >
                <span className={isSelected ? 'text-white' : 'text-[#9000FA]'}>{cat.icon}</span>
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Accordions */}
        <div className="space-y-3 faq-reveal">
          {currentFaqs.map((faq, idx) => (
            <AccordionItem 
              key={idx}
              question={faq.q}
              answer={faq.a}
              isOpen={openFaqIndex === idx}
              onToggle={() => toggleFaq(idx)}
            />
          ))}
        </div>

        {/* Support Section Footer */}
        <div className="faq-reveal flex flex-col sm:flex-row items-center justify-center gap-6 mt-16 pt-8 border-t border-white/5">
          <a className="inline-flex items-center gap-2.5 bg-[#9000FA] hover:bg-[#7000C8] text-white font-bold px-6 py-3.5 rounded-xl transition-all duration-300 text-sm shadow-[0_0_20px_rgba(144,0,250,0.2)] hover:shadow-[0_0_35px_rgba(144,0,250,0.4)] btn-shine" href="/contacto#opciones">
            <svg viewBox="0 0 512 512" fill="currentColor" className="w-4 h-4">
              <path d="M214.7 169.5c12.5-6 26.5-9.5 41.3-9.5s28.8 3.5 41.3 9.5L412.8 53.9C369.5 20.3 315.2 0 256 0S142.5 20.3 99.2 53.9l115.5 115.6zm-45.2 127.8c-6-12.5-9.5-26.5-9.5-41.3s3.5-28.8 9.5-41.3L53.9 99.2C20.3 142.5 0 196.8 0 256s20.3 113.5 53.9 156.8l115.6-115.5zM458.1 99.2 342.5 214.7c6 12.5 9.5 26.5 9.5 41.3s-3.5 28.8-9.5 41.3l115.6 115.5C491.7 369.5 512 315.2 512 256s-20.3-113.5-53.9-156.8zM297.3 342.5c-12.5 6-26.5 9.5-41.3 9.5s-28.8-3.5-41.3-9.5L99.2 458.1C142.5 491.7 196.8 512 256 512s113.5-20.3 156.8-53.9L297.3 342.5z" opacity=".4"></path>
              <path d="M57.4 57.4c-12.5 12.5-12.5 32.8 0 45.3l112 112a96.65 96.65 0 0 1 45.3-45.3l-112-112c-12.5-12.5-32.8-12.5-45.3 0zm112 240-112 112c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l112-112a96.65 96.65 0 0 1-45.3-45.3zm128 45.3 112 112c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-112-112a96.65 96.65 0 0 1-45.3 45.3zm45.3-128 112-112c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-112 112a96.65 96.65 0 0 1 45.3 45.3z"></path>
            </svg>
            Entra en contacto
          </a>
          <div className="flex items-center gap-2">
            <span className="text-white font-bold text-sm">Soporte <span className="text-[#9000FA] glow-text">24/7/365</span></span>
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[#4ade80] opacity-75 animate-ping"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#4ade80]"></span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
