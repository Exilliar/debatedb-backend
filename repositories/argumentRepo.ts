import { client } from "../db/database.ts";
import Argument from "../model/argumentModel.ts";

class ArgumentRepo {
  async create(argument: Argument) {
    return client.query(
      "INSERT INTO argument (id, title, description, generalNotes, infoid, debateid) VALUES ($1, $2, $3, $4, $5, $6)",
      argument.id,
      argument.title,
      argument.description,
      argument.generalNotes,
      argument.infoId,
      argument.debateId,
    );
  }

  async all() {
    return client.query("SELECT * FROM argument ORDER BY id");
  }

  async find(id: number) {
    return client.query(`SELECT * FROM argument WHERE id=$1`, id);
  }

  async update(id: number, argument: Argument) {
    return client.query(
      "UPDATE argument SET title=$2, description=$3, generalNotes=$4, infoid=$5, debateid=$6 WHERE id=$1",
      id,
      argument.title,
      argument.description,
      argument.generalNotes,
      argument.infoId,
      argument.debateId,
    );
  }

  async delete(id: number) {
    return client.query("DELETE FROM argument WHERE id=$1", id);
  }
}

export default new ArgumentRepo();
