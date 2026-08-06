const fs = require('fs');
const path = require('path');

const publicImagesDir = path.join('e:', 'AstralixNodes', 'public', 'assets', 'images');
const holyNextDir = path.join('e:', 'AstralixNodes', 'www.holy.gg', '_next');

// For each .jpg file in public/assets/images that's still a placeholder,
// check if we have a .avif version from the holy.gg template and copy it as the .jpg
const logoPlaceholder = path.join(publicImagesDir, 'logo-h-square.png');
let placeholderSize = 0;
if (fs.existsSync(logoPlaceholder)) {
    placeholderSize = fs.statSync(logoPlaceholder).size;
}

const publicImages = fs.readdirSync(publicImagesDir);
let fixed = 0;

for (const img of publicImages) {
    const imgPath = path.join(publicImagesDir, img);
    const stat = fs.statSync(imgPath);
    
    // If it's a placeholder (same size as the logo placeholder)
    if (placeholderSize > 0 && stat.size === placeholderSize && img !== 'logo-h-square.png') {
        const baseName = path.parse(img).name;
        
        // Try to find .avif version in holyNextDir
        const avifPath = path.join(holyNextDir, baseName + '.avif');
        const pngPath = path.join(holyNextDir, baseName + '.png');
        const jpgPath = path.join(holyNextDir, baseName + '.jpg');
        
        if (fs.existsSync(avifPath)) {
            fs.copyFileSync(avifPath, imgPath);
            console.log(`Fixed ${img} -> copied ${baseName}.avif`);
            fixed++;
        } else if (fs.existsSync(pngPath)) {
            fs.copyFileSync(pngPath, imgPath);
            console.log(`Fixed ${img} -> copied ${baseName}.png`);
            fixed++;
        } else if (fs.existsSync(jpgPath)) {
            fs.copyFileSync(jpgPath, imgPath);
            console.log(`Fixed ${img} -> copied ${baseName}.jpg`);
            fixed++;
        } else {
            console.log(`STILL MISSING: ${img} (no alternative found in holy.gg/_next)`);
        }
    }
}

console.log(`\nFixed ${fixed} placeholder images`);
