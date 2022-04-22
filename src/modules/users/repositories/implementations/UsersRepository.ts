import {User} from '@prisma/client';

import {IUsersRepository} from '../IUsersRepository';

import prismaClient from '../../../../databases';

import {hashSync} from 'bcryptjs';

class UsersRepository implements IUsersRepository {
  async findAll(): Promise<User[]> {
    const users = await prismaClient.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        password: false,
        actived: true,
        group: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return users as User[];
  }

  async findById(id: string): Promise<User> {
    const user = await prismaClient.user.findFirst({
      where: {
        id,
      },
    });

    return user as User;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await prismaClient.user.findFirst({
      where: {
        email,
      },
    });

    return user as User;
  }

  async create({name, email, password}: ICreateUserDTO): Promise<User> {
    const user = await prismaClient.user.create({
      data: {
        name,
        email,
        password: hashSync(password, 12),
      },
    });

    return user;
  }

  async update({id, name, email, password}: IUpdateUserDTO): Promise<User> {
    const user = await prismaClient.user.update({
      where: {
        id,
      },
      data: {
        name,
        email,
        password: hashSync(password, 12),
      },
    });

    return user;
  }
}

export default new UsersRepository();
