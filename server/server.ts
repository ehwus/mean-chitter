import express from 'express';
import userController from './users/user.controller';
import authController from './auth/auth.controller';
import cors from 'cors';

export const server = express();

server.use(express.json());
server.use(cors());

server.use('/api/users', userController);
server.use('/api/auth', authController);
