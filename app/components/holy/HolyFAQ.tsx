'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'

export default function HolyFAQ() {
  const faqs = [
    {
      question: '¿Cuánto tiempo tarda en activarse mi servidor?',
      answer: 'Tu servidor se activa de manera instantánea inmediatamente después de que el pago es procesado y confirmado por nuestro sistema. Recibirás un correo electrónico con las credenciales de acceso al panel en cuestión de segundos.'
    },
    {
      question: '¿Puedo cambiar de plan si mi servidor necesita más recursos?',
      answer: 'Sí, absolutamente. Puedes escalar (upgrade) o reducir (downgrade) tu plan en cualquier momento desde tu área de cliente. Los cambios se aplican automáticamente y solo pagarás la diferencia proporcional del tiempo restante.'
    },
    {
      question: '¿Qué tipo de protección DDoS incluyen?',
      answer: 'Todos nuestros servidores incluyen protección DDoS Enterprise de hasta 480Gbps proporcionada por Path.net y Arbor. Está configurada específicamente para mitigar ataques a servidores de juegos sin afectar la latencia legítima de los jugadores.'
    },
    {
      question: '¿Puedo subir mis propios mods o plugins?',
      answer: 'Por supuesto. Tienes acceso completo a los archivos de tu servidor a través de nuestro administrador de archivos web (File Manager) o mediante conexión SFTP. Puedes instalar cualquier mod, plugin o modpack que desees.'
    },
    {
      question: '¿Tienen bases de datos MySQL incluidas?',
      answer: 'Sí, todos nuestros planes de Minecraft y Game Hosting incluyen la creación de bases de datos MySQL gratuitas directamente desde el panel de control para que puedas conectar tus plugins fácilmente.'
    }
  ]

  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="bg-[#101010] py-24 px-6 border-t border-white/5 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#64189D]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <p className="text-[#64189D] font-bold text-sm uppercase tracking-widest mb-3">SOPORTE</p>
          <h2 className="text-4xl md:text-5xl font-black uppercase text-white tracking-wider">
            PREGUNTAS <span className="text-[#64189D]">FRECUENTES</span>
          </h2>
        </div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }}
          className="space-y-4"
        >
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx
            return (
              <motion.div 
                key={idx}
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  visible: { opacity: 1, y: 0 }
                }}
                className={`bg-[#13111a] border rounded-xl overflow-hidden transition-all duration-300 ${isOpen ? 'border-[#64189D]/50 shadow-lg shadow-[#64189D]/10' : 'border-white/5 hover:border-white/10'}`}
              >
                <button 
                  onClick={() => toggleFAQ(idx)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className={`font-bold text-sm sm:text-base pr-8 ${isOpen ? 'text-white' : 'text-white/80'}`}>
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${isOpen ? 'bg-[#64189D] text-white rotate-180' : 'bg-white/5 text-white/50'}`}>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>
                <div 
                  className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <div className="p-6 pt-0 text-white/60 text-sm leading-relaxed border-t border-white/5 mt-2 pt-6">
                    {faq.answer}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        <div className="text-center mt-12">
          <p className="text-white/50 text-sm">
            ¿No encuentras la respuesta que buscas?{' '}
            <a href="https://discord.gg/astralixnodes" target="_blank" rel="noopener noreferrer" className="text-[#A855F7] font-bold hover:underline">
              Únete a nuestro Discord
            </a> o abre un ticket de soporte.
          </p>
        </div>
      </div>
    </section>
  )
}
