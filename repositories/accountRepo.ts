import { client } from "../db/database.ts";
import Account from "../model/accountModel.ts";

import debateRepository from "./debateRepo.ts";

class AccountRepo {
  async create(account: Account) {
    await client.query(
      "INSERT INTO account (email, name) VALUES ($1, $2)",
      account.email,
      account.name,
    );

    const idQuery = await client.query("SELECT currval('account_seq')");
    const accountId = idQuery.rows[0][0];

    return accountId;
  }

  async all() {
    return client.query("SELECT * FROM account ORDER BY id");
  }

  async find(id: number | string) {
    if (typeof id === "number") {
      return client.query(`SELECT * FROM account WHERE id=$1`, id);
    } else {
      return client.query(`SELECT * FROM account WHERE email=$1`, id);
    }
  }

  async update(id: number, account: Account) {
    return client.query(
      "UPDATE account SET email=$2, name=$3 WHERE id=$1",
      id,
      account.email,
      account.name,
    );
  }

  async delete(id: number) {
    await this.deleteDebates(id);

    const query = client.query("DELETE FROM account WHERE id=$1", id);

    return;
  }
  async deleteDebates(id: number) {
    const debatesQuery = await client.query(
      "SELECT id FROM debate WHERE accountid=$1",
      id,
    );

    const debateids: number[][] = debatesQuery.rows;

    for (let i = 0; i < debateids.length; i++) {
      await debateRepository.delete(debateids[i][0]);
    }

    return;
  }
}

export default new AccountRepo();
