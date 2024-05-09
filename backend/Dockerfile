# FROM node:16-alpine
# WORKDIR /app
# COPY package*.json ./
# RUN npm i
# COPY . ./
# ENTRYPOINT [ "npm", "run", "start:dev" ]

FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY . ./
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
COPY package*.json ./
RUN npm ci --opmit=dev --no-audit --no-fund \
    && npm i -g pm2
COPY --from=builder /app/dist ./dist
COPY ./ecosystem.config.js ./
ENTRYPOINT [ "pm2-runtime", "start", "ecosystem.config.js"]