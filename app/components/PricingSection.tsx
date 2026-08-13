'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { gsap, useGSAP, ScrollTrigger, MOTION, prefersReducedMotion } from '@/lib/gsap';
import GlowCard from './animations/GlowCard';
import MagneticButton from './animations/MagneticButton';
import AnimatedHeading from './animations/AnimatedHeading';
import ScrollReveal from './animations/ScrollReveal';

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
  { label: 'Mensual', discount: 0 },
  { label: 'Trimestral', discount: 10 },
  { label: 'Anual', discount: 20 },
]

export default function PricingSection() {
  const [billingIndex, setBillingIndex] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    if (prefersReducedMotion()) {
      gsap.set('.pricing-card', { opacity: 1, y: 0 });
      return;
    }

    // ScrollTrigger to animate entrance of all cards
    gsap.fromTo('.pricing-card',
      { opacity: 0, y: 40, scale: 0.98, filter: 'blur(4px)' },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
        duration: 0.8,
        stagger: 0.1,
        ease: MOTION.ease.out,
        scrollTrigger: {
          trigger: '.pricing-cards-container',
          start: 'top 85%',
        }
      }
    );

    // Subtle ambient animation for active popular card glow pulse
    gsap.to('.popular-badge-glow', {
      boxShadow: '0 0 25px rgba(144, 0, 250, 0.4)',
      duration: 1.5,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut'
    });
  }, { scope: sectionRef });

  const getPrice = (basePrice: number) => {
    const discount = billingOptions[billingIndex].discount
    return (basePrice * (1 - discount / 100)).toFixed(2)
  }

  const handleBillingToggle = (idx: number) => {
    if (idx === billingIndex) return;

    if (!prefersReducedMotion()) {
      // Animate price change numbers count-up / switch effect
      gsap.fromTo('.price-number',
        { opacity: 0.3, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.3, ease: 'power2.out' }
      );
    }
    setBillingIndex(idx);
  };

  return (
    <section id="pricing" ref={sectionRef} className="relative bg-[#0a0118] py-24 overflow-hidden scroll-mt-20 section-glow-top">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[40%] bg-[radial-gradient(ellipse_at_top,rgba(144,0,250,0.08),transparent_60%)]" />
      </div>

      <div className="relative max-w-[87.5rem] mx-auto px-6 z-10">
        
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-[#9000FA] text-xs md:text-sm font-bold uppercase tracking-[0.2em] mb-3 glow-text">Planes de Precios</p>
          <AnimatedHeading as="h2" className="text-white font-black text-4xl md:text-5xl uppercase tracking-tight">
            Elige tu Plan
          </AnimatedHeading>
          <p className="text-white/50 mt-4 max-w-2xl mx-auto text-sm md:text-base">
            Planes flexibles que se adaptan a tus necesidades. Todos los planes incluyen protección DDoS y configuración instantánea.
          </p>

          {/* Billing Options Toggle */}
          <div className="flex items-center justify-center gap-1 mt-10 bg-[#140528]/85 border border-[#9000FA]/15 rounded-2xl p-1.5 max-w-sm mx-auto shadow-2xl backdrop-blur-md">
            {billingOptions.map((option, idx) => (
              <button
                key={option.label}
                onClick={() => handleBillingToggle(idx)}
                className={`relative px-5 py-2.5 rounded-xl text-xs md:text-sm font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  billingIndex === idx
                    ? 'bg-[#9000FA] text-white shadow-[0_0_15px_rgba(144,0,250,0.35)]'
                    : 'text-white/50 hover:text-white'
                }`}
              >
                {option.label}
                {option.discount > 0 && (
                  <span className={`ml-1.5 text-[9px] font-black rounded-md px-1 py-0.5 ${billingIndex === idx ? 'bg-white/20 text-white' : 'bg-[#9000FA]/10 text-[#9000FA]'}`}>
                    -{option.discount}%
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Cards Container */}
        <div className="pricing-cards-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="pricing-card opacity-0 h-full flex"
            >
              <GlowCard 
                glowColor={plan.popular ? "rgba(144,0,250,0.4)" : "rgba(144,0,250,0.2)"}
                glowIntensity={plan.popular ? "strong" : "subtle"}
                className={`flex flex-col p-6 rounded-2xl border w-full relative ${
                  plan.popular
                    ? 'bg-[#140528]/50 border-[#9000FA]/40 popular-badge-glow shadow-[0_0_20px_rgba(144,0,250,0.1)]'
                    : 'bg-[#0a0118]/80 border-white/5'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#9000FA] to-[#c084fc] text-white text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-wider shadow-[0_0_15px_rgba(144,0,250,0.4)]">
                    Más Popular
                  </div>
                )}

                <div className="mb-6 border-b border-white/5 pb-4">
                  <h3 className="text-white font-black text-xl tracking-wide uppercase">{plan.name}</h3>
                  <p className="text-white/40 text-xs mt-1 font-semibold tracking-wider">Servidor {plan.ram} RAM</p>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-white/40 text-lg font-bold">€</span>
                    <span className="price-number text-white font-black text-5xl tracking-tight">{getPrice(plan.price)}</span>
                    <span className="text-white/40 text-sm font-semibold">/mes</span>
                  </div>
                  {billingOptions[billingIndex].discount > 0 && (
                    <p className="text-[#c084fc] text-[10px] mt-1.5 font-bold uppercase tracking-wider">
                      Ahorras {billingOptions[billingIndex].discount}% con facturación {billingOptions[billingIndex].label.toLowerCase()}
                    </p>
                  )}
                </div>

                <ul className="space-y-3.5 mb-8 flex-1 border-t border-white/5 pt-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-xs md:text-sm">
                      <svg className="w-4 h-4 text-[#9000FA] flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      <span className="text-white/70 font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>

                <MagneticButton as="a" href="/minecraft" className="w-full">
                  <div 
                    className={`w-full text-center py-3.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all duration-300 border btn-shine cursor-pointer ${
                      plan.popular
                        ? 'bg-[#9000FA] text-white hover:bg-[#7000C8] border-transparent shadow-[0_0_20px_rgba(144,0,250,0.3)] hover:shadow-[0_0_35px_rgba(144,0,250,0.5)]'
                        : 'bg-[#9000FA]/10 text-[#c084fc] border-[#9000FA]/20 hover:bg-[#9000FA]/20 hover:border-[#9000FA]/40'
                    }`}
                  >
                    Comenzar
                  </div>
                </MagneticButton>
              </GlowCard>
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <div className="text-center mt-12">
          <p className="text-white/30 text-xs font-semibold uppercase tracking-wider">
            Garantía de reembolso de 48 horas. ¿Necesitas un plan a medida?{' '}
            <Link href="/contacto" className="text-[#9000FA] hover:text-[#c084fc] underline underline-offset-2 transition-colors">
              Contáctanos
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}
