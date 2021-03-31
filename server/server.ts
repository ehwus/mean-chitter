import express from 'express';
import userController from './users/user.controller';

export const server = express();

server.use(express.json());

server.use('/api/users', userController);
