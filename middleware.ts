import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Cek apakah user sedang mencoba mengakses halaman /admin (kecuali halaman login)
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const authCookie = request.cookies.get("admin_session");

    // Jika tidak ada cookie sesi yang valid, arahkan kembali ke halaman login
    if (!authCookie || authCookie.value !== "authenticated") {
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Jika mencoba mengakses halaman login tapi sudah login, arahkan ke /admin
  if (pathname === "/admin/login") {
    const authCookie = request.cookies.get("admin_session");
    if (authCookie && authCookie.value === "authenticated") {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
