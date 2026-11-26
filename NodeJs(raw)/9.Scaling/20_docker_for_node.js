/* 20_docker_for_node.js

=====================================================
Docker for Node.js
=====================================================

Definition (What I should say in the interview):
- "Docker packages my Node app with its **exact runtime, dependencies and config** into an
   **image**, and runs it as an isolated **container**. That solves the 'works on my machine'
   problem, because dev, CI and production all run the same image. For Node I write a small
   Dockerfile using an official node base image, copy package files first to use **layer
   caching**, install only production dependencies, run as a **non-root user**, and make sure the
   app handles **SIGTERM** so containers stop gracefully."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. Image = blueprint, container = running instance of the image.
2. COPY package*.json first, then npm ci, then COPY the source -> deps layer is cached.
3. Use .dockerignore (node_modules, .git, .env) to keep images small and safe.
4. Multi-stage builds -> build TypeScript in one stage, ship only dist + prod deps.
5. Use CMD ["node", "server.js"] (exec form) so Node receives signals directly.

-----------------------------------------------------
Example (multi-stage Dockerfile)
-----------------------------------------------------
# ---- build stage ----
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# ---- runtime stage ----
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=build /app/dist ./dist
USER node
EXPOSE 3000
CMD ["node", "dist/server.js"]

# docker-compose.yml (local dev with Redis + Mongo)
services:
  api:   { build: ., ports: ["3000:3000"], env_file: .env, depends_on: [mongo, redis] }
  mongo: { image: mongo:7 }
  redis: { image: redis:7 }

// graceful stop inside the app
process.on('SIGTERM', () => server.close(() => process.exit(0)));

-----------------------------------------------------
Common Mistake / Important Notes
-----------------------------------------------------
- CMD ["npm", "start"] -> npm may not forward SIGTERM; container is killed after the timeout.
  Use node directly, or add --init / tini.
- Copying local node_modules into the image -> wrong native binaries for Linux.
- Baking secrets (.env) into the image -> pass them as environment variables at runtime.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Why alpine?
A1: Much smaller image. But it uses musl libc, so some native modules may need extra build
    tools; node:20-slim is a common alternative.

Q2: Docker vs virtual machine?
A2: Containers share the host kernel, so they are lighter and start in seconds; a VM runs a
    full guest OS.
*/
