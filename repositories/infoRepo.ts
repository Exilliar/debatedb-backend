import { client } from "../db/database.ts";
import Info from "../model/infoModel.ts";

class InfoRepo {
  async create(info: Info) {
    return client.query(
      "INSERT INTO info (id, description, current, counter) VALUES ($1, $2, $3, $4)",
      info.id,
      info.description,
      info.current,
      info.counter,
    );
  }

  async all() {
    return client.query("SELECT * FROM info ORDER BY id");
  }

  async find(id: number) {
    return client.query(`SELECT * FROM info WHERE id=$1`, id);
  }

  async update(id: number, info: Info) {
    return client.query(
      "UPDATE info SET description=$2, current=$3, counter=$4 WHERE id=$1",
      id,
      info.description,
      info.current,
      info.counter,
    );
  }

  async delete(id: number) {
    return client.query("DELETE FROM info WHERE id=$1", id);
  }
}

export default new InfoRepo();
