import { withAuth, NextRequestWithAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req: NextRequestWithAuth) {
    const { pathname } = req.nextUrl
    const token = req.nextauth.token
    const role = token?.role
    const path = pathname.replace(/\/$/, "")

    const unauthenticatedPostRoutes = ["/api/users", "/api/contact", "/api/waitlist"]
    if (req.method === "POST" && unauthenticatedPostRoutes.includes(path)) {
      return NextResponse.next()
    }

    // Add this block for unauthenticated GET public API routes
    const unauthenticatedGetRoutes = ["/api/page"]
    if (req.method === "GET" && unauthenticatedGetRoutes.some(p => path.startsWith(p))) {
      return NextResponse.next()
    }

    const adminOnlyAPIs = ["/api/users", "/api/contact", "/api/waitlist"]
    if (adminOnlyAPIs.some(p => path.startsWith(p))) {
      if (!token || (role !== "admin" && role !== "moderator")) {
        return new NextResponse(JSON.stringify({ message: "Forbidden" }), {
          status: 403,
          headers: { "Content-Type": "application/json" },
        })
      }
      return NextResponse.next()
    }

    if (path.startsWith("/api")) {
      if (!token) {
        return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
          status: 401,
          headers: { "Content-Type": "application/json" },
        })
      }
      return NextResponse.next()
    }

    if (path.startsWith("/adminPanel") && (role !== "admin" && role !== "moderator")) {
      return NextResponse.rewrite(new URL("/auth/denied", req.url))
    }

    if (path.startsWith("/dashboard") && !token) {
      return NextResponse.redirect(new URL("/auth/login", req.url))
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: () => true,
    },
  }
)

