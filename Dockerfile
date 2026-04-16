# ─── Base image ────────────────────────────────────────────────────────────────
FROM oven/bun:1-alpine AS base
WORKDIR /app

# ─── Dependencies ───────────────────────────────────────────────────────────────
# Copy manifest + lockfile first to leverage Docker layer cache.
# Only re-runs when these two files change.
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# ─── Source ─────────────────────────────────────────────────────────────────────
COPY src/        ./src/
COPY public/     ./public/
COPY tsconfig.json ./

# ─── Runtime ────────────────────────────────────────────────────────────────────
EXPOSE 3000

# server.ts compiles the frontend bundle and then starts the static server
CMD ["bun", "run", "src/server.ts"]
