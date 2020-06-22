import accountRepository from "../repositories/accountRepo.ts";
import Account from "../model/accountModel.ts";

class accountService {
  getAllAccounts = async () => {
    const result = await accountRepository.all();
    const accounts = new Array<Account>();

    result.rows.map((account) => {
      let temp: any = {};
      result.rowDescription.columns.map((item, index) => {
        temp[item.name] = account[index];
      });
      accounts.push(temp);
    });

    return accounts;
  };

  getaccountById = async (id: number | string) => {
    const result = await accountRepository.find(id);

    let account: any = {};
    result.rows.map((items) => {
      result.rowDescription.columns.map((item, index) => {
        account[item.name] = items[index];
      });
    });

    return account;
  };

  createaccount = async (account: Account) => {
    return await accountRepository.create(account);
  };

  updateaccount = async (id: number, account: Account) => {
    return await accountRepository.update(id, account);
  };

  deleteaccount = async (id: number) => {
    return await accountRepository.delete(id);
  };
}

export default new accountService();
