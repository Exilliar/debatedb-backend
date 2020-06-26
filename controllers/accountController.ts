import { RouterContext } from "https://deno.land/x/oak/mod.ts";
import accountService from "../services/accountService.ts";

class AccountController {
  async index(context: RouterContext) {
    const accounts = await accountService.getAllAccounts();

    context.response.headers.set("Content-Type", "application/json");
    context.response.body = { data: accounts };
  }

  async show(context: RouterContext) {
    const { id } = context.params;
    if (id !== undefined) {
      let parseId: number | string = parseInt(id!);
      if (isNaN(parseId)) parseId = id;
      const account = await accountService.getaccountById(parseId);
      context.response.body = { data: account };
    } else {
      context.response.body = { data: null };
    }
    context.response.headers.set("Content-Type", "application/json");
  }

  async store(context: RouterContext) {
    const result = await context.request.body(
      { contentTypes: { text: ["application/json"] } },
    );
    const account = result.value;

    const newid = await accountService.createaccount(account);

    context.response.headers.set("Content-Type", "application/json");
    context.response.body = { message: "success", newid: newid };
  }

  async update(context: RouterContext) {
    const result = await context.request.body(
      { contentTypes: { text: ["application/json"] } },
    );
    const account = result.value;
    const { id } = context.params;
    await accountService.updateaccount(parseInt(id!), account);

    context.response.headers.set("Content-Type", "application/json");
    context.response.body = { message: "success" };
  }

  async delete(context: RouterContext) {
    const { id } = context.params;
    await accountService.deleteaccount(parseInt(id!));

    context.response.headers.set("Content-Type", "application/json");
    context.response.body = { message: "success" };
  }
}

export default new AccountController();
