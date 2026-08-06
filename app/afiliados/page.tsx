import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Programa de Afiliados | AstralixNodes',
  description: 'Únete a nuestro programa de afiliados y obtén ingresos recurrentes recomendando los mejores servidores.',
};

export default function AfiliadosPage() {
  return (
    <div className="bg-[#020202] min-h-screen text-[#888]">
      <Navbar />
      <div className="pt-40 pb-20 px-6 max-w-[87.5rem] mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight mb-4">Programa de Afiliados</h1>
          <p className="text-lg text-[#999] max-w-2xl mx-auto">Únete a nuestro programa de afiliados y obtén ingresos recurrentes recomendando los mejores servidores.</p>
        </div>
        <div className="text-center">
      <h2 className="text-3xl text-white font-black mb-4">Gana hasta 15% de comisión recurrente</h2>
      <p className="text-[#888] mb-8">Por cada cliente que traigas, recibirás un porcentaje mensual mientras mantengan su servicio activo.</p>
      <a href="https://clientes.astralixnodes.com/affiliates.php" className="inline-block bg-[#64189D] text-white px-8 py-3 rounded-lg font-bold">Activar Cuenta de Afiliado</a>
    </div>
      </div>
      <Footer />
    </div>
  );
}
