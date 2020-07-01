FROM hayd/deno:latest

EXPOSE 4000

WORKDIR /app

ADD . /app

RUN deno cache index.ts

CMD ["run", "--allow-net", "--allow-env", "--allow-read", "index.ts"]