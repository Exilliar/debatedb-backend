import { Router } from "https://deno.land/x/oak/mod.ts";

import debateController from "./controllers/debateController.ts";
import argumentController from "./controllers/argumentController.ts";
import infoController from "./controllers/infoController.ts";
import accountController from "./controllers/accountController.ts";
import sourceController from "./controllers/sourceController.ts";

const router = new Router();

// Debate
router
  .get("/debate", debateController.index)
  .get("/debate/:id", debateController.show)
  .post("/debate", debateController.store)
  .put("/debate/:id", debateController.update)
  .delete("/debate/:id", debateController.delete);

// Argument
router
  .get("/argument", argumentController.index)
  .get("/argument/:id", argumentController.show)
  .post("/argument", argumentController.store)
  .put("/argument/:id", argumentController.update)
  .delete("/argument/:id", argumentController.delete);

// Info
router
  .get("/info", infoController.index)
  .get("/info/:id", infoController.show)
  .post("/info", infoController.store)
  .put("/info/:id", infoController.update)
  .delete("/info/:id", infoController.delete);

// Account
router
  .get("/account", accountController.index)
  .get("/account/:id", accountController.show)
  .post("/account", accountController.store)
  .put("/account/:id", accountController.update)
  .delete("/account/:id", accountController.delete);

// Source
router
  .get("/argument/:argumentId/source", sourceController.index)
  .get("/argument/source/:id", sourceController.show)
  .post("/argument/:argumentId/source", sourceController.store)
  .put("/argument/source/:id", sourceController.update)
  .delete("/argument/:argumentId/source/:id", sourceController.delete);

export default router;
