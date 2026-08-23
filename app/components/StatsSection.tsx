'use client';
import React, { useRef, useState, useEffect } from 'react';
import { gsap, useGSAP, ScrollTrigger, MOTION, prefersReducedMotion } from '@/lib/gsap';
import GlowCard from './animations/GlowCard';
import ScrollReveal from './animations/ScrollReveal';

const stats = [
  {
    value: 'Escalable',
    label: 'Infraestructura preparada para crecimiento',
    icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="#9000FA" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
  },
  {
    value: 'Premium',
    label: 'Servidores optimizados',
    icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="#9000FA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"></path></svg>
  },
  {
    value: 'DDoS',
    label: 'Protección DDoS activa',
    icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="#9000FA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
  },
  {
    value: 'Global',
    label: 'Red en expansión',
    icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="#9000FA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"></path></svg>
  },
  {
    value: 'Tiempo Real',
    label: 'Latencia monitoreada',
    icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="#9000FA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>
  },
  {
    value: '24/7',
    label: 'Soporte técnico',
    icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="#9000FA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18.36 6.64a9 9 0 1 1-12.73 0M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path></svg>
  }
];

const terminalSequence = [
  { type: 'command', text: 'iniciar-servidor --noc --status' },
  { type: 'response', text: '[OK] Conectando con núcleo de AstralixNodes...' },
  { type: 'response', text: '[OK] Escaneando interfaces de red locales...' },
  { type: 'response', text: '[OK] Levantando protección DDoS de capa 7...' },
  { type: 'response', text: '[OK] Validando integridad de contenedores Docker...' },
  { type: 'response', text: '[EXITO] Infraestructura operativa en puerto 8080.' },
  { type: 'empty', text: '' },
  { type: 'command', text: 'noc --check-pings' },
  { type: 'response', text: '[INFO] Enviando paquetes de prueba a localizaciones...' },
  { type: 'response', text: '[OK] Nodo Miami: 12ms' },
  { type: 'response', text: '[OK] Nodo Madrid: 45ms' },
  { type: 'response', text: '[OK] Nodo Frankfurt: 52ms' },
  { type: 'response', text: '[EXITO] Red saludable. 0% pérdida de paquetes.' }
];

export default function StatsSection() {
  const container = useRef<HTMLDivElement>(null);
  const terminalScrollRef = useRef<HTMLDivElement>(null);
  
  const [displayedLines, setDisplayedLines] = useState<{text: string, isCommand: boolean}[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentLineText, setCurrentLineText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!hasStarted) return;
    
    if (currentLineIndex < terminalSequence.length) {
      const currentItem = terminalSequence[currentLineIndex];

      if (currentItem.type === 'command') {
        setIsTyping(true);
        const fullText = currentItem.text;
        let charIndex = 0;
        
        const typeInterval = setInterval(() => {
          if (charIndex <= fullText.length) {
            setCurrentLineText(fullText.substring(0, charIndex));
            charIndex++;
          } else {
            clearInterval(typeInterval);
            setIsTyping(false);
            setDisplayedLines(prev => [...prev, { text: fullText, isCommand: true }]);
            setCurrentLineText('');
            setTimeout(() => {
              setCurrentLineIndex(prev => prev + 1);
            }, 300); // Wait before system response
          }
        }, prefersReducedMotion() ? 0 : 45); // Typing speed
        
        return () => clearInterval(typeInterval);

      } else if (currentItem.type === 'response') {
        const timeout = setTimeout(() => {
          setDisplayedLines(prev => [...prev, { text: currentItem.text, isCommand: false }]);
          setCurrentLineIndex(prev => prev + 1);
        }, prefersReducedMotion() ? 0 : 550); // System processing time
        return () => clearTimeout(timeout);

      } else if (currentItem.type === 'empty') {
        const timeout = setTimeout(() => {
          setDisplayedLines(prev => [...prev, { text: '', isCommand: false }]);
          setCurrentLineIndex(prev => prev + 1);
        }, prefersReducedMotion() ? 0 : 350);
        return () => clearTimeout(timeout);
      }
    } else {
      // Loop sequence
      const timeout = setTimeout(() => {
        setDisplayedLines([]);
        setCurrentLineIndex(0);
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [currentLineIndex, hasStarted]);

  // Autoscroll terminal
  useEffect(() => {
    if (terminalScrollRef.current) {
      terminalScrollRef.current.scrollTop = terminalScrollRef.current.scrollHeight;
    }
  }, [displayedLines, currentLineText]);

  useGSAP(() => {
    // ScrollTrigger to start terminal typing
    ScrollTrigger.create({
      trigger: container.current,
      start: 'top 75%',
      onEnter: () => setHasStarted(true)
    });

    // Reveal animation for all stat items and headings
    gsap.fromTo('.stat-reveal',
      { opacity: 0, y: 35, filter: 'blur(4px)' },
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

  const renderResponseText = (line: string) => {
    if (line.includes('[OK]')) {
      return (
        <>
          <span className="text-[#4ade80] font-bold drop-shadow-[0_0_8px_rgba(74,222,128,0.5)]">[OK]</span>
          {line.replace('[OK]', '')}
        </>
      );
    }
    if (line.includes('[EXITO]')) {
      return (
        <>
          <span className="text-[#4ade80] font-black drop-shadow-[0_0_10px_rgba(74,222,128,0.7)] animate-pulse">[EXITO]</span>
          {line.replace('[EXITO]', '')}
        </>
      );
    }
    if (line.includes('[INFO]')) {
      return (
        <>
          <span className="text-[#3b82f6] font-bold drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]">[INFO]</span>
          {line.replace('[INFO]', '')}
        </>
      );
    }
    return line;
  };

  return (
    <section ref={container} className="relative bg-[#0e0320] py-24 px-6 border-t border-white/5 overflow-hidden section-glow-top">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[550px] h-[550px] bg-[#9000FA]/5 blur-[120px] rounded-full pointer-events-none mix-blend-screen"></div>

      <div className="max-w-[87.5rem] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* NOC Terminal */}
          <div className="rounded-2xl overflow-hidden border border-white/5 stat-reveal bg-[#0a0118]/80 backdrop-blur-md shadow-[0_0_40px_rgba(144,0,250,0.15),inset_0_1px_0_rgba(255,255,255,0.05)] relative flex flex-col h-[26rem]">
            <div className="absolute inset-0 bg-gradient-to-br from-[#9000FA]/5 to-transparent pointer-events-none"></div>
            
            <div className="bg-[#140528] border-b border-[#9000FA]/20 px-5 py-4 flex items-center justify-between flex-shrink-0">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]"></div>
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                <div className="w-3 h-3 rounded-full bg-[#28ca42]"></div>
              </div>
              <span className="text-[#9000FA] text-xs font-mono font-bold tracking-wider opacity-85">root@astralix-noc:~</span>
            </div>
            
            <div ref={terminalScrollRef} className="p-6 font-mono text-[13px] md:text-sm leading-relaxed text-[#c084fc] whitespace-pre-wrap break-words relative z-10 flex-1 overflow-y-auto scrollbar-hide">
              <div className="flex flex-col justify-end min-h-full">
                {displayedLines.map((line, index) => (
                   <div key={index} className="mb-2.5 text-white/90">
                     {line.isCommand ? (
                        <>
                           <span className="text-[#9000FA] font-bold mr-2">{'>'}</span>
                           <span>{line.text}</span>
                        </>
                     ) : line.text === '' ? (
                        <div className="h-4"></div>
                     ) : (
                        renderResponseText(line.text)
                     )}
                   </div>
                ))}
                
                {isTyping && (
                  <div className="inline-block text-white/90">
                    <span className="text-[#9000FA] font-bold mr-2">{'>'}</span>
                    <span>{currentLineText}</span>
                    <span className="inline-block w-2 h-4 ml-1 align-middle bg-[#9000FA] animate-pulse"></span>
                  </div>
                )}
                
                {/* Blinking cursor waiting for new command */}
                {!isTyping && currentLineIndex < terminalSequence.length && terminalSequence[currentLineIndex].type === 'command' && displayedLines.length === 0 && (
                  <div className="inline-block text-white/90">
                    <span className="text-[#9000FA] font-bold mr-2">{'>'}</span>
                    <span className="inline-block w-2 h-4 ml-1 align-middle bg-[#9000FA] animate-pulse"></span>
                  </div>
                )}

                {/* Final blinking cursor when done */}
                {!isTyping && currentLineIndex >= terminalSequence.length && (
                  <div className="inline-block text-white/90 mt-2">
                    <span className="text-[#9000FA] font-bold mr-2">{'>'}</span>
                    <span className="inline-block w-2 h-4 ml-1 align-middle bg-[#9000FA] animate-pulse"></span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Stats Description & Info */}
          <div>
            <h2 className="stat-reveal text-4xl lg:text-5xl font-black uppercase mb-6 leading-tight">
              <span className="text-white">INFRAESTRUCTURA </span>
              <span className="text-[#9000FA] glow-text">DE NUEVA GENERACIÓN.</span>
            </h2>
            <p className="stat-reveal text-white/60 text-base leading-relaxed mb-10">
              En AstralixNodes, hemos construido una red sólida y segura diseñada específicamente para las necesidades actuales de alojamiento. Nos enfocamos en la calidad, seguridad y estabilidad.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <ScrollReveal key={i} variant="scale" delay={i * 0.05} start="top 85%" className="h-full">
                  <GlowCard glowColor="rgba(144,0,250,0.25)" glowIntensity="normal" className="px-5 py-6 flex items-center gap-4 h-full">
                    <div className="w-12 h-12 rounded-lg bg-[#9000FA]/10 flex items-center justify-center flex-shrink-0 border border-[#9000FA]/20 shadow-[0_0_10px_rgba(144,0,250,0.15)]">
                      {stat.icon}
                    </div>
                    <div className="min-w-0">
                      <div className="text-white font-black text-lg leading-tight truncate">{stat.value}</div>
                      <div className="text-[#a1a1aa] text-xs mt-1 leading-snug">{stat.label}</div>
                    </div>
                  </GlowCard>
                </ScrollReveal>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
