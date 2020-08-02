import { RouterContext } from "https://deno.land/x/oak/mod.ts";
import debateService from "../services/debateService.ts";
import Debate from "../model/debateModel.ts";

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
    const result = context.request.body({ type: "json" });
    const debate: Debate = await result.value;

    const newid = await debateService.createdebate(debate);

    context.response.headers.set("Content-Type", "application/json");
    context.response.body = { message: "success", newid: newid };
  }

  async update(context: RouterContext) {
    const result = context.request.body({ type: "json" });
    const debate: Debate = await result.value;
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
