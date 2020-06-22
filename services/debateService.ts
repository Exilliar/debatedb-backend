import debateRepository from "../repositories/debateRepo.ts";
import Debate from "../model/debateModel.ts";

class debateService {
  getAllDebates = async () => {
    const result = await debateRepository.all();
    const debates = new Array<Debate>();

    result.rows.map((debate) => {
      var temp: any = {};
      result.rowDescription.columns.map((item, index) => {
        temp[item.name] = debate[index];
      });
      debates.push(temp);
    });

    return debates;
  };

  getdebateById = async (id: number) => {
    const result = await debateRepository.find(id);

    var debate: any = {};
    result.rows.map((items) => {
      result.rowDescription.columns.map((item, index) => {
        debate[item.name] = items[index];
      });
    });

    return debate;
  };

  createdebate = async (debate: Debate) => {
    return await debateRepository.create(debate);
  };

  updatedebate = async (id: number, debate: Debate) => {
    return await debateRepository.update(id, debate);
  };

  deletedebate = async (id: number) => {
    return await debateRepository.delete(id);
  };
}

export default new debateService();
