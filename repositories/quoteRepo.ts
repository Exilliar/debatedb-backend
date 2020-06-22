import { client } from "../db/database.ts";
import Quote from "../model/quoteModel.ts";

class QuoteRepo {
  async create(quote: Quote, sourceid: number) {
    const query = await client.query(
      "INSERT INTO quote (text, additional) VALUES ($1, $2)",
      quote.text,
      quote.additional,
    );

    // Get the id of the quote that was just added
    const idQuery = await client.query("SELECT currval('quote_seq')");
    const quoteId = idQuery.rows[0][0];

    await client.query(
      "INSERT INTO quotes (sourceid, quoteid) VALUES ($1, $2)",
      sourceid,
      quoteId,
    );

    return query;
  }

  async all(sourceid: number) {
    return client.query(
      "SELECT DISTINCT quote.id, quote.text, quote.additional FROM quote, quotes WHERE quotes.sourceid=$1 AND quotes.quoteid=quote.id ORDER BY quote.id",
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

  async delete(id: number, sourceid: number) {
    await client.query(
      "DELETE FROM quotes WHERE sourceid=$1 AND quoteid=$2",
      sourceid,
      id,
    );

    return client.query("DELETE FROM quote WHERE id=$1", id);
  }
}

export default new QuoteRepo();
