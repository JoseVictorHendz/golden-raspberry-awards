const path = require('path');
import csv from 'csv-parser';
import fs from 'fs';

import config from '../utils/env';

import AppDataSource from "./DataSource";
import { Awards, AwardsPartial } from "../repository/entity/awards.entity";

export default async function populateDatabase(): Promise<void> {
    try {
        const awardsRepository = AppDataSource.getRepository(Awards);
        const isPopulate = await awardsRepository.count();
        
        if (isPopulate) {
            console.log('database already populated')
            return;
        }

        const awards: AwardsPartial[] = [];
        const filePath = path.join(__dirname, '..', 'resources', `${config.CSV_FILE_NAME}.csv`);

        fs.createReadStream(filePath)
            .pipe(csv({ separator: ';' }))
            .on('data', (data: any) => {
                const award: AwardsPartial = {
                    year: parseInt(data.year),
                    title: data.title,
                    studios: data.studios,
                    producers: data.producers,
                    winner: data.winner === 'yes' ? true : false,
                };
                awards.push(award);
            })
            .on('end', async () => {
                await awardsRepository.save(awards);
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
