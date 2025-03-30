// middleware.ts
import { auth } from "@/auth";
import { NextResponse, NextRequest } from "next/server";

export default async function middleware(request: NextRequest) {
  const session = await auth();
  const { pathname, origin } = request.nextUrl;
  // API Routes - Just check session
  if (pathname.includes("/api/dashboard") && !session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Page Routes (existing logic)
  if (pathname.startsWith("/dashboard") && !session?.user) {
    return NextResponse.redirect(`${origin}/login`);
  }

  if (session?.user && pathname === "/login") {
    return NextResponse.redirect(`${origin}/dashboard`);
  }
  return NextResponse.next();
}

// Apply middleware to all routes except static files and API routes
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
