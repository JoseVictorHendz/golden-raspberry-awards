
import { Router } from 'express';

import FilmsUseCase from '../../useCase/films.use.case';

const filmsRouter = Router();

filmsRouter.get('/', async (request, Response) => {

  const filmsUseCase = new FilmsUseCase();


  const films = await filmsUseCase.findProducerWinnerWhitiMaxMinIntervals();

  Response.json(films);
});


export default filmsRouter;