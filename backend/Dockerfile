# FROM node:16-alpine
# WORKDIR /app
# COPY package*.json ./
# RUN npm i
# COPY . ./
# ENTRYPOINT [ "npm", "run", "start:dev" ]

FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm i --no-audit --no-fund
COPY . ./
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
COPY package*.json ./
RUN npm i --omit=dev --no-audit --no-fund \
    && npm i -g pm2
COPY --from=builder /app/dist ./dist
COPY ./ecosystem.config.js ./
ENTRYPOINT [ "pm2-runtime", "ecosystem.config.js"]