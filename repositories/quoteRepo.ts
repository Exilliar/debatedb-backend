import { client } from "../db/database.ts";
import Quote from "../model/quoteModel.ts";

class QuoteRepo {
  async create(quote: Quote, sourceid: number) {
    const query = await client.query(
      "INSERT INTO quote (text, additional, sourceid) VALUES ($1, $2, $3)",
      quote.text,
      quote.additional,
      sourceid,
    );

    // Get the id of the quote that was just added
    const idQuery = await client.query("SELECT currval('quote_seq')");
    const quoteId = idQuery.rows[0][0];

    return quoteId;
  }

  async all(sourceid: number) {
    return client.query(
      "SELECT* FROM quote WHERE sourceid=$1 ORDER BY id",
      sourceid,
    );
  }

  async find(id: number) {
    return client.query(`SELECT * FROM quote WHERE id=$1`, id);
  }

  async update(id: number, quote: Quote) {
    return client.query(
      "UPDATE quote SET text=$2, additional=$3 WHERE id=$1",
      id,
      quote.text,
      quote.additional,
    );
  }

  async delete(id: number) {
    return client.query("DELETE FROM quote WHERE id=$1", id);
  }
}

export default new QuoteRepo();
