import express from 'express';
import userController from './users/user.controller';
import authController from './auth/auth.controller';

export const server = express();

server.use(express.json());

server.use('/api/users', userController);
server.use('/api/auth', authController);
