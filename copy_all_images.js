const fs = require('fs');
const path = require('path');

const publicImagesDir = path.join('e:', 'AstralixNodes', 'public', 'assets', 'images');
const holyNextDir = path.join('e:', 'AstralixNodes', 'www.holy.gg', '_next');
const holyAssetsDir = path.join('e:', 'AstralixNodes', 'www.holy.gg', 'assets', 'images');
const holyW40Dir = path.join('e:', 'AstralixNodes', 'www.holy.gg', 'w40');

function walkSync(dir, filelist = []) {
    try {
        const files = fs.readdirSync(dir);
        for (const file of files) {
            const dirFile = path.join(dir, file);
            try {
                if (fs.statSync(dirFile).isDirectory()) {
                    filelist = walkSync(dirFile, filelist);
                } else if (dirFile.match(/\.(png|jpe?g|gif|svg|webp|avif)$/i)) {
                    filelist.push(dirFile);
                }
            } catch (e) {}
        }
    } catch (e) {}
    return filelist;
}

// Build a complete index of every image in www.holy.gg
const allHolyImages = [
    ...walkSync(holyNextDir),
    ...walkSync(holyAssetsDir),
    ...walkSync(holyW40Dir)
];

const holyImageMap = new Map();
for (const file of allHolyImages) {
    const name = path.basename(file);
    // Convert hashed names like "tamara1001.abc123.png" -> "tamara1001.png"
    const cleanName = name.replace(/\.[a-f0-9]{6,}\./i, '.'); 
    if (!holyImageMap.has(name)) holyImageMap.set(name, file);
    if (!holyImageMap.has(cleanName)) holyImageMap.set(cleanName, file);
}

console.log(`Indexed ${holyImageMap.size} images from holy.gg template`);

// Now check every image referenced in public/assets/images
// and if it's a placeholder (same size as logo-h-square.png), replace it
const logoPlaceholder = path.join(publicImagesDir, 'logo-h-square.png');
let placeholderSize = 0;
if (fs.existsSync(logoPlaceholder)) {
    placeholderSize = fs.statSync(logoPlaceholder).size;
}

const publicImages = fs.readdirSync(publicImagesDir);
let replaced = 0;
let stillMissing = [];

for (const img of publicImages) {
    const imgPath = path.join(publicImagesDir, img);
    const stat = fs.statSync(imgPath);
    
    // If size matches placeholder, it means we failed to download it before
    if (placeholderSize > 0 && stat.size === placeholderSize && img !== 'logo-h-square.png') {
        // Try to find a real version
        // Try exact name first
        if (holyImageMap.has(img)) {
            fs.copyFileSync(holyImageMap.get(img), imgPath);
            console.log(`Replaced placeholder: ${img} with real image from holy.gg`);
            replaced++;
            continue;
        }
        
        // Try without extension and with different extensions
        const baseName = path.parse(img).name;
        const extensions = ['.png', '.avif', '.jpg', '.jpeg', '.webp'];
        let found = false;
        for (const ext of extensions) {
            const altName = baseName + ext;
            if (holyImageMap.has(altName)) {
                fs.copyFileSync(holyImageMap.get(altName), imgPath);
                console.log(`Replaced placeholder: ${img} with ${altName} from holy.gg`);
                replaced++;
                found = true;
                break;
            }
        }
        
        if (!found) {
            stillMissing.push(img);
        }
    }
}

// Also copy any images from holy.gg _next that we don't have yet
for (const [name, srcPath] of holyImageMap) {
    const destPath = path.join(publicImagesDir, name);
    if (!fs.existsSync(destPath)) {
        try {
            fs.copyFileSync(srcPath, destPath);
            console.log(`Copied new: ${name}`);
        } catch (e) {}
    }
}

console.log(`\nReplaced ${replaced} placeholders`);
if (stillMissing.length > 0) {
    console.log(`Still missing real images for: ${stillMissing.join(', ')}`);
}
console.log('Done.');
