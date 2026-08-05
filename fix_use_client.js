const fs = require('fs');
const path = require('path');

const pages = ['minecraft', 'juegos', 'dedicados', 'nosotros'];

for (const page of pages) {
  const filePath = path.join(__dirname, 'app', page, 'page.tsx');
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    if (!content.startsWith("'use client'")) {
      content = "'use client'\n\n" + content;
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Added 'use client' to ${page}/page.tsx`);
    } else {
      console.log(`${page}/page.tsx already has 'use client'`);
    }
  } else {
    console.log(`${page}/page.tsx not found`);
  }
}
