const fs = require('fs/promises');
const path = require('path');

async function fixBrokenImages() {
  const dir = path.join(__dirname, 'app', 'components', 'holy');
  const files = await fs.readdir(dir);

  for (const file of files) {
    if (file.endsWith('.tsx')) {
      const fullPath = path.join(dir, file);
      let content = await fs.readFile(fullPath, 'utf8');
      let original = content;

      // Fix the broken pattern: /holy_assets${decodeURIComponent(url)}
      // This was incorrectly inserted by fix_images.js
      // The original srcSet had patterns like:
      //   /holy_assets/_next/image?url=%2Fassets%2Fimages%2Fcreators%2Fshadoune.png&w=384&q=75
      // fix_images.js tried to extract the url param but broke it
      // We need to replace these with direct paths to the actual images

      // Pattern 1: srcSet="/holy_assets${decodeURIComponent(url)} 1x"
      // Replace with empty srcSet or remove srcSet entirely
      content = content.replace(/srcSet="\/holy_assets\$\{decodeURIComponent\(url\)\} 1x"/g, '');
      
      // Pattern 2: src="/holy_assets${decodeURIComponent(url)}"
      // Replace with a placeholder image path
      content = content.replace(/src="\/holy_assets\$\{decodeURIComponent\(url\)\}"/g, 'src="/icons/AstralixNodes.png"');

      if (content !== original) {
        await fs.writeFile(fullPath, content, 'utf8');
        console.log('Fixed', file);
      }
    }
  }
}

fixBrokenImages().catch(console.error);
