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

export { auth as proxy } from '@bonfire/core'
