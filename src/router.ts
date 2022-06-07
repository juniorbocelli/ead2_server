import { Router, Request, Response } from 'express';

import PostControler from './controllers/PostController';
import * as GlobalRoutes from './globals/routes';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.json({ message: 'hello world with Typescript' });
});

// Post Routes
router.get(GlobalRoutes.API_POST_LIST, PostControler.getAllPosts);
router.post(GlobalRoutes.API_POST_NEW, PostControler.addPost);
router.get(GlobalRoutes.API_POST_GET, PostControler.getPost);
router.patch(GlobalRoutes.API_POST_UPDATE, PostControler.updatePost);
router.delete(GlobalRoutes.API_POST_DELETE, PostControler.removePost);

export default router;