import { RouterContext } from "https://deno.land/x/oak/mod.ts";
import infoService from "../services/infoService.ts";

class InfoController {
  async index(context: RouterContext) {
    const infos = await infoService.getAllInfos();

    context.response.headers.set("Content-Type", "application/json");
    context.response.body = { data: infos };
  }

  async show(context: RouterContext) {
    const { id } = context.params;
    const info = await infoService.getinfoById(parseInt(id!));
    context.response.headers.set("Content-Type", "application/json");
    context.response.body = { data: info };
  }

  async store(context: RouterContext) {
    const result = await context.request.body(
      { contentTypes: { text: ["application/json"] } },
    );
    const info = result.value;

    const newid = await infoService.createinfo(info);

    context.response.headers.set("Content-Type", "application/json");
    context.response.body = { message: "success", newid: newid };
  }

  async update(context: RouterContext) {
    const result = await context.request.body(
      { contentTypes: { text: ["application/json"] } },
    );
    const info = result.value;
    const { id } = context.params;
    await infoService.updateinfo(parseInt(id!), info);

    context.response.headers.set("Content-Type", "application/json");
    context.response.body = { message: "success" };
  }

  async delete(context: RouterContext) {
    const { id } = context.params;
    await infoService.deleteinfo(parseInt(id!));

    context.response.headers.set("Content-Type", "application/json");
    context.response.body = { message: "success" };
  }
}

export default new InfoController();
