import AppDataSource from "../database/DataSource";
import AwardsRepository from "../repository/awards.repository";
import { Award } from "../repository/entity/awards.entity";
import { ProducerHistory } from "../utils/types";

class AwardsUseCase {
  async findProducerWinnerWhitiMaxMinIntervals(): Promise<ProducerHistory> {
    const awardsRepository = new AwardsRepository();

    const awards = await awardsRepository.findProducerWinnerWhitiMaxMinIntervals();
    
    return this.findeProducerMaxMinIntervals(awards);
  }

  findeProducerMaxMinIntervals(awards: Award[]): ProducerHistory {
    const groupedData = awards.reduce((acc, movie) => {
      movie.producers.forEach((producer) => {
        if (!acc[producer.name]) {
          acc[producer.name] = [];
        }
        if (movie.winner) {
          acc[producer.name].push(movie.year);
        }
      });
      return acc;
    }, {} as { [key: string]: number[] });
  
    const results: ProducerHistory = { min: [], max: [] };
  
    Object.keys(groupedData).forEach((producer) => {
      const years = groupedData[producer].sort((a, b) => a - b);
      const intervals = years.slice(1).map((year, index) => year - years[index]);
      const maxInterval = Math.max(...intervals);
      const minInterval = Math.min(...intervals);

      if(maxInterval > 0) {
          results.max.push({
            producer,
            interval: maxInterval,
            previousWin: years[intervals.indexOf(minInterval)],
            followingWin: years[intervals.indexOf(maxInterval) + 1],
          });
      }

      if(maxInterval > 0) {
        results.min.push({
          producer,
          interval: minInterval,
          previousWin: years[intervals.indexOf(minInterval)],
          followingWin: years[intervals.indexOf(minInterval) + 1],
        });
      }
    });
  
    results.max.sort((a, b) => b.interval - a.interval);
    results.min.sort((a, b) => a.interval - b.interval);

    return  {
      max: results.max.filter((obj) => obj.interval === results.max[0].interval),
      min: results.min.filter((obj) => obj.interval === results.min[0].interval)
    };
  }
}

export default AwardsUseCase;