import { authMiddleware } from "@bonfire/core/src/services/auth/middleware"

export default authMiddleware

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
