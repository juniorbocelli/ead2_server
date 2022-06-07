import { Request, Response } from 'express';
import DAOPost from '../persistence/mongo/dao/DAOPost';
import Post from '../models/entities/Post';

class PostControler {
  static async getAllPosts(req: Request, res: Response) {
    const daoPost = new DAOPost;

    try {
      const posts = await daoPost.selectAll();

      res.status(200).json(posts);
    } catch (error: any) {
      res.status(200).json({ error: error.message });
    };
  };

  static async addPost(req: Request, res: Response) {
    const {
      title,
      description,
      creator,
    } = req.body;

    const daoPost = new DAOPost;
    const post = Post.getNew(title, description, creator);

    try {
      await daoPost.save(post);

      res.status(200).json(post);
    } catch (error: any) {
      res.status(200).json({ error: error.message });
    };
  };

  static async getPost(req: Request, res: Response) {
    const { id } = req.params;

    const daoPost = new DAOPost;

    try {
      const post = await daoPost.select(id);

      res.status(200).json(post);
    } catch (error: any) {
      res.status(200).json({ error: error.message });
    };
  };

  static async updatePost(req: Request, res: Response) {
    const { id } = req.params;
  

    const daoPost = new DAOPost;
    const previousPost = await daoPost.select(id);
    if (previousPost === null)
      throw new Error("Post inválido");

    const post = Post.getUpdated(req.body, previousPost);

    try {
      await daoPost.save(post);

      res.status(200).json(post);
    } catch (error: any) {
      res.status(200).json({ error: error.message });
    };
  };

  static async removePost(req: Request, res: Response) {
    const { id } = req.params;

    const daoPost = new DAOPost;

    try {
      await daoPost.delete(id);

      res.status(200).json({ message: "Successfuly removed" });
    } catch (error: any) {
      res.status(200).json({ error: error.message });
    };
  };
};

export default PostControler;