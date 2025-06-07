import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req: NextRequestWithAuth) {
    const { pathname } = req.nextUrl;
    const token      = req.nextauth.token;
    const role       = token?.role;
    const path       = pathname.replace(/\/$/, "");           // strip trailing /

    /* ------------------------------------------------------------------
       1.  Public, unauthenticated API routes
    ------------------------------------------------------------------ */
    const freePost = ["/api/users", "/api/contact", "/api/waitlist"];
    if (req.method === "POST" && freePost.includes(path)) return NextResponse.next();

    const freeGet  = ["/api/page"];
    if (req.method === "GET" && freeGet.some(p => path.startsWith(p))) return NextResponse.next();

    /* ------------------------------------------------------------------
       2.  Admin / moderator–only API routes
    ------------------------------------------------------------------ */
    const adminOnlyAPIs = ["/api/users", "/api/contact", "/api/waitlist"];
    if (adminOnlyAPIs.some(p => path.startsWith(p))) {
      if (!token || (role !== "admin" && role !== "moderator")) {
        return new NextResponse(JSON.stringify({ message: "Forbidden" }), {
          status: 403,
          headers: { "Content-Type": "application/json" }
        });
      }
      return NextResponse.next();
    }

    /* ------------------------------------------------------------------
       3.  All other API routes require any authenticated user
    ------------------------------------------------------------------ */
    if (path.startsWith("/api")) {
      if (!token) {
        return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
          status: 401,
          headers: { "Content-Type": "application/json" }
        });
      }
      return NextResponse.next();
    }

    /* ------------------------------------------------------------------
       4.  Admin / moderator–only pages
           Covers both “/adminPanel” and legacy “/admiPanel”
    ------------------------------------------------------------------ */
    const adminPanels = ["/adminPanel", "/admiPanel"];
    if (adminPanels.some(p => path.startsWith(p)) && role !== "admin" && role !== "moderator") {
      return NextResponse.rewrite(new URL("/auth/denied", req.url));
    }

    /* ------------------------------------------------------------------
       5.  Dashboard pages require any authenticated user
    ------------------------------------------------------------------ */
    if (path.startsWith("/dashboard") && !token) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: { authorized: () => true }      // allow the middleware to run for all requests
  }
);
