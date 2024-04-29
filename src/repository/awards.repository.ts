import AppDataSource from "../database/DataSource";
import { Award } from "../repository/entity/awards.entity";
import { ProducerHistory } from "../utils/types";

class AwardsRepository {

  async findProducerWinnerWhitiMaxMinIntervals(): Promise<Award[]> {
    const awardsRepository = AppDataSource.getRepository(Award);

    const response = await awardsRepository.find({
      where: { winner: true },
      relations: ["producers"],
    });

    return response;
  }
}

export default AwardsRepository;