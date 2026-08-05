const fs = require('fs/promises');
const path = require('path');

async function fixImages() {
  const sourcePath = path.join(__dirname, 'www.holy.gg', 'index.htm');
  const publicPath = path.join(__dirname, 'public', 'index.html');
  
  console.log('Reading www.holy.gg/index.htm...');
  let html = await fs.readFile(sourcePath, 'utf8');

  // Prefix generic paths ONLY if they are not already prefixed
  html = html.replace(/(?<!\/holy_assets)\/_next\//g, '/holy_assets/_next/');
  html = html.replace(/(?<!\/holy_assets)\/assets\//g, '/holy_assets/assets/');
  html = html.replace(/(?<!\/holy_assets\/assets)\/images\//g, '/holy_assets/images/');
  html = html.replace(/(?<!\/holy_assets)\/media\//g, '/holy_assets/media/');
  html = html.replace(/"\/favicon\.png"/g, '"/holy_assets/favicon.png"');
  html = html.replace(/"\/apple-touch-icon\.png"/g, '"/holy_assets/apple-touch-icon.png"');
  html = html.replace(/"\/icon-192\.png"/g, '"/holy_assets/icon-192.png"');

  // Fix Next.js image URLs
  html = html.replace(/srcSet="\/holy_assets\/_next\/image\?url=([^&]+)[^"]*"/g, (match, url) => {
    return `srcSet="/holy_assets${decodeURIComponent(url)} 1x"`;
  });
  
  html = html.replace(/src="\/holy_assets\/_next\/image\?url=([^&]+)[^"]*"/g, (match, url) => {
    return `src="/holy_assets${decodeURIComponent(url)}"`;
  });

  // Colors branding
  html = html.replace(/#F0C800/gi, '#64189D');
  html = html.replace(/#D4B000/gi, '#3A0E5C');
  html = html.replace(/#ffd91a/gi, '#8229C7');
  html = html.replace(/#FFDA1F/gi, '#8229C7');
  html = html.replace(/#D5B200/gi, '#64189D');
  html = html.replace(/#9B8200/gi, '#3A0E5C');
  html = html.replace(/#FFD700/gi, '#8229C7');
  html = html.replace(/#e6c200/gi, '#5a1587');
  html = html.replace(/#ccac00/gi, '#4a1170');

  // Text branding
  html = html.replace(/HolyHosting/g, 'AstralixNodes');
  html = html.replace(/holyhosting/g, 'astralixnodes');
  html = html.replace(/Holy Hosting/g, 'AstralixNodes');
  html = html.replace(/holy\.gg/g, 'astralixnodes.com');
  html = html.replace(/Holy/g, 'Astralix');

  // Logo replacement AFTER we've decoded the Next.js URLs
  html = html.replace(/\/holy_assets\/assets\/images\/logo-h\.avif/g, '/icons/AstralixNodes.png');
  html = html.replace(/\/holy_assets\/assets\/images\/logo-h-square\.png/g, '/icons/AstralixNodes.png');
  html = html.replace(/\/holy_assets\/images\/logo-h\.avif/g, '/icons/AstralixNodes.png');
  html = html.replace(/\/holy_assets\/images\/logo-h-square\.png/g, '/icons/AstralixNodes.png');

  // Let's also fix the SVG world map href manually just in case
  html = html.replace(/href="\/holy_assets\/assets\/holy_assets\/images\/world-map\.svg"/g, 'href="/holy_assets/assets/images/world-map.svg"');
  // Or globally any double holy_assets
  html = html.replace(/\/holy_assets\/assets\/holy_assets\/images\//g, '/holy_assets/assets/images/');

  await fs.writeFile(publicPath, html, 'utf8');
  console.log('Saved public/index.html with decoded image URLs!');
}

fixImages().catch(console.error);
