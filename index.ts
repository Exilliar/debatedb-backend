import { Application } from "https://deno.land/x/oak/mod.ts";
import { APP_HOST, APP_PORT } from "./config.ts";
import router from "./routes.ts";
import { client } from "./db/database.ts";

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());
await client.connect();

console.log(`Listening on port:${APP_PORT}...`);

await app.listen(`${APP_HOST}:${APP_PORT}`);

await client.end();
