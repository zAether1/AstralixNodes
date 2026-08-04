'use client'

import React from 'react'
import { motion } from 'framer-motion'

export default function HolyReviews() {
  return (
    <section className="relative w-full overflow-hidden min-h-[300px] flex items-center border-y border-[#64189D]/20">
      {/* Background */}
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/assets/images/AstralixNodes-banner-largo.png)' }} />
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-[#180228]/80 to-black/90" />
      
      <div className="relative z-10 w-full max-w-[87.5rem] mx-auto px-6 py-16 lg:py-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          
          {/* Trustpilot CTA */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center lg:items-start text-center lg:text-left"
          >
            <p className="text-white/70 text-sm font-bold uppercase tracking-[0.2em] mb-3">
              ESTAMOS CALIFICADOS
            </p>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 uppercase tracking-wider">
              EXCELENTE
            </h2>
            
            {/* Stars */}
            <div className="flex items-center gap-2 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <div key={star} className="w-10 h-10 bg-[#00B67A] flex items-center justify-center text-white p-2">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                </div>
              ))}
            </div>
            
            <p className="text-white/80 text-sm">
              Basado en <span className="font-bold text-white underline decoration-[#00B67A] underline-offset-4">+1,000 reseñas</span> en Trustpilot
            </p>
          </motion.div>

          {/* Testimonials */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
            }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1 max-w-4xl"
          >
            {/* Review 1 */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-colors"
            >
              <div className="flex items-center gap-1 text-[#00B67A] mb-4">
                {[1, 2, 3, 4, 5].map(i => (
                  <svg key={i} className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Excelente servicio y soporte</h3>
              <p className="text-white/70 text-sm leading-relaxed mb-6">
                "El servidor va super fluido sin tirones incluso con más de 50 mods pesados instalados. El soporte me ayudó a configurar el dominio en menos de 5 minutos. Totalmente recomendado."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#64189D] text-white flex items-center justify-center font-bold text-xs">
                  M
                </div>
                <div className="text-white/60 text-xs">
                  <span className="text-white font-medium">Miguel Ángel</span> • Hace 2 días
                </div>
              </div>
            </motion.div>

            {/* Review 2 */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-colors"
            >
              <div className="flex items-center gap-1 text-[#00B67A] mb-4">
                {[1, 2, 3, 4, 5].map(i => (
                  <svg key={i} className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <h3 className="text-white font-bold text-lg mb-2">El mejor host de LATAM</h3>
              <p className="text-white/70 text-sm leading-relaxed mb-6">
                "Llevo 2 años con ellos y la protección DDoS es increíble. Además la latencia (ping) en Sudamérica es de las mejores que he probado. El panel pterodactyl que usan es súper limpio."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#A855F7] text-white flex items-center justify-center font-bold text-xs">
                  L
                </div>
                <div className="text-white/60 text-xs">
                  <span className="text-white font-medium">Lucas Dev</span> • Hace 1 semana
                </div>
              </div>
            </motion.div>
          </motion.div>
          
        </div>
      </div>
    </section>
  )
}
