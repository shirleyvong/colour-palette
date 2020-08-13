FROM rust:buster

WORKDIR /app

RUN apt-get update -y && \
    apt-get install -y python3 python3-pip python3-dev

COPY . .

RUN pip3 install -r requirements.txt

# Build rust dynamic library
RUN ( cd quantize && cargo build --release ) && \
    cp quantize/target/release/libquantize.so api

ENV FLASK_APP=api

CMD ["flask", "run", "--host", "0.0.0.0"]