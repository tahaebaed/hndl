#* Stage-1 builder
FROM node:16.19.1-alpine as builder

WORKDIR /app

#* Copy the package.json & package-lock.json to install dependencies
COPY package.json package-lock.json ./

#* Install the dependencies
RUN npm install -f

COPY . .

#* Build the project and copy the files
RUN npm run build


#* Stage-2 host
FROM nginx:1.23.3-alpine

#!/bin/sh

COPY ./nginx.conf /etc/nginx/nginx.conf

#* Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*

#* Copy from Stage-1
COPY --from=builder /build /usr/share/nginx/html

EXPOSE 3000 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]