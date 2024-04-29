import { Router } from 'express';

import awardsRouter from '../controllers/awards.controller';


const routes = Router();

routes.use('/max-min-interval-winner', awardsRouter);

export default routes;