import { RouterContext } from "https://deno.land/x/oak/mod.ts";
import sourceService from "../services/sourceService.ts";
import Source from "../model/sourceModel.ts";

class SourceController {
  async index(context: RouterContext) {
    const { argumentId } = context.params;

    const sources = await sourceService.getAllSources(parseInt(argumentId!));

    context.response.headers.set("Content-Type", "application/json");
    context.response.body = { data: sources };
  }

  async show(context: RouterContext) {
    const { id } = context.params;
    const source = await sourceService.getsourceById(parseInt(id!));
    context.response.headers.set("Content-Type", "application/json");
    context.response.body = { data: source };
  }

  async store(context: RouterContext) {
    const { argumentId } = context.params;

    const result = context.request.body({ type: "json" });
    const source: Source = await result.value;

    const newid = await sourceService.createsource(
      source,
      parseInt(argumentId!),
    );

    context.response.headers.set("Content-Type", "application/json");
    context.response.body = { message: "success", newid: newid };
  }

  async update(context: RouterContext) {
    const result = context.request.body({ type: "json" });
    const source: Source = await result.value;
    const { id } = context.params;
    await sourceService.updatesource(parseInt(id!), source);

    context.response.headers.set("Content-Type", "application/json");
    context.response.body = { message: "success" };
  }

  async delete(context: RouterContext) {
    const { id } = context.params;
    await sourceService.deletesource(parseInt(id!));

    context.response.headers.set("Content-Type", "application/json");
    context.response.body = { message: "success" };
  }
}

export default new SourceController();
