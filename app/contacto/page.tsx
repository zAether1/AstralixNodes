import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contacto | AstralixNodes',
  description: 'Ponte en contacto con nuestro equipo de soporte.',
};

export default function ContactoPage() {
  return (
    <div className="bg-[#020202] min-h-screen text-[#888]">
      <Navbar />
      <div className="pt-40 pb-20 px-6 max-w-[87.5rem] mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight mb-4">Contacto</h1>
          <p className="text-lg text-[#999] max-w-2xl mx-auto">Ponte en contacto con nuestro equipo de soporte.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <div>
        <h2 className="text-2xl text-white font-bold mb-4">Atención 24/7</h2>
        <p className="text-[#888] mb-6">Estamos aquí para ayudarte. Si tienes alguna duda sobre nuestros servicios de infraestructura, abre un ticket.</p>
        <div className="space-y-4">
          <a href="mailto:soporte@astralixnodes.com" className="flex items-center gap-3 text-white bg-white/5 p-4 rounded-lg hover:bg-white/10">📧 soporte@astralixnodes.com</a>
          <a href="https://discord.astralixnodes.com" className="flex items-center gap-3 text-white bg-[#5865F2]/20 p-4 rounded-lg hover:bg-[#5865F2]/30">👾 Comunidad de Discord</a>
        </div>
      </div>
      <div>
        <form className="space-y-4">
          <input type="text" placeholder="Tu Nombre" className="w-full bg-[#111] border border-white/10 p-3 rounded-lg text-white" />
          <input type="email" placeholder="Tu Correo" className="w-full bg-[#111] border border-white/10 p-3 rounded-lg text-white" />
          <textarea placeholder="Mensaje" rows={4} className="w-full bg-[#111] border border-white/10 p-3 rounded-lg text-white"></textarea>
          <button type="button" className="w-full bg-[#64189D] text-white font-bold py-3 rounded-lg">Enviar Mensaje</button>
        </form>
      </div>
    </div>
      </div>
      <Footer />
    </div>
  );
}
