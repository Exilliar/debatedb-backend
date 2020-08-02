import { RouterContext } from "https://deno.land/x/oak/mod.ts";
import quoteService from "../services/quoteService.ts";
import Quote from "../model/quoteModel.ts";

class QuoteController {
  async index(context: RouterContext) {
    const { sourceId } = context.params;

    const quotes = await quoteService.getAllQuotes(parseInt(sourceId!));

    context.response.headers.set("Content-Type", "application/json");
    context.response.body = { data: quotes };
  }

  async show(context: RouterContext) {
    const { id } = context.params;
    const quote = await quoteService.getquoteById(parseInt(id!));
    context.response.headers.set("Content-Type", "application/json");
    context.response.body = { data: quote };
  }

  async store(context: RouterContext) {
    const { sourceId } = context.params;

    const result = context.request.body({ type: "json" });
    const quote: Quote = await result.value;

    const newid = await quoteService.createquote(quote, parseInt(sourceId!));

    context.response.headers.set("Content-Type", "application/json");
    context.response.body = { message: "success", newid: newid };
  }

  async update(context: RouterContext) {
    const result = context.request.body({ type: "json" });
    const quote: Quote = await result.value;
    const { id } = context.params;
    await quoteService.updatequote(parseInt(id!), quote);

    context.response.headers.set("Content-Type", "application/json");
    context.response.body = { message: "success" };
  }

  async delete(context: RouterContext) {
    const { id } = context.params;
    await quoteService.deletequote(parseInt(id!));

    context.response.headers.set("Content-Type", "application/json");
    context.response.body = { message: "success" };
  }
}

export default new QuoteController();
