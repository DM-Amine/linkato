import { withAuth, NextRequestWithAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req: NextRequestWithAuth) {
    const { pathname } = req.nextUrl
    const token = req.nextauth.token
    const role = token?.role
    const path = pathname.replace(/\/$/, "") // Normalize path

    const unauthenticatedPostRoutes = ["/api/users", "/api/contact", "/api/waitlist"]

    if (req.method === "POST" && unauthenticatedPostRoutes.includes(path)) {
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

export const config = {
  matcher: ["/api/:path*", "/adminPanel/:path*", "/dashboard/:path*"],
}


// export default withAuth(
//   function middleware(req: NextRequestWithAuth) {
//     const { pathname } = req.nextUrl
//     const token = req.nextauth.token
//     const role = token?.role

//     // ✅ Allow unauthenticated POST requests to specific public APIs
//     if (
//       (pathname === "/api/users" && req.method === "POST") ||
//       (pathname === "/api/contact" && req.method === "POST") ||
//       (pathname === "/api/waitlist" && req.method === "POST")
//     ) {
//       return NextResponse.next()
//     }

//    // 📝 Example public APIs — no authentication required
//     // ⚠️ These routes do NOT exist in this project. 
//     //You can use this structure if you add public API endpoints later.

//     // const publicAPIs = ["/api/public"]
//     // if (publicAPIs.some(path => pathname.startsWith(path))) {
//     //   return NextResponse.next()
//     // }


//     // 🔐 Protected API routes (write operations) — admin or moderator required
//     const adminOnlyAPIs = ["/api/users", "/api/contact", "/api/waitlist"]
//     if (adminOnlyAPIs.some(path => pathname.startsWith(path))) {
//       if (!token || (role !== "admin" && role !== "moderator")) {
//         return new NextResponse(JSON.stringify({ message: "Forbidden" }), {
//           status: 403,
//           headers: { "Content-Type": "application/json" },
//         })
//       }
//       return NextResponse.next()
//     }

//     // 🔒 All other API routes require authentication
//     if (pathname.startsWith("/api")) {
//       if (!token) {
//         return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
//           status: 401,
//           headers: { "Content-Type": "application/json" },
//         })
//       }
//       return NextResponse.next()
//     }

//     // 🔐 /adminPanel pages — only accessible to admin or moderator roles
//     if (pathname.startsWith("/adminPanel") && (role !== "admin" && role !== "moderator")) {
//       return NextResponse.rewrite(new URL("/auth/denied", req.url))
//     }

//     // 👤 /dashboard pages — require login
//     if (pathname.startsWith("/dashboard") && !token) {
//       return NextResponse.redirect(new URL("/auth/login", req.url))
//     }

//     return NextResponse.next()
//   },
//   {
//     callbacks: {
//       // Required for withAuth middleware to function properly
//       authorized: () => true,
//     },
//   }
// )

// export const config = {
//   // 👇 Apply middleware to API routes, admin panel, and dashboard
//   matcher: ["/api/:path*", "/adminPanel/:path*", "/dashboard/:path*"],
// }
