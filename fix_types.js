const fs = require('fs');
const path = require('path');

const pages = ['minecraft', 'juegos', 'dedicados', 'nosotros'];

for (const page of pages) {
  const filePath = path.join(__dirname, 'app', page, 'page.tsx');
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Fix: entry.target.classList -> (entry.target as HTMLElement).classList
    content = content.replace(
      /entry\.target\.classList\.add\('visible', 'in-view', 'animate-in'\);\s*entry\.target\.style\.opacity = '1';\s*entry\.target\.style\.transform = 'none';/g,
      `const el = entry.target as HTMLElement;
          el.classList.add('visible', 'in-view', 'animate-in');
          el.style.opacity = '1';
          el.style.transform = 'none';`
    );
    
    // Fix: querySelectorAll forEach el.style -> cast to HTMLElement
    content = content.replace(
      /document\.querySelectorAll\('\[style\*="opacity: 0"\], \[style\*="opacity:0"\]'\)\.forEach\(el => observer\.observe\(el\)\)/g,
      `document.querySelectorAll<HTMLElement>('[style*="opacity: 0"], [style*="opacity:0"]').forEach(el => observer.observe(el))`
    );
    
    content = content.replace(
      /document\.querySelectorAll\('\[style\*="opacity: 0"\], \[style\*="opacity:0"\]'\)\.forEach\(el => \{/g,
      `document.querySelectorAll<HTMLElement>('[style*="opacity: 0"], [style*="opacity:0"]').forEach((el) => {`
    );
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Fixed TypeScript types in ${page}/page.tsx`);
  }
}
