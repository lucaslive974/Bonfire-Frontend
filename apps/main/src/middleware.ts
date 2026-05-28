import { withAuth } from "next-auth/middleware"

export default withAuth({
  callbacks: {
    authorized: ({ token }) => !!token,
  },
})

export const config = {
  matcher: [
    "/registers/:path*",
    "/infractions",
    "/history",
    "/import",
    "/recurses/:path*",
    "/profile"
  ],
}
