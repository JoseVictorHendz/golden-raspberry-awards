import AppDataSource from "../database/DataSource";
import { Award } from "../repository/entity/awards.entity";

class AwardsRepository {

  async findAllWinners():  Promise<void> {
    const awardsRepository = AppDataSource.getRepository(Award);

    const query = `
    SELECT producers, COUNT(*) AS count_of_winners
    FROM awards
    WHERE winner = true
    GROUP BY producers;
    `;

    const result = await awardsRepository.query(query);

    console.log('--- all winners ---', result)

  }
}

export default AwardsRepository;