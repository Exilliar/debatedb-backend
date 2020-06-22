import { Router } from "https://deno.land/x/oak/mod.ts";

import debateController from "./controllers/debateController.ts";

const router = new Router();

router
  .get("/debate", debateController.index)
  .get("/debate/:id", debateController.show)
  .post("/debate", debateController.store)
  .put("/debate/:id", debateController.update)
  .delete("/debate/:id", debateController.delete);

export default router;
