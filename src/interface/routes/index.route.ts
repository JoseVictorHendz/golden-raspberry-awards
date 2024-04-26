import { Router } from 'express';

import awardsRouter from '../controllers/awards.controller';


const routes = Router();

routes.use('/awards', awardsRouter);

export default routes;