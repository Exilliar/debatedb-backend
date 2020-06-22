import infoRepository from "../repositories/infoRepo.ts";
import Info from "../model/infoModel.ts";

class infoService {
  getAllInfos = async () => {
    const result = await infoRepository.all();
    const infos = new Array<Info>();

    result.rows.map((info) => {
      let temp: any = {};
      result.rowDescription.columns.map((item, index) => {
        temp[item.name] = info[index];
      });
      infos.push(temp);
    });

    return infos;
  };

  getinfoById = async (id: number) => {
    const result = await infoRepository.find(id);

    let info: any = {};
    result.rows.map((items) => {
      result.rowDescription.columns.map((item, index) => {
        info[item.name] = items[index];
      });
    });

    return info;
  };

  createinfo = async (info: Info) => {
    return await infoRepository.create(info);
  };

  updateinfo = async (id: number, info: Info) => {
    return await infoRepository.update(id, info);
  };

  deleteinfo = async (id: number) => {
    return await infoRepository.delete(id);
  };
}

export default new infoService();
