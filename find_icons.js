const fs = require('fs');
const html = fs.readFileSync('e:/AstralixNodes/www.holy.gg/index.htm', 'utf8');

const regex = /<div class="[^"]*w-12 h-12[^"]*">([\s\S]*?)<\/div>/g;
let m;
let count = 0;
while ((m = regex.exec(html)) !== null && count < 5) {
    console.log('MATCH:', m[1]);
    count++;
}
