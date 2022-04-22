import {Request, Response, Router} from 'express';
import usersRoutes from './users.routes';

const router = Router();

router.get('/', (_request: Request, response: Response) => {
  return response.status(200).json({
    name: 'Javascript',
    version: '1.0.0',
    author: 'MrDrawn',
  });
});

router.use('/users', usersRoutes);

export default router;
