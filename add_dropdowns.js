const fs = require('fs');

const svgCube = `<svg class="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>`;
const svgServer = `<svg class="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"></path></svg>`;
const svgDomain = `<svg class="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path></svg>`;
const svgHeadset = `<svg class="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>`;
const svgTerminal = `<svg class="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>`;
const svgUsers = `<svg class="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>`;
const svgHandshake = `<svg class="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>`;
const svgContact = `<svg class="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>`;
const svgStatus = `<svg class="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>`;
const svgTerms = `<svg class="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>`;

function renderDropdownItem(icon, title, subtitle, tag='') {
  return `
  <a class="flex items-center gap-3 p-3 rounded-lg bg-[#141414] hover:bg-[#1e1e1e] transition-colors" href="#">
    <div class="w-10 h-10 flex-shrink-0 bg-[#64189D] rounded-full flex items-center justify-center">
      ${icon}
    </div>
    <div class="min-w-0 flex-1">
      <div class="flex items-center gap-2">
        <div class="text-white font-bold text-sm leading-tight">${title}</div>
        ${tag ? `<span class="bg-[#64189D] text-black text-[10px] font-bold px-1.5 py-0.5 rounded">${tag}</span>` : ''}
      </div>
      ${subtitle ? `<div class="text-[#999] text-xs mt-1">Comenzando en <span class="text-white font-bold">$${subtitle}</span></div>` : ''}
    </div>
  </a>`;
}

function renderSimpleDropdownItem(icon, title) {
  return `
  <a class="flex items-center gap-3 p-2 rounded-lg hover:bg-[#1e1e1e] transition-colors" href="#">
    <div class="w-6 h-6 flex-shrink-0 text-[#64189D] flex items-center justify-center">
      ${icon.replace('text-black', 'currentColor')}
    </div>
    <div class="text-white font-medium text-sm">${title}</div>
  </a>`;
}

const minecraftDropdown = `
<div class="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[22rem] opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-300">
  <div class="bg-[#1a1b1b] rounded-xl border border-white/[0.08] p-3 flex flex-col gap-2">
    ${renderDropdownItem(svgCube, 'Minecraft Hosting', '4,24', 'POPULAR')}
    ${renderDropdownItem(svgServer, 'Minecraft Dedicado', '21,08')}
  </div>
</div>`;

const cloudDropdown = `
<div class="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[22rem] opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-300">
  <div class="bg-[#1a1b1b] rounded-xl border border-white/[0.08] p-3 flex flex-col gap-2">
    ${renderDropdownItem(svgDomain, 'Registrar un Dominio', '1,69')}
    ${renderDropdownItem(svgHeadset, 'Servidor de Voz', '2,54')}
    ${renderDropdownItem(svgServer, 'VPS Hosting Premium', '6,46')}
    ${renderDropdownItem(svgTerminal, 'Discord Bot Hosting', '1,27')}
  </div>
</div>`;

const nosotrosDropdown = `
<div class="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[40rem] opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-300">
  <div class="bg-[#1a1b1b] rounded-xl border border-white/[0.08] p-5 grid grid-cols-4 gap-6">
    <div>
      <h3 class="text-white font-bold mb-3 text-sm">AstralixNodes</h3>
      <div class="flex flex-col gap-1">
        ${renderSimpleDropdownItem(svgUsers, 'Acerca de Nosotros')}
        ${renderSimpleDropdownItem(svgCube, 'Nuestro Branding')}
        ${renderSimpleDropdownItem(svgServer, "We're Hiring")}
      </div>
    </div>
    <div>
      <h3 class="text-white font-bold mb-3 text-sm">Programas</h3>
      <div class="flex flex-col gap-1">
        ${renderSimpleDropdownItem(svgHandshake, 'Programa de Afiliados')}
      </div>
    </div>
    <div>
      <h3 class="text-white font-bold mb-3 text-sm">Asistencia</h3>
      <div class="flex flex-col gap-1">
        ${renderSimpleDropdownItem(svgContact, 'Contacto')}
        ${renderSimpleDropdownItem(svgStatus, 'Estado de la Red')}
      </div>
    </div>
    <div>
      <h3 class="text-white font-bold mb-3 text-sm">Legal</h3>
      <div class="flex flex-col gap-1">
        ${renderSimpleDropdownItem(svgTerms, 'Términos y Condiciones')}
        ${renderSimpleDropdownItem(svgTerms, 'Política de Privacidad')}
        ${renderSimpleDropdownItem(svgTerms, 'Acuerdo de Nivel de Servicio')}
      </div>
    </div>
  </div>
</div>`;

let html = fs.readFileSync('app/components/holy/HolyHeaderStatic.tsx', 'utf-8');

html = html.replace(
  /<div class="relative"><a class="flex items-center gap-1 py-6 text-white font-bold text-sm hover:text-\[#64189D\] transition-colors whitespace-nowrap" href="\/minecraft">Minecraft Hosting<svg[^>]+>.*?<\/svg><\/a><\/div>/s,
  `<div class="relative group"><a class="flex items-center gap-1 py-6 text-white font-bold text-sm hover:text-[#64189D] transition-colors whitespace-nowrap cursor-pointer" href="/minecraft">Minecraft Hosting<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></a>${minecraftDropdown}</div>`
);

html = html.replace(
  /<div class="relative"><button class="flex items-center gap-1 py-6 text-white font-bold text-sm hover:text-\[#64189D\] transition-colors whitespace-nowrap">Cloud Hosting<svg[^>]+>.*?<\/svg><\/button><\/div>/s,
  `<div class="relative group"><button class="flex items-center gap-1 py-6 text-white font-bold text-sm hover:text-[#64189D] transition-colors whitespace-nowrap">Cloud Hosting<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button>${cloudDropdown}</div>`
);

html = html.replace(
  /<div class="relative"><button class="flex items-center gap-1 py-6 text-white font-bold text-sm hover:text-\[#64189D\] transition-colors whitespace-nowrap">Nosotros<svg[^>]+>.*?<\/svg><\/button><\/div>/s,
  `<div class="relative group"><button class="flex items-center gap-1 py-6 text-white font-bold text-sm hover:text-[#64189D] transition-colors whitespace-nowrap">Nosotros<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button>${nosotrosDropdown}</div>`
);

html = html.replace(
  /<div class="relative"><button class="flex items-center gap-1 py-6 text-white font-bold text-sm hover:text-\[#64189D\] transition-colors whitespace-nowrap">Game Hosting/s,
  `<div class="relative group"><button class="flex items-center gap-1 py-6 text-white font-bold text-sm hover:text-[#64189D] transition-colors whitespace-nowrap">Game Hosting`
);
html = html.replace(
  /w-\[52rem\] opacity-0 pointer-events-none/s,
  `w-[52rem] opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-300 pt-2`
);

fs.writeFileSync('app/components/holy/HolyHeaderStatic.tsx', html);
console.log('Updated HolyHeaderStatic.tsx successfully');
