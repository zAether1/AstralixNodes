import React from 'react';
import LegalTemplate from '../components/LegalTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Políticas de Privacidad | AstralixNodes',
  description: 'Políticas de Privacidad de los servicios de infraestructura de AstralixNodes.',
};

export default function PrivacidadPage() {
  return (
    <LegalTemplate title="Políticas de Privacidad" lastUpdated="10 de Mayo, 2026" twoColumn>
      <div dangerouslySetInnerHTML={{ __html: `<h2>1. Recopilación de Información</h2>
<p>Recopilamos información que usted nos proporciona directamente, como cuando crea una cuenta, se suscribe a nuestro boletín, solicita soporte al cliente o interactúa con nosotros.</p>

<h2>2. Uso de la Información</h2>
<p>Utilizamos la información recopilada para proporcionar, mantener y mejorar nuestros servicios, procesar transacciones, enviar avisos técnicos, actualizaciones y alertas de seguridad, y responder a sus comentarios y preguntas.</p>

<h2>3. Protección de Datos</h2>
<p>AstralixNodes toma medidas razonables para ayudar a proteger la información sobre usted de pérdida, robo, mal uso y acceso no autorizado, divulgación, alteración y destrucción. Utilizamos cifrado estándar de la industria (SSL/TLS) para proteger la transmisión de datos sensibles.</p>

<h2>4. Cookies y Tecnologías Similares</h2>
<p>Utilizamos cookies y tecnologías similares para mejorar su experiencia en nuestro sitio, analizar tendencias, administrar el sitio, rastrear los movimientos de los usuarios en el sitio y recopilar información demográfica sobre nuestra base de usuarios en su conjunto.</p>

<h2>5. Retención de Datos</h2>
<p>Retendremos su información personal durante el tiempo que sea necesario para cumplir con los fines descritos en esta Política de Privacidad, a menos que la ley exija o permita un período de retención más prolongado.</p>` }} />
    </LegalTemplate>
  );
}
