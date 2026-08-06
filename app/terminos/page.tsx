import React from 'react';
import LegalTemplate from '../components/LegalTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Términos y Condiciones | AstralixNodes',
  description: 'Términos y Condiciones de los servicios de infraestructura de AstralixNodes.',
};

export default function TerminosPage() {
  return (
    <LegalTemplate title="Términos y Condiciones" lastUpdated="10 de Mayo, 2026">
      <div dangerouslySetInnerHTML={{ __html: `<h2>1. Aceptación de los Términos</h2>
<p>Al acceder y utilizar los servicios de AstralixNodes, usted acepta estar sujeto a estos términos y condiciones. Si no está de acuerdo con alguna parte de estos términos, no podrá acceder al servicio.</p>

<h2>2. Uso del Servicio</h2>
<p>AstralixNodes provee infraestructura de servidores y hosting. Usted es responsable de mantener la seguridad de su cuenta y contraseña. AstralixNodes no puede y no será responsable por ninguna pérdida o daño derivado de su incumplimiento de esta obligación de seguridad.</p>

<h2>3. Pagos y Facturación</h2>
<p>Los servicios se facturan por adelantado en base a suscripciones. No hay reembolsos por pagos parciales de meses de servicio, reembolsos de actualización/degradación, o reembolsos por meses sin uso con una cuenta abierta.</p>

<h2>4. Cancelación y Terminación</h2>
<p>Usted es el único responsable de la correcta cancelación de su cuenta. Una solicitud por correo electrónico o teléfono para cancelar su cuenta no se considera una cancelación. Puede cancelar su cuenta en cualquier momento haciendo clic en el enlace de Cancelar Cuenta en el Panel de Control global.</p>

<h2>5. Modificaciones al Servicio y Precios</h2>
<p>AstralixNodes se reserva el derecho en cualquier momento de modificar o discontinuar, temporal o permanentemente, el Servicio (o cualquier parte de este) con o sin previo aviso.</p>` }} />
    </LegalTemplate>
  );
}
