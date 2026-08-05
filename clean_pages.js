const fs = require('fs');
const path = require('path');

const files = [
  'e:/AstralixNodes/app/juegos/page.tsx',
  'e:/AstralixNodes/app/minecraft/page.tsx',
  'e:/AstralixNodes/app/dedicados/page.tsx',
  'e:/AstralixNodes/app/nosotros/page.tsx'
];

for (const file of files) {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace /_next/image?url=... with the decoded URL
    content = content.replace(/\/_next\/image\?url=([^&"]+)&[^"]*/g, (match, p1) => {
      try {
        return decodeURIComponent(p1);
      } catch (e) {
        return match;
      }
    });

    // Also replace holy.gg specific yellow color #F0C800 with our primary #64189D
    content = content.replace(/#F0C800/gi, '#64189D');
    // And its hover color #D4B000 with #7b1dc2
    content = content.replace(/#D4B000/gi, '#7b1dc2');

    // Also some hardcoded prices with the new currency context would be nice, but since it's inside dangerouslySetInnerHTML, we just leave it or replace static currencies later if needed. The prompt says "todas las imagenes y enlaces" and "colores fuera del branding".
    
    fs.writeFileSync(file, content);
    console.log(`Cleaned ${file}`);
  }
}
