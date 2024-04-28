import AppDataSource from "../database/DataSource";
import AwardsRepository from "../repository/awards.repository";
import { Award } from "../repository/entity/awards.entity";

class AwardsUseCase {
  async findProducerWinnerWhitiMaxMinIntervals(): Promise<Award | undefined> {
    const awardsRepository = new AwardsRepository();

    // await awardsRepository.findProducerMaxIntervals();
    // await awardsRepository.findProducerMinIntervals();
    await awardsRepository.findAllWinners();

    return undefined;
  }
}

export default AwardsUseCase;