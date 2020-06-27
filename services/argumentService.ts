import argumentRepository from "../repositories/argumentRepo.ts";
import Argument from "../model/argumentModel.ts";

class argumentService {
  getAllArguments = async (debateId: number) => {
    const result = await argumentRepository.all(debateId);
    const allArguments = new Array<Argument>();

    result.rows.map((argument) => {
      let temp: any = {};
      result.rowDescription.columns.map((item, index) => {
        temp[item.name] = argument[index];
      });
      allArguments.push(temp);
    });

    return allArguments;
  };

  getargumentById = async (id: number) => {
    const result = await argumentRepository.find(id);

    let argument: any = {};
    result.rows.map((items) => {
      result.rowDescription.columns.map((item, index) => {
        argument[item.name] = items[index];
      });
    });

    return argument;
  };

  createargument = async (argument: Argument) => {
    return await argumentRepository.create(argument);
  };

  updateargument = async (id: number, argument: Argument) => {
    return await argumentRepository.update(id, argument);
  };

  deleteargument = async (id: number) => {
    return await argumentRepository.delete(id);
  };
}

export default new argumentService();
