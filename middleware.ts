import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const cookie = request.cookies.get("next-auth.session-token");
  const isLoggedIn = cookie?.value;
  const isProtectedRoute = request.nextUrl.pathname.includes("/dashboard");
  const isLoginRoute = request.nextUrl.pathname.includes("/login");
  if (!isLoggedIn && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", request.nextUrl.origin));
  }
  if (isLoggedIn && isLoginRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.nextUrl.origin));
  }
  return NextResponse.next();
}
