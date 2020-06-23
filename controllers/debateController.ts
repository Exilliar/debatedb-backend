import { RouterContext } from "https://deno.land/x/oak/mod.ts";
import debateService from "../services/debateService.ts";

class DebateController {
  async index(context: RouterContext) {
    const { accountid } = context.params;

    const debates = await debateService.getAllDebates(parseInt(accountid!));

    context.response.headers.set("Content-Type", "application/json");
    context.response.body = { data: debates };
  }

  async show(context: RouterContext) {
    const { id } = context.params;
    const debate = await debateService.getdebateById(parseInt(id!));
    context.response.headers.set("Content-Type", "application/json");
    context.response.body = { data: debate };
  }

  async store(context: RouterContext) {
    const result = await context.request.body(
      { contentTypes: { text: ["application/json"] } },
    );
    const debate = result.value;

    await debateService.createdebate(debate);

    context.response.headers.set("Content-Type", "application/json");
    context.response.body = { message: "success" };
  }

  async update(context: RouterContext) {
    const result = await context.request.body(
      { contentTypes: { text: ["application/json"] } },
    );
    const debate = result.value;
    const { id } = context.params;
    await debateService.updatedebate(parseInt(id!), debate);

    context.response.headers.set("Content-Type", "application/json");
    context.response.body = { message: "success" };
  }

  async delete(context: RouterContext) {
    const { id } = context.params;
    await debateService.deletedebate(parseInt(id!));

    context.response.headers.set("Content-Type", "application/json");
    context.response.body = { message: "success" };
  }
}

export default new DebateController();
