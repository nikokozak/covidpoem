FROM node:18 AS builder

COPY ./app /app

WORKDIR /app

RUN npm install
ENV NODE_OPTIONS=--openssl-legacy-provider
RUN npm run build

FROM nginx:1.23

EXPOSE 80

COPY --from=builder /app/build/main.js /usr/share/nginx/html/main.js
COPY web /usr/share/nginx/html

