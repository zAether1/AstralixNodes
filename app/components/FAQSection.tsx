'use client';
import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const faqCategories = [
  { id: 'general', label: 'General', icon: <svg className="w-4 h-4" viewBox="0 0 512 512" fill="currentColor"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336l24 0 0-64-24 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l48 0c13.3 0 24 10.7 24 24l0 88 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-80 0c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"></path></svg> },
  { id: 'minecraft', label: 'Minecraft', icon: <svg className="w-4 h-4" viewBox="0 0 512 512" fill="currentColor"><path d="M234.5 5.7c13.9-5.3 29.2-5.3 43.1 0l192 73.1C493.5 87.3 512 109.4 512 134.9l0 242.2c0 25.5-18.5 47.6-42.4 56.1l-192 73.1c-13.9 5.3-29.2 5.3-43.1 0l-192-73.1C18.5 424.7 0 402.6 0 377.1l0-242.2c0-25.5 18.5-47.6 42.4-56.1l192-73.1zM256 66.2L96.8 126.9 256 187.6l159.2-60.7L256 66.2zM48 182.4l0 194.7l192 73.1 0-194.7L48 182.4zm256 267.8l192-73.1 0-194.7-192 73.1 0 194.7z"></path></svg> },
  { id: 'juegos', label: 'Juegos', icon: <svg className="w-4 h-4" viewBox="0 0 640 512" fill="currentColor"><path d="M192 64C86 64 0 150 0 256S86 448 192 448l256 0c106 0 192-86 192-192s-86-192-192-192L192 64zM496 168a40 40 0 1 1 0 80 40 40 0 1 1 0-80zM392 304a40 40 0 1 1 80 0 40 40 0 1 1-80 0zM168 200c0-13.3 10.7-24 24-24s24 10.7 24 24l0 32 32 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-32 0 0 32c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-32-32 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l32 0 0-32z"></path></svg> },
  { id: 'dedicado', label: 'Minecraft Dedicado', icon: <svg className="w-4 h-4" viewBox="0 0 512 512" fill="currentColor"><path d="M64 32C28.7 32 0 60.7 0 96l0 64c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-64c0-35.3-28.7-64-64-64L64 32zm280 72a24 24 0 1 1 0 48 24 24 0 1 1 0-48zm48 24a24 24 0 1 1 48 0 24 24 0 1 1-48 0zM64 288c-35.3 0-64 28.7-64 64l0 64c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-64c0-35.3-28.7-64-64-64L64 288zm280 72a24 24 0 1 1 0 48 24 24 0 1 1 0-48zm48 24a24 24 0 1 1 48 0 24 24 0 1 1-48 0z"></path></svg> }
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

export default function FaqSection() {
  const container = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState('general');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0); // first open by default

  useGSAP(() => {
    gsap.fromTo('.faq-reveal',
      { opacity: 0, y: 20 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: container.current,
          start: 'top 80%'
        }
      }
    );
  }, { scope: container });

  const toggleFaq = (idx: number) => {
    if (openFaqIndex === idx) {
      setOpenFaqIndex(null);
    } else {
      setOpenFaqIndex(idx);
    }
  };

  const handleCategoryChange = (id: string) => {
    setActiveCategory(id);
    setOpenFaqIndex(null);
  };

  const currentFaqs = faqs[activeCategory as keyof typeof faqs] || [];

  return (
    <section ref={container} className="bg-[#191919] py-24 px-6">
      <div className="max-w-4xl mx-auto">
        
        <div className="faq-reveal text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-[0.03em] mb-3">
            Preguntas <span className="text-[#64189D]">Frecuentes</span>
          </h2>
          <p className="text-[#888] text-sm">
            Encuentra respuestas rápidas a las dudas más comunes
          </p>
        </div>

        <div className="faq-reveal flex justify-center gap-2 mb-10 flex-wrap">
          {faqCategories.map(cat => (
            <button 
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm transition-all ${
                activeCategory === cat.id 
                  ? 'bg-[#64189D] text-white font-semibold' 
                  : 'bg-[#2a2a2a] text-[#999] hover:bg-[#333] hover:text-white'
              }`}
            >
              {cat.icon}
              {cat.label}
            </button>
          ))}
        </div>

        <div className="space-y-2 faq-reveal">
          {currentFaqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div key={idx} className={`rounded-xl transition-colors ${isOpen ? 'bg-[#242424]' : 'bg-[#1e1e1e] hover:bg-[#242424]'}`}>
                <button 
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-6 py-5 flex justify-between items-center text-left gap-4"
                >
                  <div className="flex items-center gap-3">
                    <h3 className={`font-semibold ${isOpen ? 'text-white' : 'text-[#ccc]'}`}>{faq.q}</h3>
                  </div>
                  <div className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all ${isOpen ? 'bg-[#64189D]' : 'bg-[#2d2e2e]'}`}>
                    <svg className={`w-3.5 h-3.5 transition-colors ${isOpen ? 'text-white' : 'text-[#888]'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d={isOpen ? "M20 12H4" : "M12 4v16m8-8H4"}></path>
                    </svg>
                  </div>
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out`}
                  style={{ maxHeight: isOpen ? '500px' : '0', opacity: isOpen ? 1 : 0 }}
                >
                  <p className="text-[#999] text-sm pb-5 px-6 pl-10 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="faq-reveal flex flex-col sm:flex-row items-center justify-center gap-4 mt-12 pt-8 border-t border-white/[0.06]">
          <a className="inline-flex items-center gap-2.5 bg-[#64189D] hover:bg-[#3A0E5C] text-white font-bold px-6 py-3 rounded-lg transition-colors text-sm" href="/contacto#opciones">
            <svg viewBox="0 0 512 512" fill="currentColor" className="w-4 h-4">
              <path d="M214.7 169.5c12.5-6 26.5-9.5 41.3-9.5s28.8 3.5 41.3 9.5L412.8 53.9C369.5 20.3 315.2 0 256 0S142.5 20.3 99.2 53.9l115.5 115.6zm-45.2 127.8c-6-12.5-9.5-26.5-9.5-41.3s3.5-28.8 9.5-41.3L53.9 99.2C20.3 142.5 0 196.8 0 256s20.3 113.5 53.9 156.8l115.6-115.5zM458.1 99.2 342.5 214.7c6 12.5 9.5 26.5 9.5 41.3s-3.5 28.8-9.5 41.3l115.6 115.5C491.7 369.5 512 315.2 512 256s-20.3-113.5-53.9-156.8zM297.3 342.5c-12.5 6-26.5 9.5-41.3 9.5s-28.8-3.5-41.3-9.5L99.2 458.1C142.5 491.7 196.8 512 256 512s113.5-20.3 156.8-53.9L297.3 342.5z" opacity=".4"></path>
              <path d="M57.4 57.4c-12.5 12.5-12.5 32.8 0 45.3l112 112a96.65 96.65 0 0 1 45.3-45.3l-112-112c-12.5-12.5-32.8-12.5-45.3 0zm112 240-112 112c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l112-112a96.65 96.65 0 0 1-45.3-45.3zm128 45.3 112 112c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-112-112a96.65 96.65 0 0 1-45.3 45.3zm45.3-128 112-112c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-112 112a96.65 96.65 0 0 1 45.3 45.3z"></path>
            </svg>
            Entra en contacto
          </a>
          <div className="flex items-center gap-2">
            <span className="text-white font-bold text-sm">Soporte <span className="text-[#64189D]">24/7/365</span></span>
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[#28ca42] opacity-75 animate-ping"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#28ca42]"></span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
