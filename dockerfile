FROM node:16-alpine3.15 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install -f
COPY . .

RUN npm run build

FROM nginx:1.23.3-alpine

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*
COPY --from=builder /app/build .

EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]