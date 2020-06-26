import { RouterContext } from "https://deno.land/x/oak/mod.ts";
import argumentService from "../services/argumentService.ts";

class ArgumentController {
  async index(context: RouterContext) {
    const allArguments = await argumentService.getAllArguments();

    context.response.headers.set("Content-Type", "application/json");
    context.response.body = { data: allArguments };
  }

  async show(context: RouterContext) {
    const { id } = context.params;
    const argument = await argumentService.getargumentById(parseInt(id!));
    context.response.headers.set("Content-Type", "application/json");
    context.response.body = { data: argument };
  }

  async store(context: RouterContext) {
    const result = await context.request.body(
      { contentTypes: { text: ["application/json"] } },
    );
    const argument = result.value;

    const newid = await argumentService.createargument(argument);

    context.response.headers.set("Content-Type", "application/json");
    context.response.body = { message: "success", newid: newid };
  }

  async update(context: RouterContext) {
    const result = await context.request.body(
      { contentTypes: { text: ["application/json"] } },
    );
    const argument = result.value;
    const { id } = context.params;
    await argumentService.updateargument(parseInt(id!), argument);

    context.response.headers.set("Content-Type", "application/json");
    context.response.body = { message: "success" };
  }

  async delete(context: RouterContext) {
    const { id } = context.params;
    await argumentService.deleteargument(parseInt(id!));

    context.response.headers.set("Content-Type", "application/json");
    context.response.body = { message: "success" };
  }
}

export default new ArgumentController();
