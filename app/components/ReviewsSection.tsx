'use client';
import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

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

const StarRating = ({ rating = 5 }) => (
  <div className="flex items-center gap-0.5">
    {[...Array(5)].map((_, i) => (
      <svg key={i} width="18" height="18" viewBox="0 0 24 24" className="flex-shrink-0">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="#333"></path>
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="#64189D"></path>
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
      { opacity: 0, x: -30 },
      { 
        opacity: 1, 
        x: 0, 
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

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.style.transform = `translate3d(-${currentIndex * 100}%, 0, 0)`;
    }
  }, [currentIndex]);

  return (
    <section ref={container} className="relative w-full overflow-hidden reviews-banner-h min-h-[400px]">
      <div 
        className="absolute inset-0 bg-cover bg-right md:bg-center" 
        style={{ backgroundImage: 'url(/assets/images/astralixnodes-banner-largo.png)' }}
      ></div>
      <div className="absolute inset-0 bg-black/85 md:bg-black/70"></div>
      
      <div className="relative min-h-[inherit] flex items-center py-12 xl:py-20 px-4 sm:px-6">
        <div className="review-reveal max-w-[87.5rem] mx-auto w-full">
          <div className="flex flex-col xl:flex-row xl:items-center gap-8 xl:gap-14">
            
            <div className="xl:w-[20rem] flex-shrink-0 flex flex-col items-center xl:items-start text-center xl:text-left">
              <p className="text-white/60 text-[0.95rem] font-semibold uppercase tracking-wider mb-2">
                ESTAMOS CALIFICADOS
              </p>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                EXCELENTE
              </h2>
              <div className="flex items-center gap-0.5">
                {[...Array(4)].map((_, i) => (
                  <svg key={i} width="34" height="34" viewBox="0 0 24 24" className="flex-shrink-0">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="#333"></path>
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="#64189D"></path>
                  </svg>
                ))}
                <svg width="34" height="34" viewBox="0 0 24 24" className="flex-shrink-0">
                  <defs><clipPath id="star-clip-lg"><rect x="0" y="0" width="70%" height="100%"></rect></clipPath></defs>
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="#333"></path>
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="#64189D" clipPath="url(#star-clip-lg)"></path>
                </svg>
              </div>
              <p className="text-white/50 text-[0.95rem] mt-3">Calificado 4.7 de 5 estrellas</p>
              <a href="https://www.trustpilot.com/review/astralixnodes.com" target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 text-[#64189D] text-[0.9rem] font-semibold hover:text-[#7f22c4] transition-colors">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>
                Ver en Trustpilot
              </a>
            </div>

            <div className="flex-1 min-w-0">
              <div className="overflow-hidden">
                <div ref={sliderRef} className="flex" style={{ transition: 'transform 300ms ease-out' }}>
                  {reviews.map((rev, idx) => (
                    <div key={idx} className="flex-shrink-0 px-2" style={{ width: '100%' }}>
                      <a href={rev.url} target="_blank" rel="noopener noreferrer" className="bg-white/[0.08] rounded-xl border-t-2 border-[#64189D]/30 p-6 flex flex-col gap-3 h-full no-underline hover:bg-white/[0.12] transition-colors min-h-[220px]">
                        <h3 className="font-bold text-lg text-white truncate">{rev.title}</h3>
                        <p className="text-white/70 text-base leading-relaxed line-clamp-4 flex-1 whitespace-pre-wrap">{rev.content}</p>
                        <div className="flex items-center justify-between mt-auto pt-2">
                          <div className="flex items-center gap-2">
                            <StarRating />
                            <span className="text-white/50 text-[0.85rem]">{rev.author}</span>
                          </div>
                          <span className="text-white/30 text-[0.8rem]">{rev.date}</span>
                        </div>
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 sm:gap-3 mt-6">
                <button onClick={prevSlide} className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-white bg-white/10 rounded-full hover:bg-white/20 transition-colors flex-shrink-0" aria-label="Previous">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                </button>
                <div className="flex items-center gap-1 sm:gap-1.5 overflow-hidden max-w-[150px]">
                  {reviews.map((_, i) => (
                    <button key={i} onClick={() => setCurrentIndex(i)} className="p-0.5 sm:p-1 cursor-pointer" aria-label={`Page ${i + 1}`}>
                      <span className={`block w-2 h-2 rounded-full ${i === currentIndex ? 'bg-[#64189D]' : 'bg-white/20 hover:bg-white/40'} transition-colors`}></span>
                    </button>
                  ))}
                </div>
                <button onClick={nextSlide} className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-white bg-white/10 rounded-full hover:bg-white/20 transition-colors flex-shrink-0" aria-label="Next">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
