FROM rust:buster

WORKDIR /usr/src/app/server

# Set up Flask server
RUN apt-get update -y && \
    apt-get install -y python3 python3-pip python3-dev
COPY ./server /usr/src/app/server
RUN echo $(ls)
RUN pip3 install -r requirements.txt

# Build rust dynamic library
RUN ( cd quantize && cargo build --release ) && \
    cp quantize/target/release/libquantize.so api

FROM node:13.12.0-alpine as build

WORKDIR /usr/src/app/client

# Build React code
COPY package.json ./package.json
COPY package-lock.json ./package-lock.json
COPY ./client /usr/src/app/client
RUN npm install
RUN npm run build
COPY /usr/src/app/client/build /usr/src/app/server/build

ENV FLASK_APP=api

# CMD ["flask", "run", "--host", "0.0.0.0"]