const fs = require('fs/promises');
const path = require('path');

async function fixPaths() {
  const sourceDir = path.join('e:', 'AstralixNodes', 'www.holy.gg');
  const targetDir = path.join('e:', 'AstralixNodes', 'public', 'holy_assets');

  // Skip copy step as it was handled by robocopy

  // Rename physical files that were broken by the blanket text replacement
  try {
    await fs.rename(
      path.join(targetDir, 'assets', 'images', 'holyhosting-banner-largo.png'),
      path.join(targetDir, 'assets', 'images', 'astralixnodes-banner-largo.png')
    );
    console.log('Renamed banner');
  } catch (e) {}

  try {
    await fs.rename(
      path.join(targetDir, 'assets', 'holyhosting.zip'),
      path.join(targetDir, 'assets', 'astralixnodes.zip')
    );
    console.log('Renamed zip');
  } catch (e) {}

  let patchCount = 0;

  async function patchDir(dir) {
    let items;
    try { items = await fs.readdir(dir); } catch(e) { return; }
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = await fs.stat(fullPath);
      if (stat.isDirectory()) {
        await patchDir(fullPath);
      } else if (item.endsWith('.js') || item.endsWith('.css')) {
        let content = await fs.readFile(fullPath, 'utf8');
        let original = content;
        
        // Colors
        content = content.replace(/#F0C800/gi, '#64189D');
        content = content.replace(/#D4B000/gi, '#3A0E5C');
        content = content.replace(/#ffd91a/gi, '#8229C7');
        content = content.replace(/#FFDA1F/gi, '#8229C7');
        content = content.replace(/#D5B200/gi, '#64189D');
        content = content.replace(/#9B8200/gi, '#3A0E5C');
        content = content.replace(/#FFD700/gi, '#8229C7');
        content = content.replace(/#e6c200/gi, '#5a1587');
        content = content.replace(/#ccac00/gi, '#4a1170');
        
        // Branding text
        content = content.replace(/HolyHosting/g, 'AstralixNodes');
        content = content.replace(/holyhosting/g, 'astralixnodes');
        content = content.replace(/holy\.gg/g, 'astralixnodes.com');
        
        // PATHS!
        content = content.replace(/\/_next\//g, '/holy_assets/_next/');
        content = content.replace(/\/assets\//g, '/holy_assets/assets/');
        content = content.replace(/\/images\//g, '/holy_assets/images/');
        content = content.replace(/\/media\//g, '/holy_assets/media/');
        
        // Logos in JS
        content = content.replace(/\/holy_assets\/assets\/images\/logo-h\.avif/g, '/icons/AstralixNodes.png');
        content = content.replace(/\/holy_assets\/assets\/images\/logo-h-square\.png/g, '/icons/AstralixNodes.png');
        content = content.replace(/\/holy_assets\/images\/logo-h\.avif/g, '/icons/AstralixNodes.png');
        content = content.replace(/\/holy_assets\/images\/logo-h-square\.png/g, '/icons/AstralixNodes.png');
        
        if (content !== original) {
          await fs.writeFile(fullPath, content, 'utf8');
          patchCount++;
        }
      }
    }
  }

  console.log('Patching files...');
  await patchDir(path.join(targetDir, '_next'));
  console.log(`Patched ${patchCount} CSS/JS files`);
  
  // Repatch index.html just in case
  let html = await fs.readFile(path.join(sourceDir, 'index.htm'), 'utf8');
  html = html.replace(/\/_next\//g, '/holy_assets/_next/');
  html = html.replace(/\/assets\//g, '/holy_assets/assets/');
  html = html.replace(/\/images\//g, '/holy_assets/images/');
  html = html.replace(/\/media\//g, '/holy_assets/media/');
  html = html.replace(/"\/favicon\.png"/g, '"/holy_assets/favicon.png"');
  html = html.replace(/"\/apple-touch-icon\.png"/g, '"/holy_assets/apple-touch-icon.png"');
  html = html.replace(/"\/icon-192\.png"/g, '"/holy_assets/icon-192.png"');

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
  html = html.replace(/HolyHosting/gi, 'AstralixNodes');
  html = html.replace(/holyhosting/gi, 'astralixnodes');
  html = html.replace(/holy\.gg/gi, 'astralixnodes.com');

  // Logo replacement
  html = html.replace(/\/holy_assets\/assets\/images\/logo-h\.avif/g, '/icons/AstralixNodes.png');
  html = html.replace(/\/holy_assets\/assets\/images\/logo-h-square\.png/g, '/icons/AstralixNodes.png');
  html = html.replace(/\/holy_assets\/images\/logo-h\.avif/g, '/icons/AstralixNodes.png');
  html = html.replace(/\/holy_assets\/images\/logo-h-square\.png/g, '/icons/AstralixNodes.png');

  await fs.writeFile(path.join('e:', 'AstralixNodes', 'public', 'index.html'), html, 'utf8');
  console.log('Saved index.html');
  console.log('All done');
}

fixPaths().catch(console.error);
