const fs = require('fs/promises');
const path = require('path');

async function fixImages() {
  const dir = path.join(__dirname, 'app', 'components', 'holy');
  const files = await fs.readdir(dir);

  for (const file of files) {
    if (file.startsWith('Holy') && file.endsWith('.tsx')) {
      const fullPath = path.join(dir, file);
      let content = await fs.readFile(fullPath, 'utf8');
      
      // Fix image optimizer paths
      // Example: src="/holy_assets/_next/image?url=%2Fassets%2Fimages%2Fgames%2Fminecraft-cover-widget.png&amp;w=640&amp;q=75"
      // We want to extract %2Fassets... and decode it
      
      content = content.replace(/srcSet="\/holy_assets\/_next\/image\?url=([^&]+)[^"]*"/g, (match, url) => {
        return `srcSet="/holy_assets\${decodeURIComponent(url)} 1x"`;
      });
      
      content = content.replace(/src="\/holy_assets\/_next\/image\?url=([^&]+)[^"]*"/g, (match, url) => {
        return `src="/holy_assets\${decodeURIComponent(url)}"`;
      });

      await fs.writeFile(fullPath, content, 'utf8');
      console.log('Fixed', file);
    }
  }
}

fixImages().catch(console.error);
