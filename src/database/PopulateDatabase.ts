const path = require('path');
import csv from 'csv-parser';
import fs from 'fs';

import config from '../utils/env';

import AppDataSource from "./DataSource";
import { Film } from "../repository/entity/films.entity";
import { Producer } from '../repository/entity/producers.entity';

export default async function populateDatabase(): Promise<void> {
    try {
        const filmsRepository = AppDataSource.getRepository(Film);
        const isPopulate = await filmsRepository.count();

        if (isPopulate) {
            console.log('database already populated')
            return;
        }

        const films: Partial<Film>[] = [];
        const producers: string[] = [];
        const filePath = path.join(__dirname, '..', 'resources', `${config.CSV_FILE_NAME}.csv`);

        fs.createReadStream(filePath)
            .pipe(csv({ separator: ';' }))
            .on('data', (data: any) => {
                const film: Partial<Film> = {
                    year: parseInt(data.year),
                    title: data.title,
                    studios: data.studios,
                    winner: data.winner === 'yes' ? true : false,
                    producers: data.producers
                };
                films.push(film);
                producers.push(data.producers);
            })
            .on('end', async () => {
                await saveProducers(producers)
                await saveFilms(films)
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


async function saveFilms(films: Partial<Film>[]): Promise<void> {

    const producersRepository = AppDataSource.getRepository(Producer);

    for await (const film of films) {
        if (!film.producers) {
          continue; 
        }
    
        const producerNames = film.producers.toString().split(/\band\b|,/);
    
        const filteredNames = producerNames.filter(part => part.trim() !== "");
    
        film.producers = [];
    
        for (const producerName of filteredNames) {
            const regex = /^\s+|\s+$/g;

            const producer = await producersRepository.findOneBy({ name: producerName.replace(regex, "") });
            if(!producer) {
                console.log(producerName.replace(regex, ""))
                continue;
            }
            film.producers.push(producer);
        }
      }
    const filmsRepository = AppDataSource.getRepository(Film);
    await filmsRepository.save(films);
}
