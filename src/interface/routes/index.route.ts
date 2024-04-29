import { Router } from 'express';

import filmsRouter from '../controllers/films.controller';


const routes = Router();

routes.use('/max-min-interval-winner', filmsRouter);

export default routes;