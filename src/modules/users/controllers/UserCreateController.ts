import {Request, Response} from 'express';

import UsersRepository from '../repositories/implementations/UsersRepository';

import AppError from '../../../exceptions/AppError';

class UserCreateController {
  public handle = async (request: Request, response: Response) => {
    const {name, email, password} = request.body;

    if (!name || !email || !password) throw new AppError('Missing data in body', 400);

    const userAlreadyExists = await UsersRepository.findByEmail(email);

    if (userAlreadyExists) throw new AppError('User already exists', 400);

    const user = await UsersRepository.create({
      name,
      email,
      password,
    });

    return response.status(201).json(user);
  };
}

export default new UserCreateController();
