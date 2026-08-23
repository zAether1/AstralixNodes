import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Rutas de juegos que están "ocultas" — devuelven 404 públicamente
const PROTECTED_GAME_ROUTES = [
  '/juegos',
  '/project-zomboid',
  '/palworld',
  '/hytale',
  '/valheim',
  '/terraria',
  '/ark',
  '/fivem',
  '/rust',
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtected = PROTECTED_GAME_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  if (isProtected) {
    // Devuelve un 404 limpio — la página no "existe" para el público
    return new NextResponse(null, { status: 404 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/juegos/:path*',
    '/project-zomboid/:path*',
    '/palworld/:path*',
    '/hytale/:path*',
    '/valheim/:path*',
    '/terraria/:path*',
    '/ark/:path*',
    '/fivem/:path*',
    '/rust/:path*',
  ],
};
