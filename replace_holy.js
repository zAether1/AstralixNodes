const fs = require('fs');
const path = require('path');

const appDir = path.join('e:', 'AstralixNodes', 'app');

function walkSync(dir, filelist = []) {
    try {
        const files = fs.readdirSync(dir);
        for (const file of files) {
            const dirFile = path.join(dir, file);
            try {
                if (fs.statSync(dirFile).isDirectory()) {
                    filelist = walkSync(dirFile, filelist);
                } else if (dirFile.endsWith('.tsx') || dirFile.endsWith('.ts') || dirFile.endsWith('.json') || dirFile.endsWith('.css') || dirFile.endsWith('.html')) {
                    filelist.push(dirFile);
                }
            } catch (e) {}
        }
    } catch (e) {}
    return filelist;
}

const files = walkSync(appDir);
let replacements = 0;

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    let newContent = content;

    newContent = newContent.replace(/HolyHosting/gi, 'AstralixNodes');
    newContent = newContent.replace(/Holy Hosting/gi, 'AstralixNodes');
    newContent = newContent.replace(/holy\.gg/gi, 'astralixnodes.com');
    newContent = newContent.replace(/Holy/g, 'Astralix'); // Be careful, but user said all Holy -> AstralixNodes or Astralix

    if (newContent !== content) {
        fs.writeFileSync(file, newContent);
        replacements++;
    }
}

console.log(`Replaced text in ${replacements} files.`);
