import express from 'express';
import config from './utils/env';
import routes from './interface/routes/index.route';
import populateDatabase from './database/PopulateDatabase';
import AppDataSource from './database/DataSource';

const app = express();
const port = config.PORT;

app.use(express.json());
app.use(routes);

(async () => {
    await AppDataSource.initialize();
    console.log('Connected to database');
    await populateDatabase().catch((error: any) => console.error(error));
    app.listen(port, () => {
        console.log(`App listening on port ${port}`);
    })
})();

export default app;