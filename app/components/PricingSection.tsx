'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useCurrency } from '../contexts/CurrencyContext'

const plans = [
  {
    name: 'Starter',
    ram: '2 GB',
    price: 2.50,
    features: [
      '2 GB DDR5 RAM',
      '1 vCPU Core',
      '15 GB NVMe SSD',
      'DDoS Protection',
      'Unlimited Slots',
      '24/7 Support',
    ],
    popular: false,
  },
  {
    name: 'Essential',
    ram: '4 GB',
    price: 5.00,
    features: [
      '4 GB DDR5 RAM',
      '2 vCPU Cores',
      '30 GB NVMe SSD',
      'DDoS Protection',
      'Unlimited Slots',
      'Daily Backups',
      '24/7 Priority Support',
    ],
    popular: false,
  },
  {
    name: 'Pro',
    ram: '8 GB',
    price: 10.00,
    features: [
      '8 GB DDR5 RAM',
      '4 vCPU Cores',
      '60 GB NVMe SSD',
      'Advanced DDoS Protection',
      'Unlimited Slots',
      'Hourly Backups',
      'Custom Domain',
      'Priority Support',
    ],
    popular: true,
  },
  {
    name: 'Ultimate',
    ram: '16 GB',
    price: 20.00,
    features: [
      '16 GB DDR5 RAM',
      '6 vCPU Cores',
      '120 GB NVMe SSD',
      'Premium DDoS Protection',
      'Unlimited Slots',
      'Real-time Backups',
      'Custom Domain',
      'Dedicated Support Agent',
      'Free Migration',
    ],
    popular: false,
  },
]

const billingOptions = [
  { id: 'monthly', label: 'Mensual', discount: 0 },
  { id: 'quarterly', label: 'Trimestral', discount: 10 },
  { id: 'annually', label: 'Anual', discount: 20 },
]

export default function PricingSection() {
  const [billingIndex, setBillingIndex] = useState(0)
  const { formatPrice, convertPrice } = useCurrency()

  const getPrice = (basePrice: number) => {
    const discount = billingOptions[billingIndex].discount;
    const finalPrice = basePrice * (1 - discount / 100);
    return formatPrice(convertPrice(finalPrice));
  }

  return (
    <section id="pricing" className="relative bg-[#08080a] py-24 md:py-32 overflow-hidden scroll-mt-20">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[400px] bg-[#9000FA]/5 blur-[150px] pointer-events-none rounded-full"></div>
      
      <div className="relative max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-14 md:mb-20">
          <div className="mb-5 px-3.5 py-1.5 flex items-center justify-center mx-auto w-fit border border-white/[0.08] text-zinc-300 bg-white/[0.03] backdrop-blur-sm transition-colors duration-200 hover:bg-white/[0.06] rounded-full">
            <svg className="h-3.5 w-3.5 mr-2 shrink-0 text-[#9000FA]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span className="text-[11px] font-bold tracking-wide uppercase">Planes y Precios</span>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 text-[#ffeded]">
            Potencia sin Límites
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Planes escalables que se adaptan a tus necesidades. Todos los planes incluyen protección DDoS y configuración instantánea.
          </p>

          {/* Billing Toggle - XeroHost style */}
          <div className="flex items-center justify-center mt-10">
            <div className="flex items-center p-1 bg-white/[0.03] border border-white/10 rounded-xl max-w-fit mx-auto backdrop-blur-md">
              {billingOptions.map((option, idx) => {
                const isSelected = billingIndex === idx;
                return (
                  <button
                    key={option.id}
                    onClick={() => setBillingIndex(idx)}
                    className={`relative flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
                      isSelected ? 'text-white' : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    {isSelected && (
                      <motion.div
                        layoutId="billingToggle"
                        className="absolute inset-0 bg-[#9000FA] rounded-lg shadow-[0_0_15px_rgba(144,0,250,0.5)]"
                        initial={false}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-1.5">
                      {option.label}
                      {option.discount > 0 && (
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase ${isSelected ? 'bg-black/20 text-white' : 'bg-green-500/20 text-green-400'}`}>
                          -{option.discount}%
                        </span>
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative flex flex-col p-6 rounded-2xl border transition-all duration-300 group overflow-hidden ${
                plan.popular
                  ? 'bg-gradient-to-b from-[#9000FA]/10 to-[#0d0d12]/90 border-[#9000FA]/50 shadow-[0_0_40px_rgba(144,0,250,0.15)]'
                  : 'bg-[#0d0d12]/70 border-white/10 hover:border-white/20 hover:bg-[#0d0d12]/90 backdrop-blur-xl'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#9000FA] to-transparent"></div>
              )}
              
              <div className="mb-6 relative z-10">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-white font-bold text-xl">{plan.name}</h3>
                  {plan.popular && (
                    <span className="px-2.5 py-1 rounded-full bg-[#9000FA]/20 text-[#9000FA] border border-[#9000FA]/30 text-xs font-bold uppercase tracking-wider">
                      Popular
                    </span>
                  )}
                </div>
                <p className="text-zinc-400 text-sm">Servidor {plan.ram} RAM</p>
              </div>

              <div className="mb-8 relative z-10">
                <div className="flex items-baseline gap-1">
                  <span className="text-white font-black text-4xl xl:text-5xl tracking-tight">
                    {getPrice(plan.price)}
                  </span>
                  <span className="text-zinc-500 text-sm font-medium">/mes</span>
                </div>
                <AnimatePresence mode="wait">
                  {billingOptions[billingIndex].discount > 0 && (
                    <motion.p
                      key={billingIndex}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-[#A855F7] text-xs mt-2 font-semibold"
                    >
                      Ahorras {billingOptions[billingIndex].discount}% con facturación {billingOptions[billingIndex].label.toLowerCase()}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <ul className="space-y-4 mb-8 flex-1 relative z-10">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <div className="mt-0.5 w-5 h-5 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                      <svg className="w-3 h-3 text-[#A855F7]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-zinc-300 font-medium">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="https://billing.astralixnodes.com"
                className={`relative z-10 block w-full text-center py-3.5 rounded-xl font-bold text-sm transition-all duration-300 ${
                  plan.popular
                    ? 'bg-[#9000FA] text-white hover:bg-[#7b00d6] hover:shadow-[0_0_20px_rgba(144,0,250,0.4)]'
                    : 'bg-white/5 text-white hover:bg-white/10 border border-white/5 hover:border-white/20'
                }`}
              >
                Comprar Ahora
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom Note */}
        <div className="text-center mt-12">
          <p className="text-zinc-500 text-sm font-medium">
            Todos los planes incluyen garantía de devolución de 48 horas.{' '}
            <Link href="/contacto" className="text-[#A855F7] hover:text-white transition-colors underline underline-offset-4 decoration-white/20">
              ¿Necesitas un plan personalizado?
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}
