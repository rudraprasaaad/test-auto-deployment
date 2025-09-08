FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS prod-deps
WORKDIR /app
COPY backend/pnpm-lock.yaml backend/package.json ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
	pnpm install --prod --frozen-lockfile

FROM base AS build
WORKDIR /app
COPY backend/pnpm-lock.yaml backend/package.json backend/tsconfig.json ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
	pnpm install --frozen-lockfile
COPY backend/src ./src
RUN pnpm build


FROM gcr.io/distroless/nodejs20-debian11
WORKDIR /app
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json ./


ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000


CMD ["dist/index.js"]
