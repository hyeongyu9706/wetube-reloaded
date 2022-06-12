import express from 'express';
import { watch, getEdit, postEdit, getUpload, postUploaad, deleteVideo } from '../controllers/videoController';
import { protectorMiddlewaree } from '../middleware';

const videoRouter = express.Router();

videoRouter.get('/:id([0-9a-f]{24})', watch);
videoRouter.route('/:id([0-9a-f]{24})/edit').all(protectorMiddlewaree).get(getEdit).post(postEdit);
videoRouter.route('/:id([0-9a-f]{24})/delete').all(protectorMiddlewaree).get(deleteVideo);
videoRouter.route('/upload').get(getUpload).all(protectorMiddlewaree).post(postUploaad);

export default videoRouter;
