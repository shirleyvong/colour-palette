FROM rust:buster

WORKDIR /usr/src/app/server

# Set up Flask server
RUN apt-get update -y && \
    apt-get install -y python3 python3-pip python3-dev
COPY . /usr/src/app/server
RUN pip3 install -r requirements.txt
RUN echo $(pwd)

# Build rust dynamic library
RUN ( cd quantize && cargo build --release ) && \
    cp quantize/target/release/libquantize.so api

# # Build React code
# WORKDIR /usr/src/app/client

# RUN apt-get install -y nodejs npm
# COPY ./client/package.json /usr/src/app/client/package.json
# COPY ./client/package-lock.json /usr/src/app/client/package-lock.json
# RUN npm install
# COPY ./client /usr/src/app/client

# RUN npm run build
# RUN mkdir /usr/src/app/server/build
# RUN cp -r ./build /usr/src/app/server/build

# WORKDIR /usr/src/app/server
# RUN echo $(pwd)

ENV FLASK_APP=api

CMD ["flask", "run", "--host", "0.0.0.0"]
