const fs = require('fs/promises');
const path = require('path');

async function processPage(htmlFileName, pageDir) {
  const htmlPath = path.join(__dirname, 'www.holy.gg', htmlFileName);
  try {
    const html = await fs.readFile(htmlPath, 'utf8');

    let content = '';
    const mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
    if (mainMatch) {
      content = mainMatch[1];
    } else {
      const headerEnd = html.indexOf('</header>');
      const footerStart = html.indexOf('<footer');
      if (headerEnd !== -1 && footerStart !== -1) {
        content = html.substring(headerEnd + 9, footerStart);
      } else {
        content = html; // fallback
      }
    }

    // Replace $ with €
    content = content.replace(/\$/g, '€');
    // Escape backticks and template literals
    content = content.replace(/`/g, '\\`').replace(/\$\{/g, '\\${');

    const tsx = `import React, { useEffect } from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Page() {
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
      <Navbar />
      <main dangerouslySetInnerHTML={{ __html: \`${content}\` }} />
      <Footer />
    </div>
  )
}
`;

    const dirPath = path.join(__dirname, 'app', pageDir);
    await fs.mkdir(dirPath, { recursive: true });
    await fs.writeFile(path.join(dirPath, 'page.tsx'), tsx, 'utf8');
    console.log(`Generated app/${pageDir}/page.tsx from ${htmlFileName}`);
  } catch (err) {
    console.error(`Failed to process ${htmlFileName}: ${err.message}`);
  }
}

async function main() {
  await processPage('minecraft.html', 'minecraft');
  await processPage('juegos.html', 'juegos');
  await processPage('dedicados.html', 'dedicados');
  await processPage('nosotros.html', 'nosotros');
}

main().catch(console.error);
