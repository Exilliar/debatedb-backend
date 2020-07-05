import { client } from "../db/database.ts";
import Source from "../model/sourceModel.ts";
import quoteRepository from "./quoteRepo.ts";

class SourceRepo {
  async create(source: Source, argumentid: number) {
    const query = await client.query(
      "INSERT INTO source (title, link, notes, argumentid) VALUES ($1, $2, $3, $4)",
      source.title,
      source.link,
      source.notes,
      argumentid,
    );

    // Get the id of the source that was just added
    const idQuery = await client.query("SELECT currval('source_seq')");
    const sourceId = idQuery.rows[0][0];

    return sourceId;
  }

  async all(argumentid: number) {
    return client.query(
      "SELECT * FROM source WHERE argumentid=$1 ORDER BY source.id",
      argumentid,
    );
  }

  async find(id: number) {
    return client.query(`SELECT * FROM source WHERE id=$1`, id);
  }

  async update(id: number, source: Source) {
    return client.query(
      "UPDATE source SET title=$2, link=$3, notes=$4 WHERE id=$1",
      id,
      source.title,
      source.link,
      source.notes,
    );
  }

  async delete(id: number) {
    const quotesQuery = await client.query(
      "SELECT id FROM quote WHERE sourceid=$1",
      id,
    );

    const quoteids: number[][] = quotesQuery.rows;

    for (let i = 0; i < quoteids.length; i++) {
      await quoteRepository.delete(quoteids[i][0]);
    }

    return client.query("DELETE FROM source WHERE id=$1", id);
  }
}

export default new SourceRepo();
