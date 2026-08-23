import { redirect } from 'next/navigation';

// Redirige temporalmente al inicio mientras se construye la sección de Extras
export default function ExtrasPage() {
  redirect('/');
}
