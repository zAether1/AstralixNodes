const fs = require('fs');
const path = require('path');
const https = require('https');

const publicImagesDir = path.join('e:', 'AstralixNodes', 'public', 'assets', 'images');

const missingImages = [
  'header-minecraft.avif',
  'astralixnodes-banner-largo.png',
  'row1-1.webp', 'row1-2.webp', 'row1-3.webp', 'row1-4.webp', 'row1-5.webp', 'row1-6.webp', 'row1-7.webp', 'row1-8.webp',
  'row2-1.webp', 'row2-2.webp', 'row2-3.webp', 'row2-4.webp', 'row2-5.webp', 'row2-6.webp', 'row2-7.webp', 'row2-8.webp',
  'minecraft.jpg', 'hytale.jpg', '7-days-to-die.jpg', 'abiotic-factor.jpg', 'ark-survival-evolved.jpg', 'core-keeper.jpg',
  'project-zomboid.jpg', 'soulmask.jpg', 'valheim.jpg', 'american-truck-simulator.jpg', 'aneurism-iv.jpg', 'arma-reforger.jpg',
  'conan-exiles.jpg', 'counter-strike-source.jpg', 'dont-starve-together.jpg', 'enshrouded.jpg', 'euro-truck-simulator-2.jpg',
  'factorio.jpg', 'garrys-mod.jpg', 'killing-floor-2.jpg', 'mindustry.jpg', 'mordhau.jpg', 'palworld.jpg', 'rust.jpg',
  'satisfactory.jpg', 'scum.jpg', 'sons-of-the-forest.jpg', 'space-engineers.jpg', 'squad.jpg', 'team-fortress-2.jpg',
  'terraria.jpg', 'the-forest.jpg', 'tmodloader.jpg', 'unturned.jpg', 'vrising.jpg',
  'minecraft-hero-bg.webp', 'amd-ryzen-processor.png', 'nosotros-hero-bg.avif',
  'tamara1001.avif', 'vyuri.avif', 'axozer.avif', 'juegagerman.avif'
];

const baseUrlPatterns = [
    'https://holy.gg/assets/images/',
    'https://holy.gg/assets/images/games/',
    'https://cdn.holy.gg/afiliados/',
    'https://cdn.holy.gg/juegos/',
    'https://cdn.holy.gg/partners/'
];

function downloadFile(url, dest) {
    return new Promise((resolve, reject) => {
        https.get(url, (response) => {
            if (response.statusCode === 200) {
                const file = fs.createWriteStream(dest);
                response.pipe(file);
                file.on('finish', () => {
                    file.close();
                    resolve(true);
                });
            } else {
                resolve(false);
            }
        }).on('error', (err) => {
            resolve(false);
        });
    });
}

async function fetchMissingImages() {
    for (let img of missingImages) {
        if (img.includes(')')) img = img.replace(')', ''); // fix typo in array
        
        // Skip our own banner since it won't exist on holy.gg, we will generate or copy it later
        if (img === 'astralixnodes-banner-largo.png') continue;
        if (img === 'AstralixNodes-banner-largo.png') continue;

        const destPath = path.join(publicImagesDir, img);
        if (fs.existsSync(destPath)) {
            console.log(`${img} already exists`);
            continue;
        }

        let downloaded = false;
        for (const baseUrl of baseUrlPatterns) {
            const url = baseUrl + img;
            console.log(`Trying ${url}...`);
            const success = await downloadFile(url, destPath);
            if (success) {
                console.log(`Downloaded ${img} from ${url}`);
                downloaded = true;
                break;
            }
        }
        
        if (!downloaded) {
            console.log(`FAILED TO DOWNLOAD: ${img}`);
            // Let's create a dummy blank image or copy a default so there are NO 404s
            const defaultImg = path.join(publicImagesDir, 'logo-h-square.png');
            if (fs.existsSync(defaultImg)) {
                fs.copyFileSync(defaultImg, destPath);
                console.log(`Created placeholder for ${img}`);
            }
        }
    }
}

fetchMissingImages().then(() => console.log('Done'));
