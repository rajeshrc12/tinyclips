import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/auth";

// Public routes that don't require authentication
// const publicPages: string[] = ["/about", "/contact"];
// const loginPage: string = "/login";
// const defaultLoggedRedirect: string = "/";

const publicApiRoutes: string[] = ["/api/public", "/api/auth/callback/google", "/api/auth/callback/github", "/api/auth/session"];

export async function middleware(req: NextRequest): Promise<NextResponse> {
  try {
    const session = await auth();
    const {
      pathname,
      // origin
    } = req.nextUrl;

    const isApiRoute: boolean = pathname.startsWith("/api");

    //  Fix: Do not redirect API requests
    if (isApiRoute) {
      if (!session && !publicApiRoutes.includes(pathname)) {
        return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
          status: 401,
          headers: { "Content-Type": "application/json" },
        });
      }
      return NextResponse.next();
    }

    //  Fix: Ensure redirects apply only to pages
    // if (session && (publicPages.includes(pathname) || pathname === loginPage)) {
    //   return NextResponse.redirect(`${origin}${defaultLoggedRedirect}`);
    // }

    // if (!session && !publicPages.includes(pathname) && pathname !== loginPage) {
    //   return NextResponse.redirect(`${origin}${loginPage}`);
    // }

    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);
    return NextResponse.next();
  }
}

//  Apply middleware only to pages and API routes (excluding static files)
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
