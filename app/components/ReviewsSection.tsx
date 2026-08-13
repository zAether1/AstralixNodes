'use client';
import React, { useRef, useState, useEffect } from 'react';
import { gsap, useGSAP, ScrollTrigger, MOTION, prefersReducedMotion } from '@/lib/gsap';
import GlowCard from './animations/GlowCard';
import ScrollReveal from './animations/ScrollReveal';

const reviews = [
  {
    title: 'La verdad es que la página funciona bien',
    content: 'La verdad es que la página funciona súper bien, pero lo que realmente marca la diferencia es la atención. Quería pasar a dejarle un agradecimiento especial a Sherine del Staff; es un genio.\n\nMe ayudó con todo súper rápido, con una ondaza y mucha paciencia (que a veces hace falta, jaja). Da gusto encontrarse con gente así en el soporte que no te responde como un robot, sino que se nota que le pone ganas a resolverte las dudas.\n\n¡Mil gracias, Sherine! Muy amigable y buen staff. 🙌✨',
    author: 'ambi',
    date: '7 mar 2026',
    url: 'https://www.trustpilot.com/users/69abdbad513e810f6e756e5b'
  },
  {
    title: 'Rodrigo ded los mejores staff',
    content: 'de nuevo mil gracias a Rodrigo, un chico del staff que siempre que se lo he pedido me ha ayudado y super bien el trato con él, no le importa perder su tiempo si es por ayudar y eso se agradece',
    author: 'Pablo Garcia',
    date: '29 ene 2026',
    url: 'https://www.trustpilot.com/reviews/697be89cb443f1f989b2a7be'
  },
  {
    title: 'La respuesta fue rápida al momento que abrí ticket',
    content: 'La respuesta fue rápida al momento que hice contacto con la atención al cliente. Me atendió Morga, muy amable, y me resolvió mis dudas y solucionó mi problema. Como siempre, AstralixNodes 10/10.',
    author: 'vMateo Dev',
    date: '3 feb 2026',
    url: 'https://www.trustpilot.com/reviews/69815520bb243929a2d962f6'
  },
  {
    title: 'Recomendado',
    content: 'Un buen servicio con buena atención en mi caso. El administrador Morga ha sido muy atento y cordial a la hora de solucionar algunos problemas con mi servidor de Minecraft. Agradezco de antemano la atención brindada para un principiante y el correcto funcionamiento de mi mundo. :)',
    author: 'Alexander Puertas Juarez',
    date: '7 feb 2026',
    url: 'https://www.trustpilot.com/reviews/6986ba5d003eca5d52ee3cbc'
  },
  {
    title: 'Atención perfecta',
    content: 'Me llamo joaquín, rentamos un server con amigos porque nos gusto Astralix hosting, y hasta ahora no hemos tenido problemas. Hoy he tenido una duda y Morga me ha atendido muy rápido, y me ha solucionado el problema al momento.',
    author: 'Joaquin',
    date: '13 feb 2026',
    url: 'https://www.trustpilot.com/reviews/698f5b82b9d0f5f299ad2b4a'
  },
  {
    title: 'Experiencia soporte de ventas',
    content: 'Mi experiencia respecto al soporte de ventas fue excelente, respuesta rápida, eficiente, con respeto y directo. No sentí que me quisiera vender un plan mas caro o una via de escape para que simplemente compre sino que genuinamente quería solucionar mis dudas. Me atendió Morga.',
    author: 'Mauro Pereira',
    date: '22 feb 2026',
    url: 'https://www.trustpilot.com/reviews/699ba5d3334ab0ea870f696a'
  },
  {
    title: 'Excelente servicio de Morga',
    content: 'Escribí para consultar sobre un problema con el host y me atendió Morga, excelente atención, muy amable y eficaz!',
    author: '́ཀ` /knowhere',
    date: '23 feb 2026',
    url: 'https://www.trustpilot.com/reviews/699ca6e41d976d96dfaa1d93'
  }
];

const StarRating = () => (
  <div className="flex items-center gap-0.5">
    {[...Array(5)].map((_, i) => (
      <svg key={i} width="16" height="16" viewBox="0 0 24 24" className="flex-shrink-0 text-[#9000FA]">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor"></path>
      </svg>
    ))}
  </div>
);

export default function ReviewsSection() {
  const container = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useGSAP(() => {
    gsap.fromTo('.review-reveal',
      { opacity: 0, x: -30, filter: 'blur(4px)' },
      { 
        opacity: 1, 
        x: 0, 
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

    // Parallax background scroll effect
    if (!prefersReducedMotion()) {
      gsap.fromTo('.reviews-parallax-bg',
        { yPercent: -10 },
        {
          yPercent: 10,
          ease: 'none',
          scrollTrigger: {
            trigger: container.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          }
        }
      );
    }
  }, { scope: container });

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  useEffect(() => {
    if (sliderRef.current) {
      if (prefersReducedMotion()) {
        sliderRef.current.style.transform = `translate3d(-${currentIndex * 100}%, 0, 0)`;
      } else {
        gsap.to(sliderRef.current, {
          xPercent: -currentIndex * 100,
          duration: 0.5,
          ease: 'power3.out',
        });
      }
    }
  }, [currentIndex]);

  return (
    <section ref={container} className="relative w-full overflow-hidden min-h-[420px] bg-black">
      {/* Parallax Background */}
      <div 
        className="reviews-parallax-bg absolute inset-0 bg-cover bg-right md:bg-center scale-110" 
        style={{ backgroundImage: 'url(/assets/images/astralixnodes-banner-largo.png)' }}
      ></div>
      <div className="absolute inset-0 bg-black/90 md:bg-black/75"></div>
      
      <div className="relative min-h-[inherit] flex items-center py-16 xl:py-24 px-6 z-10">
        <div className="review-reveal max-w-[87.5rem] mx-auto w-full">
          <div className="flex flex-col xl:flex-row xl:items-center gap-10 xl:gap-16">
            
            {/* Trustpilot Brand Left Column */}
            <div className="xl:w-[22rem] flex-shrink-0 flex flex-col items-center xl:items-start text-center xl:text-left">
              <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-3">
                ESTAMOS CALIFICADOS
              </p>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight uppercase">
                EXCELENTE
              </h2>
              <div className="flex items-center gap-0.5">
                {[...Array(4)].map((_, i) => (
                  <svg key={i} width="34" height="34" viewBox="0 0 24 24" className="flex-shrink-0 text-[#9000FA]">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor"></path>
                  </svg>
                ))}
                <svg width="34" height="34" viewBox="0 0 24 24" className="flex-shrink-0 text-[#9000FA]">
                  <defs><clipPath id="star-clip-lg"><rect x="0" y="0" width="70%" height="100%"></rect></clipPath></defs>
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="#333"></path>
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor" clipPath="url(#star-clip-lg)"></path>
                </svg>
              </div>
              <p className="text-white/50 text-sm mt-3">Calificado 4.7 de 5 estrellas</p>
              <a href="https://www.trustpilot.com/review/astralixnodes.com" target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 text-[#9000FA] text-sm font-bold hover:text-[#b870ff] transition-colors group">
                <svg className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>
                Ver en Trustpilot
              </a>
            </div>

            {/* Testimonials Slider Right Column */}
            <div className="flex-1 min-w-0">
              <div className="overflow-hidden">
                <div ref={sliderRef} className="flex" style={{ willChange: 'transform' }}>
                  {reviews.map((rev, idx) => (
                    <div key={idx} className="flex-shrink-0 px-2" style={{ width: '100%' }}>
                      <a href={rev.url} target="_blank" rel="noopener noreferrer" className="no-underline block h-full">
                        <GlowCard glowColor="rgba(144,0,250,0.3)" glowIntensity="normal" className="p-6 md:p-8 flex flex-col gap-4 min-h-[220px] bg-white/[0.04] border border-white/5 hover:border-[#9000FA]/30 hover:bg-white/[0.06] transition-all">
                          <h3 className="font-bold text-lg text-white truncate">{rev.title}</h3>
                          <p className="text-white/70 text-sm md:text-base leading-relaxed line-clamp-4 flex-1 whitespace-pre-wrap">{rev.content}</p>
                          
                          <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                            <div className="flex items-center gap-3">
                              <StarRating />
                              <span className="text-white/50 text-xs font-bold">{rev.author}</span>
                            </div>
                            <span className="text-white/30 text-xs">{rev.date}</span>
                          </div>
                        </GlowCard>
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              {/* Slider Controls */}
              <div className="flex items-center justify-center gap-3 mt-8">
                <button onClick={prevSlide} className="w-10 h-10 flex items-center justify-center text-white bg-white/5 rounded-full border border-white/5 hover:bg-[#9000FA]/20 hover:border-[#9000FA]/35 transition-all duration-300 cursor-pointer" aria-label="Previous">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"></path></svg>
                </button>
                
                {/* Dots indicator */}
                <div className="flex items-center gap-1.5 overflow-hidden max-w-[150px]">
                  {reviews.map((_, i) => (
                    <button key={i} onClick={() => setCurrentIndex(i)} className="p-1 cursor-pointer" aria-label={`Page ${i + 1}`}>
                      <span className={`block h-2 rounded-full transition-all duration-300 ${i === currentIndex ? 'bg-[#9000FA] w-5' : 'bg-white/20 hover:bg-white/40 w-2'}`}></span>
                    </button>
                  ))}
                </div>

                <button onClick={nextSlide} className="w-10 h-10 flex items-center justify-center text-white bg-white/5 rounded-full border border-white/5 hover:bg-[#9000FA]/20 hover:border-[#9000FA]/35 transition-all duration-300 cursor-pointer" aria-label="Next">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"></path></svg>
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
