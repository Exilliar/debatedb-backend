import { client } from "../db/database.ts";
import Debate from "../model/debateModel.ts";

class DebateRepo {
  async create(debate: Debate) {
    return client.query(
      "INSERT INTO debate (id, title, description, generalNotes, infoid, accountid) VALUES ($1, $2, $3, $4, $5, $6)",
      debate.id,
      debate.title,
      debate.description,
      debate.generalNotes,
      debate.infoId,
      debate.accountId,
    );
  }

  async all() {
    return client.query("SELECT * FROM debate ORDER BY id");
  }

  async find(id: number) {
    return client.query(`SELECT * FROM argument WHERE id=$1`, id);
  }

  async update(id: number, debate: Debate) {
    return client.query(
      "UPDATE debate SET title=$2, description=$3, generalNotes=$4, infoid=$5, accountid=$6 WHERE id=$1",
      id,
      debate.title,
      debate.description,
      debate.generalNotes,
      debate.infoId,
      debate.accountId,
    );
  }

  async delete(id: number) {
    return client.query("DELETE FROM debate WHERE id=$1", id);
  }
}

export default new DebateRepo();