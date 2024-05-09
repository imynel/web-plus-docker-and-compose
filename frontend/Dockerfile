# FROM node:16-alpine
# WORKDIR /app
# COPY package*.json ./
# RUN npm i
# COPY . ./
# ENTRYPOINT [ "npm", "run", "start" ]

FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm i --no-audit --no-fund
COPY . ./
RUN npm run build

FROM nginx:1.23.1-alpine AS runner
WORKDIR /app
COPY --from=builder /app/build /usr/share/nginx/html
COPY ./nginx/default.conf /etc/nginx/conf.d
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]