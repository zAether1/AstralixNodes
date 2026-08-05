const fs = require('fs');

const html = fs.readFileSync('e:/AstralixNodes/www.holy.gg/index.htm', 'utf8');
const start = html.indexOf('<section class="py-24 px-6 relative overflow-hidden"');
if (start !== -1) {
    const end = html.indexOf('</section>', start) + 10;
    let sectionHtml = html.substring(start, end);
    sectionHtml = sectionHtml.replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
    
    const tsx = `import React, { useEffect } from 'react';

export default function FeaturesHighlights() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible', 'in-view');
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'none';
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal, [style*="opacity: 0"]').forEach(el => observer.observe(el));
    
    setTimeout(() => {
      document.querySelectorAll('.reveal, [style*="opacity: 0"]').forEach(el => {
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
    fs.writeFileSync('e:/AstralixNodes/app/components/FeaturesHighlights.tsx', tsx, 'utf8');
    console.log('Successfully replaced FeaturesHighlights.tsx');
} else {
    // try searching for "DESCUBRE POR"
    const start2 = html.indexOf('DESCUBRE POR QU');
    if (start2 !== -1) {
      // Find the <section> before it
      const sectionStart = html.lastIndexOf('<section', start2);
      const sectionEnd = html.indexOf('</section>', start2) + 10;
      let sectionHtml = html.substring(sectionStart, sectionEnd);
      sectionHtml = sectionHtml.replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
      
      const tsx = `import React, { useEffect } from 'react';

export default function FeaturesHighlights() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible', 'in-view');
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'none';
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal, [style*="opacity: 0"]').forEach(el => observer.observe(el));
    
    setTimeout(() => {
      document.querySelectorAll('.reveal, [style*="opacity: 0"]').forEach(el => {
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
      fs.writeFileSync('e:/AstralixNodes/app/components/FeaturesHighlights.tsx', tsx, 'utf8');
      console.log('Successfully replaced FeaturesHighlights.tsx');
    } else {
      console.log('Could not find Destacado section');
    }
}
