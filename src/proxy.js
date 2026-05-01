import { NextResponse } from "next/server";

export function middleware(request) {
  const userId = request.cookies.get("userId")?.value;
  const isLoginPage = request.nextUrl.pathname.startsWith("/login");

  // Protect all routes except /login and static assets/api
  if (!userId && !isLoginPage && !request.nextUrl.pathname.startsWith("/api") && !request.nextUrl.pathname.includes(".")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (userId && isLoginPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
