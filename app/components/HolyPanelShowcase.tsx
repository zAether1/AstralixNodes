'use client';
import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const features = [
  {
    id: 'subdomains',
    title: 'SUBDOMINIOS',
    description: 'Crea subdominios más rápido de lo que tardas en decidir qué comer. Tu propia IP con letras, ¡pero sin tener que recordar números complicados!',
    icon: <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"></path></svg>
  },
  {
    id: 'custom_flags',
    title: 'CUSTOM FLAGS',
    description: 'Configura flags de Java para optimizar al máximo el rendimiento de tu servidor, de forma sencilla y rápida.',
    icon: <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24"><path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z"></path></svg>
  },
  {
    id: 'versions',
    title: 'VERSIONES',
    description: 'Cambia la versión de tu servidor con un solo clic. Soportamos Paper, Purpur, Forge, Fabric y muchas más.',
    icon: <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24"><path d="M6 3v6.5c0 .28.22.5.5.5H10v4.5c0 .28.22.5.5.5H14v5h2v-5.5c0-.28-.22-.5-.5-.5H12V9.5c0-.28-.22-.5-.5-.5H8V3H6z"></path></svg>
  },
  {
    id: 'plugins',
    title: 'INSTALADOR DE PLUGINS',
    description: 'Instala plugins de Spigot o Modrinth directamente desde el panel sin necesidad de descargarlos manualmente.',
    icon: <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24"><path d="M20.5 11H19V7c0-1.1-.9-2-2-2h-4V3.5C13 2.12 11.88 1 10.5 1S8 2.12 8 3.5V5H4c-1.1 0-1.99.9-1.99 2v3.8H3.5c1.49 0 2.7 1.21 2.7 2.7s-1.21 2.7-2.7 2.7H2V20c0 1.1.9 2 2 2h3.8v-1.5c0-1.49 1.21-2.7 2.7-2.7 1.49 0 2.7 1.21 2.7 2.7V22H17c1.1 0 2-.9 2-2v-4h1.5c1.38 0 2.5-1.12 2.5-2.5S21.88 11 20.5 11z"></path></svg>
  },
  {
    id: 'mods',
    title: 'MODS Y MODPACKS',
    description: 'Instala modpacks completos de CurseForge con un solo clic y empieza a jugar al instante con tus amigos.',
    icon: <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24"><path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"></path></svg>
  },
  {
    id: 'properties',
    title: 'SERVER PROPERTIES',
    description: 'Edita la configuración principal de tu servidor directamente desde un menú amigable e intuitivo.',
    icon: <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24"><path d="M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z"></path></svg>
  },
  {
    id: 'migrate',
    title: 'MIGRA DE OTRO HOST',
    description: 'Transfiere fácilmente tus archivos desde otro hosting hacia nosotros con nuestra herramienta de migración SFTP.',
    icon: <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path></svg>
  },
  {
    id: 'backups',
    title: 'COPIAS DE SEGURIDAD',
    description: 'Crea copias de seguridad de forma manual o configúralas automáticamente para nunca perder tu progreso.',
    icon: <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24"><path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"></path></svg>
  },
  {
    id: 'database',
    title: 'BASE DE DATOS',
    description: 'Crea bases de datos MySQL al instante para conectar tus plugins de forma segura y eficiente.',
    icon: <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3C7.58 3 4 4.79 4 7v10c0 2.21 3.58 4 8 4s8-1.79 8-4V7c0-2.21-3.58-4-8-4zm0 2c3.87 0 6 1.5 6 2s-2.13 2-6 2-6-1.5-6-2 2.13-2 6-2zM4 17v-2.34c1.37.97 3.54 1.63 6 1.82V19c-3.13-.17-5.33-1.08-6-2zm8 2v-2.52c.33.02.66.02 1 .02s.67 0 1-.02V19h-2zm8-2c-.67.92-2.87 1.83-6 2v-2.52c2.46-.19 4.63-.85 6-1.82V17z"></path></svg>
  },
  {
    id: 'ports',
    title: 'PUERTOS ADICIONALES',
    description: 'Abre puertos adicionales fácilmente para Dynmap, Geyser, VoiceChat y cualquier otro plugin que lo requiera.',
    icon: <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24"><path d="M20 13H4c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h16c.55 0 1-.45 1-1v-6c0-.55-.45-1-1-1zM7 19c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM20 3H4c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h16c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1zM7 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"></path></svg>
  },
  {
    id: 'editor',
    title: 'EDITOR DE ARCHIVOS',
    description: 'Edita cualquier archivo con nuestro potente editor web integrado, incluye resaltado de sintaxis.',
    icon: <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path></svg>
  },
  {
    id: 'console',
    title: 'CONSOLA GENERAL',
    description: 'Controla tu servidor en tiempo real. Visualiza los logs, ejecuta comandos y soluciona problemas.',
    icon: <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24"><path d="M20 18c1.1 0 1.99-.9 1.99-2L22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z"></path></svg>
  }
];

export default function HolyPanelShowcase() {
  const container = useRef<HTMLDivElement>(null);
  const [activeFeature, setActiveFeature] = useState(0);
  const [progress, setProgress] = useState(0);
  const progressInterval = 50; // ms
  const totalDuration = 4000; // 4 seconds per feature

  useGSAP(() => {
    gsap.fromTo('.showcase-reveal', 
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: container.current,
          start: 'top 85%'
        }
      }
    );
  }, { scope: container });

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          setActiveFeature((curr) => (curr + 1) % features.length);
          return 0;
        }
        return prev + (100 / (totalDuration / progressInterval));
      });
    }, progressInterval);

    return () => clearInterval(timer);
  }, []);

  const handleSelect = (index: number) => {
    setActiveFeature(index);
    setProgress(0);
  };

  const feature = features[activeFeature];

  return (
    <section id="panelshowcase" ref={container} className="bg-[#101010] py-24 px-6">
      <div className="max-w-[87.5rem] mx-auto">
        <div className="showcase-reveal text-center mb-4">
          <h2 className="text-4xl md:text-5xl font-black uppercase leading-tight">
            <span className="text-white">UN </span>
            <span className="text-[#64189D]">PANEL</span>
            <span className="text-white"> QUE SIMPLEMENTE </span>
            <span className="inline-block bg-[#64189D] text-white px-5 py-0.5 rounded-md ml-1">FUNCIONA</span>
          </h2>
        </div>
        
        <p className="showcase-reveal text-[#888] text-center text-sm max-w-3xl mx-auto mb-10">
          Un panel de control rápido, claro y potente que te simplifica todo desde el primer clic.
        </p>

        <div className="showcase-reveal flex flex-col lg:flex-row gap-10 relative">
          
          <div className="lg:w-[21.25rem] flex-shrink-0 flex flex-col gap-1.5 max-h-[37.5rem] overflow-y-auto pr-2 scrollbar-thin transition-opacity duration-500 ease-in-out">
            {features.map((f, i) => {
              const isActive = i === activeFeature;
              return (
                <button
                  key={f.id}
                  onClick={() => handleSelect(i)}
                  className={`relative flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 cursor-pointer overflow-hidden ${
                    isActive 
                      ? 'bg-[#64189D]/10 border border-[#64189D]/20' 
                      : 'bg-transparent hover:bg-white/[0.04] border border-transparent'
                  }`}
                >
                  <span className={`flex-shrink-0 transition-colors ${isActive ? 'text-[#64189D]' : 'text-[#555]'}`}>
                    {f.icon}
                  </span>
                  <span className={`text-sm font-semibold transition-colors ${isActive ? 'text-white' : 'text-[#777]'}`}>
                    {f.title}
                  </span>
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-[2px]">
                      <div 
                        className="h-full bg-[#64189D] origin-left" 
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          <div className="flex-1 flex flex-col">
            <div className="bg-[#282828]/60 rounded-xl p-6 md:p-[25px_30px] mb-8 border border-white/5 transition-all duration-500 ease-in-out">
              <div className="flex items-center gap-3 mb-4">
                <span className="flex-shrink-0 text-[#64189D]">
                  {feature.icon}
                </span>
                <h3 className="text-xl font-extrabold uppercase text-white tracking-[0.5px]">
                  {feature.title}
                </h3>
              </div>
              <div className="w-full h-px bg-white/10 mb-4"></div>
              <p className="text-[#b0b0b0] text-base leading-relaxed animate-in fade-in slide-in-from-bottom-2 duration-500" key={feature.id}>
                {feature.description}
              </p>
            </div>

            <div className="relative w-full aspect-[1920/954] rounded-2xl overflow-hidden border border-white/[0.08] bg-black cursor-pointer">
              {/* Here we would place a video or image. The original holy.gg had an empty video player or standard video for this section. */}
              {/* Using a placeholder gradient for the video if we don't have the exact asset mapped */}
              <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] flex items-center justify-center">
                 <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
                    <svg className="w-8 h-8 text-white/20 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"></path></svg>
                 </div>
              </div>
              <div className="absolute inset-0 bg-black pointer-events-none opacity-0"></div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
