import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Programa de Afiliados | AstralixNodes',
  description: 'Únete a nuestro programa de afiliados y obtén ingresos recurrentes recomendando los mejores servidores.',
};

export default function AfiliadosPage() {
  return (
    <div className="bg-[#020202] min-h-screen text-[#888]">
      <Navbar />

      <header className="pt-32 pb-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-black text-white uppercase tracking-tight mb-4">Únete y gana con AstralixNodes</h1>
          <p className="text-lg text-[#ddd] max-w-3xl mx-auto mb-8">Conviértete en socio, comparte con tu comunidad y recibe comisiones recurrentes. Programa pensado para creadores, streamers y comunidades activas.</p>
          <div className="flex items-center justify-center gap-4">
            <a href="https://discord.gg/6UMfyMM5pu" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-gradient-to-r from-[#ff7aa2] to-[#7b1dc2] text-white font-bold px-6 py-3 rounded-full shadow-xl transform hover:scale-105 transition">Unirme al Discord</a>
            <a href="https://clientes.astralixnodes.com/affiliates.php" className="inline-flex items-center gap-3 bg-white/5 text-white font-bold px-6 py-3 rounded-full border border-white/10">Crear Cuenta</a>
          </div>
        </div>
      </header>

      <main className="px-6 pb-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-[#0b0712] rounded-2xl p-8 border border-white/6">
            <h2 className="text-2xl text-white font-black mb-4">¿Cómo funciona?</h2>
            <ol className="list-decimal list-inside space-y-4 text-[#ccc]">
              <li>
                <strong className="text-white">Regístrate</strong> como afiliado y obtén tus enlaces personalizados.
              </li>
              <li>
                <strong className="text-white">Comparte</strong> el enlace con tu comunidad (streams, redes, foros).
              </li>
              <li>
                <strong className="text-white">Gana</strong> comisión recurrente mientras los clientes sigan activos.
              </li>
              <li>
                <strong className="text-white">Recibe</strong> pagos mensuales y reportes claros en tu panel de afiliado.
              </li>
            </ol>

            <section className="mt-8">
              <h3 className="text-xl text-white font-bold mb-3">Beneficios</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#080416] p-4 rounded-lg border border-white/6">
                  <h4 className="text-white font-bold">Comisión Recurrente</h4>
                  <p className="text-[#bbb] text-sm">Hasta 15% por cliente mientras el servicio permanezca activo.</p>
                </div>
                <div className="bg-[#080416] p-4 rounded-lg border border-white/6">
                  <h4 className="text-white font-bold">Soporte Dedicado</h4>
                  <p className="text-[#bbb] text-sm">Acceso prioritario a nuestro equipo para resolver consultas de tus referidos.</p>
                </div>
                <div className="bg-[#080416] p-4 rounded-lg border border-white/6">
                  <h4 className="text-white font-bold">Herramientas</h4>
                  <p className="text-[#bbb] text-sm">Banners, enlaces y material promocional listo para usar.</p>
                </div>
                <div className="bg-[#080416] p-4 rounded-lg border border-white/6">
                  <h4 className="text-white font-bold">Pagos</h4>
                  <p className="text-[#bbb] text-sm">Pagos mensuales transparentes mediante métodos seleccionables.</p>
                </div>
              </div>
            </section>
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-32 bg-[#0b0712] p-6 rounded-2xl border border-white/6">
              <h4 className="text-white font-bold mb-3">Quick Stats</h4>
              <div className="text-[#ccc] text-sm space-y-2">
                <div><strong className="text-white">15%</strong> Comisión máxima</div>
                <div><strong className="text-white">Soporte</strong> Prioritario</div>
                <div><strong className="text-white">Material</strong> Gratis</div>
              </div>
                <div className="mt-6">
                  <a href="https://clientes.astralixnodes.com/affiliates.php" className="block text-center bg-gradient-to-r from-[#7b1dc2] to-[#ff7aa2] text-white px-4 py-3 rounded-lg font-bold">Crear Cuenta</a>
                  <a href="https://discord.gg/6UMfyMM5pu" target="_blank" rel="noopener noreferrer" className="block text-center mt-3 bg-white text-[#180228] px-4 py-3 rounded-lg font-bold">Hablar con Nosotros</a>
                </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
