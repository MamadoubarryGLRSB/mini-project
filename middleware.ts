import { NextResponse, type NextRequest } from 'next/server';

const protectedRoutes = ['create-new-article'];

export default function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname.split('/');
  const session = request.cookies.get('session')?.value;
  const isAuth = session ? JSON.parse(session!)?.isAuth : false;

  console.log(path);

  if (protectedRoutes.includes(path[1]) && !isAuth) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)']
};
