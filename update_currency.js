const fs = require('fs');
const path = require('path');

function replaceCurrency(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      replaceCurrency(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes('$')) {
        // Only replace $ followed by numbers or spaces and numbers, e.g., "$ 5", "$5.00"
        // Also "$/mo" etc. Let's just replace all instances of '$' with '€' inside text strings.
        // Actually, $ is used in JS templates like `${var}`. 
        // We must NOT replace `${`
        
        let newContent = content.replace(/\$(?!\{)/g, '€');
        if (newContent !== content) {
          fs.writeFileSync(fullPath, newContent, 'utf8');
          console.log(`Updated currency in ${fullPath}`);
        }
      }
    }
  }
}

replaceCurrency(path.join(__dirname, 'app'));
