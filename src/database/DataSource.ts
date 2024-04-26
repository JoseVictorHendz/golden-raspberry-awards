import { DataSource } from 'typeorm';
import config from '../utils/env';

const AppDataSource = new DataSource({
  type: 'sqlite',
  database: `src/database/${config.DB_NAME}.sqlite`,
  synchronize: true,
  logging: false,
  entities: ['src/repository/entity/**/*.ts'],
  migrations: ['src/database/migration/**/*.ts'],
  subscribers: ['src/subscriber/**/*.ts'],
});

export default AppDataSource;