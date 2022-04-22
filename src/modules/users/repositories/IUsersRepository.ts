import {User} from '@prisma/client';

interface IUsersRepository {
  findAll(): Promise<User[]>;
  findById(id: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
  create({name, email, password}: ICreateUserDTO): Promise<User>;
  update({id, name, email, password}: IUpdateUserDTO): Promise<User>;
}

export {IUsersRepository};
