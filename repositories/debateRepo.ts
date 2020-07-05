import { client } from "../db/database.ts";
import Debate from "../model/debateModel.ts";

import infoRepository from "./infoRepo.ts";
import argumentRepository from "./argumentRepo.ts";

class DebateRepo {
  async create(debate: Debate) {
    await client.query(
      "INSERT INTO debate (title, description, generalnotes, infoid, accountid) VALUES ($1, $2, $3, $4, $5)",
      debate.title,
      debate.description,
      debate.generalnotes,
      debate.infoid,
      debate.accountid,
    );

    const idQuery = await client.query("SELECT currval('debate_seq')");
    const debateId = idQuery.rows[0][0];

    return debateId;
  }

  async all(accountid: number) {
    return client.query(
      "SELECT * FROM debate WHERE accountid=$1 ORDER BY id",
      accountid,
    );
  }

  async find(id: number) {
    return client.query(`SELECT * FROM debate WHERE id=$1`, id);
  }

  async update(id: number, debate: Debate) {
    return client.query(
      "UPDATE debate SET title=$2, description=$3, generalnotes=$4, infoid=$5, accountid=$6 WHERE id=$1",
      id,
      debate.title,
      debate.description,
      debate.generalnotes,
      debate.infoid,
      debate.accountid,
    );
  }

  async delete(id: number) {
    const infoid = await this.getInfoid(id);

    await this.deleteArguments(id);

    client.query("DELETE FROM debate WHERE id=$1", id);

    infoRepository.delete(infoid);

    return;
  }

  async getInfoid(id: number) {
    const infoQuery = await client.query(
      "SELECT infoid FROM debate WHERE id=$1",
      id,
    );

    const infoid: number = infoQuery.rows[0][0];

    return infoid;
  }
  async deleteArguments(id: number) {
    const argumentQuery = await client.query(
      "SELECT id FROM argument WHERE debateid=$1",
      id,
    );

    const argumentids: number[][] = argumentQuery.rows;

    for (let i = 0; i < argumentids.length; i++) {
      await argumentRepository.delete(argumentids[i][0]);
    }

    return;
  }
}

export default new DebateRepo();
