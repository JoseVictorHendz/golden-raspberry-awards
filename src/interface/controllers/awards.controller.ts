
import { Router } from 'express';

import AwardsUseCase from '../../useCase/awards.use.case';

const awardsRouter = Router();

awardsRouter.get('/', async (request, Response) => {

  const awardsUseCase = new AwardsUseCase();


  const awards = await awardsUseCase.findProducerWinnerWhitiMaxMinIntervals();

  Response.json(awards);
});


export default awardsRouter;