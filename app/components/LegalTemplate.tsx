'use client';
import React, { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import gsap from 'gsap';

interface LegalTemplateProps {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
  twoColumn?: boolean;
}

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export default function LegalTemplate({ title, lastUpdated, children, twoColumn = false }: LegalTemplateProps) {
  useEffect(() => {
    gsap.fromTo('.legal-content', 
      { y: 30, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
    );
  }, []);

  useEffect(() => {
    // Highlight TOC active item on scroll
    if (typeof window === 'undefined') return;
    const headings = Array.from(document.querySelectorAll('h2[id]')) as HTMLElement[];
    const navLinks = Array.from(document.querySelectorAll('.legal-toc a')) as HTMLAnchorElement[];
    if (!headings.length || !navLinks.length) return;

    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach(a => a.classList.toggle('text-white', a.getAttribute('href') === `#${id}`));
        }
      });
    }, { rootMargin: '-40% 0px -40% 0px' });

    headings.forEach(h => obs.observe(h));
    return () => obs.disconnect();
  }, []);

  // If twoColumn is requested and children contains dangerouslySetInnerHTML, parse headings
  let htmlString: string | null = null;
  if (twoColumn && React.isValidElement(children)) {
    const child: any = children as any;
    if (child.props && child.props.dangerouslySetInnerHTML && child.props.dangerouslySetInnerHTML.__html) {
      htmlString = child.props.dangerouslySetInnerHTML.__html as string;
    }
  }

  let parsedHtml = htmlString;
  const toc: { id: string; title: string }[] = [];

  if (htmlString) {
    // Remove images to keep layout clean
    htmlString = htmlString.replace(/<img[^>]*>/gi, '');

    // Inject ids into h2 elements and collect TOC
    parsedHtml = htmlString.replace(/<h2([^>]*)>(.*?)<\/h2>/gi, (match, attrs, inner) => {
      const text = inner.replace(/<[^>]+>/g, '').trim();
      const id = slugify(text || 'section');
      toc.push({ id, title: text });
      return `<h2 id="${id}"${attrs}>${inner}</h2>`;
    });
  }

  return (
    <div className="bg-[#020202] min-h-screen text-[#888]">
      <Navbar />

      <div className="pt-40 pb-20 px-6 max-w-7xl mx-auto legal-content">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-2 uppercase">{title}</h1>
          <p className="text-sm font-bold text-[#64189D] tracking-widest uppercase">Última actualización: {lastUpdated}</p>
        </div>

        {twoColumn && parsedHtml ? (
          <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-8">
            <aside className="hidden md:block sticky top-28 max-h-[70vh] overflow-auto pr-4">
                  <nav className="legal-toc space-y-3">
                    {toc.map((item, idx) => (
                      <a key={item.id} href={`#${item.id}`} className="flex items-center gap-3 text-base md:text-lg text-[#bbb] hover:text-white px-2 py-1 rounded transition-colors">
                        <span className="inline-flex w-8 h-8 items-center justify-center rounded-md bg-white/5 font-bold text-sm text-[#e9e6ff]">{String(idx+1).padStart(2,'0')}</span>
                        <span className="truncate">{item.title}</span>
                      </a>
                    ))}
                  </nav>
                </aside>

            <div className="prose prose-invert prose-p:leading-relaxed prose-h2:text-white prose-h2:font-bold prose-h2:mt-10 prose-a:text-[#64189D] max-w-none">
              <div dangerouslySetInnerHTML={{ __html: parsedHtml }} />
            </div>
          </div>
        ) : (
          <div className="prose prose-invert prose-p:leading-relaxed prose-h2:text-white prose-h2:font-bold prose-h2:mt-10 prose-a:text-[#64189D] max-w-none">
            {children}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
