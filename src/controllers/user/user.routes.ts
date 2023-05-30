import express from 'express';
const userRouter = express.Router();
import  { registerUser, loginUser, getMe, authenticate } from './user';

userRouter.post('/api/user/register', registerUser);
userRouter.post('/api/user/login', loginUser);
userRouter.get('/api/user/me', authenticate, getMe);

export default userRouter;