import quoteRepository from "../repositories/quoteRepo.ts";
import Quote from "../model/quoteModel.ts";

class quoteService {
  getAllQuotes = async (sourceid: number) => {
    const result = await quoteRepository.all(sourceid);
    const quotes = new Array<Quote>();

    if (result !== undefined) {
      result.rows.map((quote) => {
        let temp: any = {};
        result.rowDescription.columns.map((item, index) => {
          temp[item.name] = quote[index];
        });
        quotes.push(temp);
      });
    }

    return quotes;
  };

  getquoteById = async (id: number) => {
    const result = await quoteRepository.find(id);

    let quote: any = {};
    result.rows.map((items) => {
      result.rowDescription.columns.map((item, index) => {
        quote[item.name] = items[index];
      });
    });

    return quote;
  };

  createquote = async (quote: Quote, sourceid: number) => {
    return await quoteRepository.create(quote, sourceid);
  };

  updatequote = async (id: number, quote: Quote) => {
    return await quoteRepository.update(id, quote);
  };

  deletequote = async (id: number) => {
    return await quoteRepository.delete(id);
  };
}

export default new quoteService();
