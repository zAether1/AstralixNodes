import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nuestro Branding | AstralixNodes',
  description: 'Historia y evolución de AstralixNodes.',
};

export default function BrandingPage() {
  return (
    <div className="bg-[#020202] min-h-screen text-[#888]">
      <Navbar />
      <div className="pt-40 pb-20 px-6 max-w-[87.5rem] mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight mb-4">Nuestro Branding</h1>
          <p className="text-lg text-[#999] max-w-2xl mx-auto">Historia y evolución de AstralixNodes.</p>
        </div>
        <div>
      <h2 className="text-2xl text-white font-bold mb-4">La Evolución desde ZerithNodes</h2>
      <p className="text-[#888] mb-4">Nuestra historia comienza con ZerithNodes, una marca pionera. Hoy, AstralixNodes hereda ese legado de excelencia, mejorando la infraestructura y renovando nuestra imagen corporativa.</p>
      
      <h2 className="text-2xl text-white font-bold mt-8 mb-4">Identidad Visual</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-[#64189D] h-24 rounded-lg flex items-center justify-center text-white font-bold">#64189D</div>
        <div className="bg-[#180228] h-24 rounded-lg flex items-center justify-center text-white font-bold">#180228</div>
        <div className="bg-[#020202] h-24 rounded-lg flex items-center justify-center text-white border border-white/10 font-bold">#020202</div>
        <div className="bg-white h-24 rounded-lg flex items-center justify-center text-black font-bold">#FFFFFF</div>
      </div>
    </div>
      </div>
      <Footer />
    </div>
  );
}
