import express from 'express';
import { editUser, removeUser, logout, see } from '../controllers/userController';
const userRouter = express.Router();

userRouter.get('/logout', logout);
userRouter.get(':id', see);
userRouter.get('/edit', editUser);
userRouter.get('/delete', removeUser);

export default userRouter;
