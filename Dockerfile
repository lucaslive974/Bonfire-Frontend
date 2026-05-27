FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on npm workspaces
COPY package.json package-lock.json* ./
COPY apps/main/package.json ./apps/main/
COPY apps/admin/package.json ./apps/admin/
COPY packages/ui/package.json ./packages/ui/
COPY packages/core/package.json ./packages/core/

RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED=1

# APP_NAME is the package name (e.g. bonfire, admin), APP_DIR is the folder (e.g. main, admin)
ARG APP_NAME=bonfire
ARG APP_DIR=main
RUN npx turbo run build --filter=${APP_NAME}

# Guarantee public folder exists so COPY won't fail
RUN mkdir -p apps/${APP_DIR}/public

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

ARG APP_DIR=main
ENV APP_DIR_ENV=${APP_DIR}

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/apps/${APP_DIR_ENV}/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/${APP_DIR_ENV}/.next/static ./apps/${APP_DIR_ENV}/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/apps/${APP_DIR_ENV}/public ./apps/${APP_DIR_ENV}/public

USER nextjs

EXPOSE 3000

ENV PORT=3000

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/config/next-config-js/output
ENV HOSTNAME="0.0.0.0"

# Running dynamically using shell form so ENV variable is expanded
CMD node apps/${APP_DIR_ENV}/server.js