FROM hayd/deno:latest

EXPOSE 4000

WORKDIR /app

ADD . /app
COPY . .

RUN deno upgrade --version 1.2.2

RUN deno cache index.ts

CMD ["run", "--allow-net", "--allow-env", "--allow-read", "index.ts"]