const fs = require('fs');

const extractLocations = () => {
  const content = fs.readFileSync('e:/AstralixNodes/app/components/LocationsSection.tsx', 'utf8');
  const startSvg = content.indexOf('<svg');
  const endSvg = content.indexOf('</svg>', startSvg) + 6;
  let svg = content.substring(startSvg, endSvg);
  
  // Clean up the SVG for React
  svg = svg.replace(/class=/g, 'className=');
  svg = svg.replace(/href=/g, 'href=');
  svg = svg.replace(/preserveAspectRatio/g, 'preserveAspectRatio');
  
  // We need to extract the ping lists too
  const startList = content.indexOf('<div class="grid');
  const endList = content.indexOf('<div class="relative w-full aspect-[2/1]">');
  let list = content.substring(startList, endList);
  
  list = list.replace(/class=/g, 'className=');
  list = list.replace(/style="([^"]*)"/g, (match, styleString) => {
    // very basic style to object converter for react
    const styleObj = {};
    styleString.split(';').forEach(s => {
      if (!s) return;
      const [k, v] = s.split(':');
      if (!k || !v) return;
      const key = k.trim().replace(/-([a-z])/g, (m, c) => c.toUpperCase());
      styleObj[key] = v.trim();
    });
    return `style={${JSON.stringify(styleObj)}}`;
  });
  
  fs.writeFileSync('e:/AstralixNodes/extracted_map.js', `
  module.exports = {
    list: \`${list.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`,
    svg: \`${svg.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`
  }
  `);
};

extractLocations();
