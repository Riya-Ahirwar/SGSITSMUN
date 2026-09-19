import { NextResponse } from "next/server";

const PROTECTED_WRITE_PATHS = [
  "/api/past-editions",
  "/api/upload",
  "/api/secretariat",
];

export function middleware(req) {
  const { pathname } = req.nextUrl;
  const cookie = req.cookies.get("admin_session")?.value;
  const isAuthed = cookie && cookie === process.env.ADMIN_PASSWORD;

  // Let the login page/route and GET requests through untouched.
  if (pathname === "/admin/login" || pathname === "/api/admin/login") {
    return NextResponse.next();
  }

  const isProtectedWrite =
    req.method === "POST" && PROTECTED_WRITE_PATHS.some((p) => pathname.startsWith(p));
  const isAdminPage = pathname.startsWith("/admin");

  if ((isProtectedWrite || isAdminPage) && !isAuthed) {
    if (isAdminPage) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/past-editions/:path*", "/api/upload/:path*", "/api/secretariat/:path*"],
};
