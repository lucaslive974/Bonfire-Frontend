export { default } from 'next-auth/middleware'

export const config = {
  matcher: [
    '/infractions/:path*',
    '/registers/:path*',
    '/import/:path*',
    '/recurses/:path*',
    '/history/:path*',
    '/profile/:path*',
  ],
}
