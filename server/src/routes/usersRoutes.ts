import express from 'express';
import { createUser, getUser, isUsernametaken, getUserProfile } from '../controllers/users.js';

const usersRouter = express.Router()
usersRouter.post('/create', createUser);
usersRouter.post('/isUserNameTaken', isUsernametaken);
usersRouter.get('/login', getUser);
usersRouter.get('/getUserProfile', getUserProfile);

export default usersRouter;