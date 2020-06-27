import { client } from "../db/database.ts";
import Argument from "../model/argumentModel.ts";

class ArgumentRepo {
  async create(argument: Argument) {
    await client.query(
      "INSERT INTO argument (title, description, generalnotes, infoid, debateid) VALUES ($1, $2, $3, $4, $5)",
      argument.title,
      argument.description,
      argument.generalnotes,
      argument.infoid,
      argument.debateId,
    );

    const idQuery = await client.query("SELECT currval('argument_seq')");
    const argumentId = idQuery.rows[0][0];

    return argumentId;
  }

  async all(debateId: number) {
    return client.query(
      "SELECT * FROM argument WHERE debateid=$1 ORDER BY id",
      debateId,
    );
  }

  async find(id: number) {
    return client.query(`SELECT * FROM argument WHERE id=$1`, id);
  }

  async update(id: number, argument: Argument) {
    return client.query(
      "UPDATE argument SET title=$2, description=$3, generalnotes=$4, infoid=$5, debateid=$6 WHERE id=$1",
      id,
      argument.title,
      argument.description,
      argument.generalnotes,
      argument.infoid,
      argument.debateId,
    );
  }

  async delete(id: number) {
    return client.query("DELETE FROM argument WHERE id=$1", id);
  }
}

export default new ArgumentRepo();
