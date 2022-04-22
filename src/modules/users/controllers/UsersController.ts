import {Request, Response} from 'express';

import UsersRepository from '../repositories/implementations/UsersRepository';

class UsersController {
  public handle = async (_request: Request, response: Response) => {
    const users = await UsersRepository.findAll();

    return response.status(200).json(users);
  };
}

export default new UsersController();
