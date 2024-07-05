import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isLoggedIn = request.cookies.get("auth_session");

  if (isLoggedIn) {
    if (pathname === "/register" || pathname === "/login") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  } else {
    if (pathname === "/dashboard" || pathname === "/write") {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
