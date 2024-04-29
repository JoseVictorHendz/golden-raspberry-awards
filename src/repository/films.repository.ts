import AppDataSource from "../database/DataSource";
import { Film } from "../repository/entity/films.entity";

class FilmsRepository {

  async findProducerWinnerWhitiMaxMinIntervals(): Promise<Film[]> {
    const filmsRepository = AppDataSource.getRepository(Film);

    const response = await filmsRepository.find({
      where: { winner: true },
      relations: ["producers"],
    });

    return response;
  }
}

export default FilmsRepository;