import { client } from "../db/database.ts";
import Argument from "../model/argumentModel.ts";

import infoRepository from "./infoRepo.ts";
import sourceRepository from "./sourceRepo.ts";

class ArgumentRepo {
  async create(argument: Argument) {
    await client.query(
      "INSERT INTO argument (title, description, generalnotes, infoid, debateid) VALUES ($1, $2, $3, $4, $5)",
      argument.title,
      argument.description,
      argument.generalnotes,
      argument.infoid,
      argument.debateid,
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
      argument.debateid,
    );
  }

  async delete(id: number) {
    const infoid = await this.getInfoid(id);

    await this.deleteSources(id);

    client.query("DELETE FROM argument WHERE id=$1", id);

    infoRepository.delete(infoid);

    return;
  }

  async getInfoid(id: number) {
    const infoQuery = await client.query(
      "SELECT infoid FROM argument WHERE id=$1",
      id,
    );

    const infoid: number = infoQuery.rows[0][0];

    return infoid;
  }

  async deleteSources(id: number) {
    const sourceQuery = await client.query(
      "SELECT id FROM source WHERE argumentid=$1",
      id,
    );

    const sourceids: number[][] = sourceQuery.rows;

    for (let i = 0; i < sourceids.length; i++) {
      await sourceRepository.delete(sourceids[i][0]);
    }

    return;
  }
}

export default new ArgumentRepo();
