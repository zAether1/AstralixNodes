import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-[#08080a] text-white border-t border-white/[0.06] relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#9000FA]/5 blur-[120px] pointer-events-none rounded-full"></div>
      
      <div className="max-w-[1320px] mx-auto px-6 pt-20 pb-10 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 mb-16">

          <div className="lg:max-w-[320px] flex-shrink-0">
            <Link href="/" className="flex items-center gap-3 mb-6 group inline-flex">
              <Image
                alt="AstralixNodes"
                width={42}
                height={40}
                className="rounded-lg shadow-[0_0_15px_rgba(144,0,250,0.3)] transition-transform group-hover:scale-105"
                src="/icons/AstralixNodes.png"
              />
              <div>
                <span className="text-xl font-bold text-white leading-tight block tracking-tight">AstralixNodes</span>
                <span className="text-[13px] font-medium text-zinc-500 leading-tight block">Hosting premium de alto rendimiento</span>
              </div>
            </Link>

            <p className="text-zinc-400 text-sm leading-relaxed mb-6">
              Proveemos soluciones de infraestructura premium para gamers y comunidades exigentes, con hardware de última generación y protección Anti-DDoS avanzada.
            </p>

            <div className="flex items-center gap-3">
              <a href="#" className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.06] text-zinc-400 hover:text-white hover:bg-white/[0.08] hover:border-white/[0.12] transition-all duration-300" aria-label="X (Twitter)">
                <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>
              </a>
              <a target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.06] text-zinc-400 hover:text-[#5865F2] hover:bg-[#5865F2]/10 hover:border-[#5865F2]/30 transition-all duration-300" aria-label="Discord" href="https://discord.gg/zmc2VbFCCp">
                <svg className="w-[20px] h-[20px]" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"></path></svg>
39:               </a>
40:               <a href="#" className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.06] text-zinc-400 hover:text-white hover:bg-white/[0.08] hover:border-white/[0.12] transition-all duration-300" aria-label="TikTok">
41:                 <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"></path></svg>
42:               </a>
43:             </div>
44:           </div>
45: 
46:           <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-8 lg:gap-10">
47:             <div className="min-w-0">
48:               <h3 className="text-white font-bold text-sm tracking-widest mb-6">SERVICIOS</h3>
49:               <ul className="space-y-3.5">
50:                 <li><Link className="text-zinc-400 hover:text-white text-sm transition-colors duration-200" href="/minecraft">Minecraft Hosting</Link></li>
51:                 <li><Link className="text-zinc-400 hover:text-white text-sm transition-colors duration-200" href="/dedicado">Servidores Dedicados</Link></li>
52:                 <li><Link className="text-zinc-400 hover:text-white text-sm transition-colors duration-200" href="/discord-bot">Discord Bot Hosting</Link></li>
53:                 <li><Link className="text-zinc-400 hover:text-white text-sm transition-colors duration-200" href="/juegos">Otros Juegos</Link></li>
54:                 <li><Link className="text-zinc-400 hover:text-white text-sm transition-colors duration-200" href="/ts3">TeamSpeak / Voice</Link></li>
55:               </ul>
56:             </div>
57: 
58:             <div className="min-w-0">
59:               <h3 className="text-white font-bold text-sm tracking-widest mb-6">COMPAÑÍA</h3>
60:               <ul className="space-y-3.5">
61:                 <li><Link className="text-zinc-400 hover:text-white text-sm transition-colors duration-200" href="/about">Acerca de nosotros</Link></li>
62:                 <li><a target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white text-sm transition-colors duration-200" href="https://clientes.astralixnodes.com/">Área de clientes</a></li>
63:                 <li><Link className="text-zinc-400 hover:text-white text-sm transition-colors duration-200" href="/metodos-de-pago">Métodos de pago</Link></li>
64:                 <li><Link className="text-zinc-400 hover:text-white text-sm transition-colors duration-200" href="/hardware">Hardware y Red</Link></li>
65:               </ul>
66:             </div>
67: 
68:             <div className="col-span-2 md:col-span-1 min-w-0">
69:               <h3 className="text-white font-bold text-sm tracking-widest mb-6">RECURSOS</h3>
70:               <ul className="space-y-3.5">
71:                 <li><a target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white text-sm transition-colors duration-200" href="https://ticket.astralixnodes.com">Soporte y Tickets</a></li>
72:                 <li><Link className="text-zinc-400 hover:text-white text-sm transition-colors duration-200" href="/faq">Base de conocimientos</Link></li>
73:                 <li><a target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white text-sm transition-colors duration-200" href="https://estado.astralixnodes.com">Estado del sistema</a></li>
74:                 <li>
75:                   <Link className="group inline-flex items-center gap-2 text-zinc-400 hover:text-white text-sm transition-colors duration-200" href="/afiliados">
76:                     Programa de Afiliados
77:                     <span className="px-1.5 py-0.5 rounded text-[9px] font-bold tracking-wider bg-[#9000FA]/20 text-[#9000FA] border border-[#9000FA]/30">NUEVO</span>
78:                   </Link>
79:                 </li>
80:               </ul>
81:             </div>
82:           </div>
83:         </div>
84: 
85:         <div className="border-t border-white/[0.06] pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
86:           <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
87:             <Link className="text-zinc-500 hover:text-zinc-300 transition-colors" href="/legal/tos">Términos</Link>
88:             <Link className="text-zinc-500 hover:text-zinc-300 transition-colors" href="/legal/privacy">Privacidad</Link>
89:             <Link className="text-zinc-500 hover:text-zinc-300 transition-colors" href="/legal/sla">SLA</Link>
90:             <Link className="text-zinc-500 hover:text-zinc-300 transition-colors" href="/legal/copyright">Copyright</Link>
91:           </div>
92: 
93:           <div className="flex flex-col sm:flex-row items-center gap-4">
94:             <p className="text-zinc-500 text-sm">
95:               © {new Date().getFullYear()} AstralixNodes. Todos los derechos reservados.
96:             </p>
97:             <a href="https://www.dmca.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 border border-white/10 rounded-lg bg-white/[0.02] px-3 py-1.5 hover:border-[#9000FA]/50 hover:bg-[#9000FA]/5 transition-all duration-300">
98:               <svg className="w-4 h-4 text-[#9000FA]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path></svg>
99:               <span className="text-zinc-300 font-bold text-xs tracking-wider">DMCA PROTECTED</span>
100:             </a>
101:           </div>
102:         </div>
103:       </div>
104:     </footer>
105:   );
106: }
