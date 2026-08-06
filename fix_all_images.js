const fs = require('fs');
const path = require('path');
const https = require('https');

const appDir = path.join('e:', 'AstralixNodes', 'app');
const publicDir = path.join('e:', 'AstralixNodes', 'public');
const assetsDir = path.join(publicDir, 'assets', 'images');
const holyDir = path.join('e:', 'AstralixNodes', 'www.holy.gg');

// Ensure assets dir exists
if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
}

function walkSync(dir, filelist = []) {
    try {
        const files = fs.readdirSync(dir);
        for (const file of files) {
            const dirFile = path.join(dir, file);
            try {
                if (fs.statSync(dirFile).isDirectory()) {
                    filelist = walkSync(dirFile, filelist);
                } else if (dirFile.endsWith('.tsx') || dirFile.endsWith('.ts')) {
                    filelist.push(dirFile);
                }
            } catch (e) {}
        }
    } catch (e) {}
    return filelist;
}

const files = walkSync(appDir);
let downloadQueue = [];

function downloadImage(url, dest) {
    return new Promise((resolve, reject) => {
        if (fs.existsSync(dest)) return resolve(); // Skip if already exists
        const file = fs.createWriteStream(dest);
        https.get(url, (response) => {
            if (response.statusCode === 200) {
                response.pipe(file);
                file.on('finish', () => {
                    file.close(resolve);
                });
            } else {
                fs.unlink(dest, () => {});
                console.log(`Failed to download ${url} - Status: ${response.statusCode}`);
                resolve(); // resolve anyway to keep script going
            }
        }).on('error', (err) => {
            fs.unlink(dest, () => {});
            console.log(`Error downloading ${url}: ${err.message}`);
            resolve();
        });
    });
}

async function processFiles() {
    let replacements = 0;
    
    // First pass: replace and gather downloads
    for (const file of files) {
        let content = fs.readFileSync(file, 'utf8');
        let newContent = content;

        // 1. Replace cdn.holy.gg
        // Extract all cdn.holy.gg URLs
        const cdnRegex = /https?:\/\/cdn\.holy\.gg\/([^"'\s]+)/g;
        let match;
        while ((match = cdnRegex.exec(content)) !== null) {
            const fullUrl = match[0];
            const relativePath = match[1]; // e.g. afiliados/natsuki.jpg
            const fileName = relativePath.split('/').pop();
            const localPath = `/assets/images/${fileName}`;
            const destPath = path.join(assetsDir, fileName);
            
            downloadQueue.push({ url: fullUrl, dest: destPath });
            // Replace in content
            newContent = newContent.replace(new RegExp(fullUrl, 'g'), localPath);
        }

        // 2. Fix /_next/image?url=...
        const nextImgRegex = /\/_next\/image\?url=([^&"'\s]+)[^"'\s]*/g;
        while ((match = nextImgRegex.exec(content)) !== null) {
            const fullMatch = match[0];
            try {
                let decodedUrl = decodeURIComponent(match[1]); // e.g. /assets/images/header-minecraft.avif
                
                if (decodedUrl.startsWith('http')) {
                    // It's a full URL, download it if it's cdn.holy.gg
                    if (decodedUrl.includes('cdn.holy.gg')) {
                        const fileName = decodedUrl.split('/').pop();
                        const localPath = `/assets/images/${fileName}`;
                        downloadQueue.push({ url: decodedUrl, dest: path.join(assetsDir, fileName) });
                        newContent = newContent.replace(fullMatch, localPath);
                    }
                } else {
                    // It's a local path
                    newContent = newContent.replace(fullMatch, decodedUrl);
                    
                    // Check if we need to copy this file from www.holy.gg
                    const targetFile = path.join(publicDir, decodedUrl);
                    if (!fs.existsSync(targetFile)) {
                        const sourceFile = path.join(holyDir, decodedUrl);
                        if (fs.existsSync(sourceFile)) {
                            // Ensure directory exists
                            fs.mkdirSync(path.dirname(targetFile), { recursive: true });
                            fs.copyFileSync(sourceFile, targetFile);
                        } else {
                            // Check _next/static/media inside holyDir?
                            // This gets complicated, let's just search the holy.gg recursively for the filename later
                        }
                    }
                }
            } catch (e) {}
        }
        
        // 3. Fix standard missing /assets/images files by searching holyDir
        const localImgRegex = /\/assets\/images\/([^"'\s]+)/g;
        while ((match = localImgRegex.exec(newContent)) !== null) {
             const fileName = match[1].split('/').pop();
             const destFile = path.join(assetsDir, fileName);
             if (!fs.existsSync(destFile)) {
                 // Try copying from www.holy.gg/assets/images
                 const srcFile = path.join(holyDir, 'assets', 'images', fileName);
                 if (fs.existsSync(srcFile)) {
                     fs.copyFileSync(srcFile, destFile);
                 }
             }
        }

        if (newContent !== content) {
            fs.writeFileSync(file, newContent);
            replacements++;
        }
    }
    
    console.log(`Updated ${replacements} files with cleaned image paths.`);
    
    // Download queue
    console.log(`Downloading ${downloadQueue.length} files...`);
    for (const item of downloadQueue) {
        await downloadImage(item.url, item.dest);
    }
    console.log('Download complete.');
}

processFiles();
