import request from 'supertest';
import app from '../server';
import { describe, it } from 'node:test';
import { expect, beforeAll, afterAll } from '@jest/globals';
import AppDataSource from '../database/DataSource';
import populateDatabase from '../database/PopulateDatabase';



describe('Max-Min Interval Winner', () => {
  // beforeAll(async () => {
  //   await AppDataSource.initialize();
  //   console.log('Connected to database');
  //   await populateDatabase().catch((error: any) => console.error(error));
  // });

  // afterAll(async () => {
  //   await AppDataSource.destroy();
  //   console.log('Disconnected from database');
  // });

    beforeAll(async () => {
    // await AppDataSource.initialize();
    // await AppDataSource.runMigrations();
    // await import('../database/PopulateDatabase'); // import the populateDatabase module to populate the database
    await new Promise(resolve => setTimeout(resolve, 5000)); // wait for 5 seconds to ensure the database population is complete
  });

  afterAll(async () => {
    // await AppDataSource.destroy();
  });
  
  it('should return the producer with the max and min intervals between wins', async () => {
    const response = await request(app)
      .get('/max-min-interval-winner')
      .expect(200);

    expect(response.body).toHaveProperty('max');
    expect(response.body.max).toHaveLength(1);
    expect(response.body.max[0]).toHaveProperty('producer');
    expect(response.body.max[0]).toHaveProperty('interval');

    expect(response.body).toHaveProperty('min');
    expect(response.body.min).toHaveLength(1);
    expect(response.body.min[0]).toHaveProperty('producer');
    expect(response.body.min[0]).toHaveProperty('interval');
  });
});