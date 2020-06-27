import sourceRepository from "../repositories/sourceRepo.ts";
import Source from "../model/sourceModel.ts";

class sourceService {
  getAllSources = async (argumentid: number) => {
    const result = await sourceRepository.all(argumentid);
    const sources = new Array<Source>();

    if (result !== undefined) {
      result.rows.map((source) => {
        let temp: any = {};
        result.rowDescription.columns.map((item, index) => {
          temp[item.name] = source[index];
        });
        sources.push(temp);
      });
    }

    return sources;
  };

  getsourceById = async (id: number) => {
    const result = await sourceRepository.find(id);

    let source: any = {};
    result.rows.map((items) => {
      result.rowDescription.columns.map((item, index) => {
        source[item.name] = items[index];
      });
    });

    return source;
  };

  createsource = async (source: Source, argumentid: number) => {
    return await sourceRepository.create(source, argumentid);
  };

  updatesource = async (id: number, source: Source) => {
    return await sourceRepository.update(id, source);
  };

  deletesource = async (id: number) => {
    return await sourceRepository.delete(id);
  };
}

export default new sourceService();
