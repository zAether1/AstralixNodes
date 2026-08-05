const fs = require('fs');
const path = require('path');

const walkSync = (dir, filelist = []) => {
  try {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const dirFile = path.join(dir, file);
      try {
        if (fs.statSync(dirFile).isDirectory()) {
          filelist = walkSync(dirFile, filelist);
        } else {
          if (dirFile.endsWith('.tsx') || dirFile.endsWith('.ts') || dirFile.endsWith('.css')) {
            filelist.push(dirFile);
          }
        }
      } catch (e) {}
    }
  } catch (e) {}
  return filelist;
};

const files = walkSync('e:/AstralixNodes/app');
let changes = 0;

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let newContent = content;
  
  newContent = newContent.replace(/#F0C800/gi, '#64189D');
  newContent = newContent.replace(/#D4B000/gi, '#7b1dc2');
  newContent = newContent.replace(/#FFF000/gi, '#64189D'); // Also used in Holy.gg sometimes
  
  if (newContent !== content) {
    fs.writeFileSync(file, newContent);
    changes++;
    console.log(`Updated colors in ${file}`);
  }
}
console.log(`Finished, modified ${changes} files.`);
