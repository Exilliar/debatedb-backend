import { Client } from "https://deno.land/x/postgres/mod.ts";
import "https://deno.land/x/dotenv/load.ts";

const client = new Client({
  user: "debatedb",
  database: "debatedb",
  hostname: "localhost",
  port: 5432,
  password: "debatedb",
});

export { client };
