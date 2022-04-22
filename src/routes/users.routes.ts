import {Router} from 'express';

import UsersController from '../modules/users/controllers/UsersController';
import UserCreateController from '../modules/users/controllers/UserCreateController';
import UserUpdateController from '../modules/users/controllers/UserUpdateController';

const usersRoutes = Router();

usersRoutes.get('/', UsersController.handle);

usersRoutes.post('/', UserCreateController.handle);

usersRoutes.put('/:id', UserUpdateController.handle);

export default usersRoutes;
