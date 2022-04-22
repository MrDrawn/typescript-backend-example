import express, {NextFunction, Request, Response} from 'express';

import 'reflect-metadata';
import 'express-async-errors';

import 'dotenv/config';

import router from './routes';

import AppError from './exceptions/AppError';

const server = express();

server.use(express.json());

server.use(router);

server.use((error: Error, _request: Request, response: Response, _next: NextFunction) => {
  if (error instanceof AppError) {
    return response.status(error.status).json({
      message: 'Failed to process request',
      error: error.message,
    });
  }

  return response.status(500).json({
    message: 'Internal server error',
    error: error.message,
  });
});

server.listen(3333, () => console.log('Server running in port 3333'));
