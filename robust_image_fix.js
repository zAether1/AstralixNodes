const fs = require('fs');
const path = require('path');

const appDir = path.join('e:', 'AstralixNodes', 'app');
const holyDir = path.join('e:', 'AstralixNodes', 'www.holy.gg');
const publicImagesDir = path.join('e:', 'AstralixNodes', 'public', 'assets', 'images');

// Ensure public images dir exists
fs.mkdirSync(publicImagesDir, { recursive: true });

function walkSync(dir, filelist = []) {
    try {
        const files = fs.readdirSync(dir);
        for (const file of files) {
            const dirFile = path.join(dir, file);
            try {
                if (fs.statSync(dirFile).isDirectory()) {
                    filelist = walkSync(dirFile, filelist);
                } else {
                    filelist.push(dirFile);
                }
            } catch (e) {}
        }
    } catch (e) {}
    return filelist;
}

const allHolyFiles = walkSync(holyDir);
const holyImageMap = new Map();
// Build a map of filename -> fullpath for quick lookups
for (const file of allHolyFiles) {
    if (file.match(/\.(png|jpe?g|gif|svg|webp|avif)$/i)) {
        const name = path.basename(file);
        if (!holyImageMap.has(name)) {
            holyImageMap.set(name, file);
        }
    }
}

function processTsxFiles() {
    const tsxFiles = walkSync(appDir).filter(f => f.endsWith('.tsx') || f.endsWith('.ts'));
    let totalReplacements = 0;
    let missingImages = new Set();

    for (const file of tsxFiles) {
        let content = fs.readFileSync(file, 'utf8');
        let newContent = content;

        // 1. Remove all srcset completely since they just confuse local paths when hardcoded
        newContent = newContent.replace(/srcSet="[^"]*"/g, '');

        // 2. Clean up /_next/image?url=...
        newContent = newContent.replace(/\/_next\/image\?url=([^&"'\s]+)[^"'\s]*/g, (match, encodedUrl) => {
            try {
                let decoded = decodeURIComponent(encodedUrl);
                // If it's a full URL (cdn.holy.gg), we keep the filename
                let fileName = decoded.split('/').pop().split('?')[0];
                return `/assets/images/${fileName}`;
            } catch (e) {
                return match;
            }
        });

        // 3. For any <img src="something"> we want to ensure it points to /assets/images/ if it's local
        const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
        let match;
        while ((match = imgRegex.exec(newContent)) !== null) {
            const src = match[1];
            if (src.startsWith('http')) {
                // If external and from holy.gg, we should change it to local
                if (src.includes('holy.gg')) {
                    const fileName = src.split('/').pop().split('?')[0];
                    newContent = newContent.replace(src, `/assets/images/${fileName}`);
                    missingImages.add(fileName); // We assume it was downloaded by previous script or is in holyDir
                }
            } else if (src.startsWith('/')) {
                // Normalize all local paths to /assets/images/
                const fileName = src.split('/').pop().split('?')[0];
                if (src !== `/assets/images/${fileName}` && src.includes('assets')) {
                    newContent = newContent.replace(src, `/assets/images/${fileName}`);
                }
            }
        }

        // Try to find any /assets/images/filename occurrences and copy the file
        const finalImgRegex = /\/assets\/images\/([^"'\s\?]+)/g;
        while ((match = finalImgRegex.exec(newContent)) !== null) {
            const fileName = match[1];
            const destFile = path.join(publicImagesDir, fileName);
            if (!fs.existsSync(destFile)) {
                // Look in our map
                if (holyImageMap.has(fileName)) {
                    fs.copyFileSync(holyImageMap.get(fileName), destFile);
                    console.log(`Copied ${fileName} from holy template.`);
                } else {
                    missingImages.add(fileName);
                }
            }
        }

        if (newContent !== content) {
            fs.writeFileSync(file, newContent);
            totalReplacements++;
        }
    }

    console.log(`Updated images in ${totalReplacements} files.`);
    if (missingImages.size > 0) {
        console.log(`Still missing these images:`, Array.from(missingImages));
    }
}

processTsxFiles();
