import express from 'express';
import { login, logout } from '../controllers/auth.js';

const authRouter = express.Router();
authRouter.post('/login', login);
authRouter.get('/logout', logout);

export default authRouter;