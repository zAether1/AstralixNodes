'use client';

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import { Flip } from 'gsap/Flip';
import { Observer } from 'gsap/Observer';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// Register all plugins once
if (typeof window !== 'undefined') {
  gsap.registerPlugin(
    useGSAP,
    ScrollTrigger,
    TextPlugin,
    Flip,
    Observer,
    ScrollToPlugin
  );
}

// Check reduced motion preference
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Default animation config
export const MOTION = {
  // Durations
  fast: 0.3,
  normal: 0.6,
  slow: 1,
  xslow: 1.5,

  // Easings
  ease: {
    out: 'power3.out',
    in: 'power3.in',
    inOut: 'power3.inOut',
    smooth: 'power2.out',
    snap: 'back.out(1.4)',
    elastic: 'elastic.out(1, 0.5)',
    bounce: 'bounce.out',
    expo: 'expo.out',
  },

  // ScrollTrigger defaults
  scroll: {
    start: 'top 85%',
    startEarly: 'top 90%',
    startMid: 'top 75%',
  },

  // Stagger presets
  stagger: {
    fast: 0.05,
    normal: 0.1,
    slow: 0.15,
    cards: 0.12,
  },
} as const;

export { gsap, useGSAP, ScrollTrigger, TextPlugin, Flip, Observer, ScrollToPlugin };
