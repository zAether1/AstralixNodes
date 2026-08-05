import React, { useEffect } from 'react';
import HolyHeaderStatic from "./components/holy/HolyHeaderStatic";
import HolyFooterStatic from "./components/holy/HolyFooterStatic";
import HolySection1 from "./components/holy/HolySection1"
import HolySection3 from "./components/holy/HolySection3"
import HolySection4 from "./components/holy/HolySection4"
import HolySection5 from "./components/holy/HolySection5"
import HolySection6 from "./components/holy/HolySection6"
import HolySection7 from "./components/holy/HolySection7"
import HolySection8 from "./components/holy/HolySection8"
import HolySection9 from "./components/holy/HolySection9"
import HolySection10 from "./components/holy/HolySection10"

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
      <HolySection1 />
      <HolySection3 />
      <HolySection4 />
      <HolySection5 />
      <HolySection6 />
      <HolySection7 />
      <HolySection8 />
      <HolySection9 />
      <HolySection10 />
      <HolyFooterStatic />
    </div>
  )
}
