import { z } from 'zod'

const envSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string().min(1),
  NEXT_PUBLIC_API_PORT: z.string().min(1),
  NEXTAUTH_SECRET: z.string().min(1),
  NEXTAUTH_URL: z.string().min(1),
  BONFIRE_ID: z.string().min(1),
  BONFIRE_CLIENT_SECRET: z.string().min(1),
  KEYCLOAK_ISSUER: z.string().min(1),
})

export const env = envSchema.parse({
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  NEXT_PUBLIC_API_PORT: process.env.NEXT_PUBLIC_API_PORT,
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  BONFIRE_ID: process.env.BONFIRE_ID,
  BONFIRE_CLIENT_SECRET: process.env.BONFIRE_CLIENT_SECRET,
  KEYCLOAK_ISSUER: process.env.KEYCLOAK_ISSUER,
})
