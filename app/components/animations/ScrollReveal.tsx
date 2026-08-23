'use client';

import React, { useRef } from 'react';
import { gsap, useGSAP, ScrollTrigger, MOTION, prefersReducedMotion } from '@/lib/gsap';

type RevealVariant = 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'scale' | 'blur' | 'clip-up' | 'clip-left';

interface ScrollRevealProps {
  children: React.ReactNode;
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  stagger?: number;
  className?: string;
  as?: React.ElementType;
  once?: boolean;
  scrub?: boolean | number;
  start?: string;
}

const getVariantProps = (variant: RevealVariant) => {
  switch (variant) {
    case 'fade-up':
      return { from: { opacity: 0, y: 60 }, to: { opacity: 1, y: 0 } };
    case 'fade-down':
      return { from: { opacity: 0, y: -40 }, to: { opacity: 1, y: 0 } };
    case 'fade-left':
      return { from: { opacity: 0, x: -60 }, to: { opacity: 1, x: 0 } };
    case 'fade-right':
      return { from: { opacity: 0, x: 60 }, to: { opacity: 1, x: 0 } };
    case 'scale':
      return { from: { opacity: 0, scale: 0.85 }, to: { opacity: 1, scale: 1 } };
    case 'blur':
      return { from: { opacity: 0, filter: 'blur(12px)', y: 30 }, to: { opacity: 1, filter: 'blur(0px)', y: 0 } };
    case 'clip-up':
      return { from: { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0 }, to: { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 } };
    case 'clip-left':
      return { from: { clipPath: 'inset(0% 100% 0% 0%)', opacity: 0 }, to: { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 } };
    default:
      return { from: { opacity: 0, y: 60 }, to: { opacity: 1, y: 0 } };
  }
};

export default function ScrollReveal({
  children,
  variant = 'fade-up',
  delay = 0,
  duration = MOTION.normal,
  stagger = 0,
  className = '',
  as: Tag = 'div',
  once = true,
  scrub = false,
  start = MOTION.scroll.start,
}: ScrollRevealProps) {
  const container = useRef<HTMLDivElement>(null);
  const { from, to } = getVariantProps(variant);

  useGSAP(() => {
    if (prefersReducedMotion()) {
      // If reduced motion, just show immediately
      gsap.set(container.current, { opacity: 1, clearProps: 'all' });
      return;
    }

    const targets = stagger > 0 ? container.current?.children : container.current;

    gsap.fromTo(targets!, from, {
      ...to,
      duration,
      delay,
      stagger: stagger > 0 ? stagger : undefined,
      ease: MOTION.ease.out,
      scrollTrigger: {
        trigger: container.current,
        start,
        once,
        scrub: scrub as any,
      },
    });
  }, { scope: container });

  return React.createElement(
    Tag as any,
    { ref: container, className },
    children
  );
}
