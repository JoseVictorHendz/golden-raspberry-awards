import AppDataSource from "../database/DataSource";
import { Producer } from "./entity/producers.entity";

class ProducersRepository {

  async findOneProducer(id: number, name: string):  Promise<Producer | null> {
    const producersRepository = AppDataSource.getRepository(Producer);
      return producersRepository.findOneBy({ id, name });
  }
}

export default ProducersRepository;