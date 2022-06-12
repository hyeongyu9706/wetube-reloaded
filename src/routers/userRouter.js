import express from 'express';
import { protectorMiddlewaree } from '../middleware';
import {
    removeUser,
    logout,
    see,
    startGithubLogin,
    finishGithubLogin,
    postEdit,
    getEdit,
    getChangePassword,
    postChangePassword,
} from '../controllers/userController';
const userRouter = express.Router();

userRouter.get('/logout', logout);
userRouter.route('/edit').all(protectorMiddlewaree).get(getEdit).post(postEdit);
userRouter.route('/change-password').all(protectorMiddlewaree).get(getChangePassword).post(postChangePassword);
userRouter.get('/remove', removeUser);
userRouter.get('/github/start', startGithubLogin);
userRouter.get('/github/finish', finishGithubLogin);
userRouter.get(':id', see);

export default userRouter;
