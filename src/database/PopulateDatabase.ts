const path = require('path');
import csv from 'csv-parser';
import fs from 'fs';

import config from '../utils/env';

import AppDataSource from "./DataSource";
import { Award } from "../repository/entity/awards.entity";
import { Producer } from '../repository/entity/producers.entity';

export default async function populateDatabase(): Promise<void> {
    try {
        const awardsRepository = AppDataSource.getRepository(Award);
        const isPopulate = await awardsRepository.count();

        if (isPopulate) {
            console.log('database already populated')
            return;
        }

        const awards: Partial<Award>[] = [];
        const producers: string[] = [];
        const filePath = path.join(__dirname, '..', 'resources', `${config.CSV_FILE_NAME}.csv`);

        fs.createReadStream(filePath)
            .pipe(csv({ separator: ';' }))
            .on('data', (data: any) => {
                const award: Partial<Award> = {
                    year: parseInt(data.year),
                    title: data.title,
                    studios: data.studios,
                    winner: data.winner === 'yes' ? true : false,
                    producers: data.producers
                };
                awards.push(award);
                producers.push(data.producers);
            })
            .on('end', async () => {
                await saveProducers(producers)
                await saveAwards(awards)
                console.log("database has been populated")
            })
            .on('error', (error) => {
                console.error('Error parsing CSV:', error);
                return;
            });
    } catch (error) {
        console.error('Error reading CSV file:', error);
    }
}


async function saveProducers(producersArray: string[]): Promise<void> {
    const objectsArray = parseArrayToProducer(producersArray);

    const producersRepository = AppDataSource.getRepository(Producer);
    await producersRepository.save(objectsArray);
}

function parseArrayToProducer(producersArray: string[]) {
    const treatedProducer = producersArray.reduce((acc, item) => {
        return acc.concat(
            item
                .split(/\band\b|,/)
                .map(part => part.trim())
                .filter(part => part !== '')
                .map(name => ({ name }))
        );
    }, [] as { name: string }[]);

    const removeDuplicatesProducers = treatedProducer.filter((obj, index, self) =>
        index === self.findIndex((o) => (
            o.name === obj.name
        ))
    );

    return removeDuplicatesProducers
}


async function saveAwards(awards: Partial<Award>[]): Promise<void> {

    const producersRepository = AppDataSource.getRepository(Producer);

    for await (const award of awards) {
        if (!award.producers) {
          continue; 
        }
    
        const producerNames = award.producers.toString().split(/\band\b|,/);
    
        const filteredNames = producerNames.filter(part => part.trim() !== "");
    
        award.producers = [];
    
        for (const producerName of filteredNames) {
            const regex = /^\s+|\s+$/g;

            const producer = await producersRepository.findOneBy({ name: producerName.replace(regex, "") });
            if(!producer) {
                console.log(producerName.replace(regex, ""))
                continue;
            }
            award.producers.push(producer);
        }
      }
    const awardsRepository = AppDataSource.getRepository(Award);
    await awardsRepository.save(awards);
}
