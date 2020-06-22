import { client } from "../db/database.ts";
import Account from "../model/accountModel.ts";

class AccountRepo {
  async create(account: Account) {
    return client.query(
      "INSERT INTO account (email, name) VALUES ($1, $2)",
      account.email,
      account.name,
    );
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
    return client.query("DELETE FROM account WHERE id=$1", id);
  }
}

export default new AccountRepo();
