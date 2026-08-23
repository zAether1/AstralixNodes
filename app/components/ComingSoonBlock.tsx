'use client';
import React, { useEffect, useState } from 'react';
import { FaDiscord } from 'react-icons/fa6';

interface ComingSoonBlockProps {
  title?: string;
  description: string;
  note?: string;
  ctaText?: string;
  ctaHref?: string;
  bgImage?: string;
}

export default function ComingSoonBlock({
  title = 'Próximamente',
  description,
  note,
  ctaText = 'Más información en Discord',
  ctaHref = 'https://discord.gg/6UMfyMM5pu',
  bgImage,
}: ComingSoonBlockProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#05010b]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(100,24,157,0.24),_transparent_30%),linear-gradient(180deg,rgba(15,5,30,0.95),rgba(5,1,11,0.98))]" />
      {bgImage ? (
        <div className="absolute inset-0 opacity-20 bg-cover bg-center" style={{ backgroundImage: `url(${bgImage})` }} />
      ) : null}

      <div className="relative min-h-[calc(100vh-5rem)] flex items-center">
        <div className="mx-auto w-full max-w-5xl px-6 py-24">
          <div
            className={`rounded-[2rem] border border-white/10 bg-[#0f0419]/95 p-8 md:p-12 shadow-[0_0_80px_rgba(100,24,157,0.16)] backdrop-blur-xl transition-all duration-700 ease-out ${
              visible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-[0.98]'
            }`}
          >
            <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
              <div className="max-w-3xl space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#64189D]/30 bg-[#64189D]/10 px-4 py-2 text-sm uppercase tracking-[0.22em] font-semibold text-[#c9b8ff] shadow-[0_0_20px_rgba(100,24,157,0.12)]">
                  {title}
                </div>
                <div>
                  <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
                    {description}
                  </h1>
                  {note ? (
                    <p className="mt-4 text-[#d5d0ff] text-base md:text-lg leading-relaxed">
                      {note}
                    </p>
                  ) : null}
                </div>
              </div>

              <a
                href={ctaHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center justify-center rounded-full bg-[#64189D] px-6 py-4 text-sm font-bold uppercase tracking-[0.12em] text-white transition hover:bg-[#7b1dc2] shadow-[0_16px_50px_rgba(100,24,157,0.2)]"
              >
                <FaDiscord className="mr-3 h-5 w-5" />
                {ctaText}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
