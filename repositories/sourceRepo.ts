import { client } from "../db/database.ts";
import Source from "../model/sourceModel.ts";

class SourceRepo {
  async create(source: Source, argumentId: number) {
    const query = await client.query(
      "INSERT INTO source (title, link, notes) VALUES ($1, $2, $3)",
      source.title,
      source.link,
      source.notes,
    );

    // Get the id of the source that was just added
    const idQuery = await client.query("SELECT currval('source_seq')");
    const sourceId = idQuery.rows[0][0];

    await client.query(
      "INSERT INTO sources (argumentid, sourceid) VALUES ($1, $2)",
      argumentId,
      sourceId,
    );

    return sourceId;
  }

  async all(argumentid: number) {
    return client.query(
      "SELECT DISTINCT source.id, source.title, source.link, source.notes FROM source, sources WHERE sources.argumentid=$1 AND sources.sourceid=source.id ORDER BY source.id",
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

  async delete(id: number, argumentId: number) {
    await client.query(
      "DELETE FROM sources WHERE argumentid=$1 AND sourceid=$2",
      argumentId,
      id,
    );

    return client.query("DELETE FROM source WHERE id=$1", id);
  }
}

export default new SourceRepo();
