import {Request, Response} from 'express';

import UsersRepository from '../repositories/implementations/UsersRepository';

import {compareSync} from 'bcryptjs';

import AppError from '../../../exceptions/AppError';

class UserUpdateController {
  public handle = async (request: Request, response: Response) => {
    const {id} = request.params;

    if (!id) throw new AppError('User id is required', 400);

    const {name, email, password, newPassword} = request.body;

    if (!name || !email || !password) throw new AppError('All fields are required', 400);

    const user = await UsersRepository.findById(id);

    if (!user) throw new AppError('User not found', 404);

    if (email !== user.email) {
      const userAlreadyExists = await UsersRepository.findByEmail(email);

      if (userAlreadyExists) throw new AppError('User already exists', 400);
    }

    const compareHash = compareSync(password, user.password);

    if (!compareHash) throw new AppError('Invalid password', 401);

    await UsersRepository.update({id, name, email, password: newPassword ? newPassword : password});

    return response.status(200).json({message: 'User updated'});
  };
}

export default new UserUpdateController();
