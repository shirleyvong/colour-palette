FROM node:10-alpine as build

ARG REACT_APP_SERVICES_HOST=/api

WORKDIR /usr/src/app

COPY ./package.json /usr/src/app/package.json
COPY ./package-lock.json /usr/src/app/package-lock.json
RUN npm install
COPY . /usr/src/app
RUN npm run build

FROM nginx:1.16.0-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
# nginx looks in /usr/share/nginx/html for files to serve
COPY --from=build /usr/src/app/build /usr/share/nginx/html