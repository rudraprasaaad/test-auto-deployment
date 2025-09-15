# Dockerfile (backend/Dockerfile) - Minimal, no cache mounts

# Base image with pnpm setup
FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
# Explanation: corepack enables pnpm reliably in Node 20 images, as recommended by pnpm docs. [3]

# Production dependencies stage
FROM base AS prod-deps
WORKDIR /app

# Original: RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile
# Change: removed cache mount to avoid builder cache-mount errors on Railway
COPY pnpm-lock.yaml package.json ./
RUN pnpm install --prod --frozen-lockfile
# Why: cache mounts require BuildKit support and strict formatting; removing them stabilizes builds on hosted CI. [1][2]

# Build stage
FROM base AS build
WORKDIR /app

# Original: RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
# Change: removed cache mount here as well
COPY pnpm-lock.yaml package.json tsconfig.json ./
RUN pnpm install --frozen-lockfile
COPY src ./src
RUN pnpm build
# Why: same reasoning as above; disable mounts to avoid CI-specific mount errors. [1][2]

# Final production image
FROM gcr.io/distroless/nodejs20-debian11
WORKDIR /app
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json ./
ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000
CMD ["dist/index.js"]
# Distroless base reduces attack surface and yields smaller images; common production best practice. [4]
