// middleware.ts
import { auth } from "@/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default async function middleware(request: NextRequest) {
  const session = await auth();
  const { pathname, origin } = request.nextUrl;
  const loginPage: string = "/login";
  const defaultLoggedRedirect: string = "/dashboard";
  // Check if the route starts with /dashboard
  if (pathname.startsWith("/dashboard")) {
    // If user is not logged in, redirect to login
    if (!session?.user) {
      return NextResponse.redirect(`${origin}${loginPage}`);
    }
  }
  // Redirect logged-in users away from login/signup pages
  if (session?.user && ["/login"].includes(pathname)) {
    return NextResponse.redirect(`${origin}${defaultLoggedRedirect}`);
  }
  return NextResponse.next();
}

// Apply middleware to all routes except static files and API routes
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
