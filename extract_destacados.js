const fs = require('fs');
const html = fs.readFileSync('e:/AstralixNodes/www.holy.gg/index.htm', 'utf8');
const start = html.indexOf('id="destacados"');
if (start !== -1) {
    console.log(html.substring(start, start + 3000));
} else {
    // If no ID "destacados", let's search for some game names like "Project Zomboid" or "Palworld" inside the slider
    const zIndex = html.indexOf('Project Zomboid');
    console.log("Looking around Project Zomboid:");
    console.log(html.substring(zIndex - 1000, zIndex + 2000));
}
