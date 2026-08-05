const fs = require('fs');

const html = fs.readFileSync('e:/AstralixNodes/www.holy.gg/index.htm', 'utf8');
const start = html.indexOf('<section id="cobertura"');
if (start !== -1) {
    const end = html.indexOf('</section>', start) + 10;
    let sectionHtml = html.substring(start, end);
    sectionHtml = sectionHtml.replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
    
    // Replace the LocationsSection component completely with this one
    // But we probably want to keep the export default function LocationsSection name
    
    const tsx = `import React, { useEffect } from 'react';

export default function LocationsSection() {
  useEffect(() => {
    // If there is any JS logic for the map in the original, we can just execute standard holy.gg script here
    // or let the CSS handle the map dots.
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible', 'in-view');
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'none';
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('#cobertura [style*="opacity: 0"], #cobertura [style*="opacity:0"]').forEach(el => observer.observe(el));
    
    setTimeout(() => {
      document.querySelectorAll('#cobertura [style*="opacity: 0"], #cobertura [style*="opacity:0"]').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'none';
        el.style.transition = 'all 0.8s ease-out';
      });
    }, 500);

    return () => observer.disconnect();
  }, []);

  return (
    <div dangerouslySetInnerHTML={{ __html: \`${sectionHtml}\` }} />
  );
}
`;
    fs.writeFileSync('e:/AstralixNodes/app/components/LocationsSection.tsx', tsx, 'utf8');
    console.log('Successfully replaced LocationsSection.tsx with the exact holy.gg cobertura section.');
} else {
    console.log('Could not find cobertura section');
}
