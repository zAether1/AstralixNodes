import React, { useEffect } from 'react';
import HolyHeaderStatic from "./components/holy/HolyHeaderStatic";
import HolyFooterStatic from "./components/holy/HolyFooterStatic";
import HolySection1 from "./components/holy/HolySection1"\nimport HolySection2 from "./components/holy/HolySection2"\nimport HolySection3 from "./components/holy/HolySection3"\nimport HolySection4 from "./components/holy/HolySection4"\nimport HolySection5 from "./components/holy/HolySection5"\nimport HolySection6 from "./components/holy/HolySection6"\nimport HolySection7 from "./components/holy/HolySection7"\nimport HolySection8 from "./components/holy/HolySection8"\nimport HolySection9 from "./components/holy/HolySection9"\nimport HolySection10 from "./components/holy/HolySection10"

export default function Home() {
  useEffect(() => {
    // Basic IntersectionObserver to trigger 'in-view' animations if they exist
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible', 'in-view', 'animate-in');
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'none';
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('[style*="opacity: 0"], [style*="opacity:0"]').forEach(el => observer.observe(el));
    
    // Attempt to reveal anything hidden by default
    setTimeout(() => {
      document.querySelectorAll('[style*="opacity: 0"], [style*="opacity:0"]').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'none';
        el.style.transition = 'all 0.8s ease-out';
      });
    }, 500);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#020202]">
      <HolyHeaderStatic />
      <HolySection1 />\n      <HolySection2 />\n      <HolySection3 />\n      <HolySection4 />\n      <HolySection5 />\n      <HolySection6 />\n      <HolySection7 />\n      <HolySection8 />\n      <HolySection9 />\n      <HolySection10 />
      <HolyFooterStatic />
    </div>
  )
}
