const fs = require('fs/promises');
const path = require('path');

async function extractSections() {
  const htmlPath = path.join(__dirname, 'public', 'index.html');
  const html = await fs.readFile(htmlPath, 'utf8');

  // Match all <section> tags
  const sectionRegex = /<section[^>]*>([\s\S]*?)<\/section>/gi;
  let match;
  let i = 1;
  const sections = [];

  while ((match = sectionRegex.exec(html)) !== null) {
    let content = match[0];
    content = content.replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
    const name = `HolySection${i}`;
    const tsx = `import React from 'react';

export default function ${name}() {
  return (
    <div dangerouslySetInnerHTML={{ __html: \`${content}\` }} />
  );
}
`;
    await fs.writeFile(path.join(__dirname, 'app', 'components', 'holy', `${name}.tsx`), tsx, 'utf8');
    console.log(`Generated ${name}.tsx`);
    sections.push(name);
    i++;
  }

  // Generate a page.tsx that includes them all in order
  const imports = sections.map(s => `import ${s} from "./components/holy/${s}"`).join('\\n');
  const components = sections.map(s => `      <${s} />`).join('\\n');

  // Also include header and footer
  const headerMatch = html.match(/<header[^>]*>([\s\S]*?)<\/header>/i);
  if (headerMatch) {
    let content = headerMatch[0].replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
    const tsx = `import React from 'react';
export default function HolyHeaderStatic() { return <div dangerouslySetInnerHTML={{ __html: \`${content}\` }} />; }`;
    await fs.writeFile(path.join(__dirname, 'app', 'components', 'holy', 'HolyHeaderStatic.tsx'), tsx, 'utf8');
  }

  const footerMatch = html.match(/<footer[^>]*>([\s\S]*?)<\/footer>/i);
  if (footerMatch) {
    let content = footerMatch[0].replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
    const tsx = `import React from 'react';
export default function HolyFooterStatic() { return <div dangerouslySetInnerHTML={{ __html: \`${content}\` }} />; }`;
    await fs.writeFile(path.join(__dirname, 'app', 'components', 'holy', 'HolyFooterStatic.tsx'), tsx, 'utf8');
  }

  const pageTsx = `import React, { useEffect } from 'react';
import HolyHeaderStatic from "./components/holy/HolyHeaderStatic";
import HolyFooterStatic from "./components/holy/HolyFooterStatic";
${imports}

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
${components}
      <HolyFooterStatic />
    </div>
  )
}
`;
  await fs.writeFile(path.join(__dirname, 'app', 'page.tsx'), pageTsx, 'utf8');
  console.log('Updated app/page.tsx');
}

extractSections().catch(console.error);
