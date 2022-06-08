import mongoose from 'mongoose';

import DAO from '../../utils/DAO';
import PostSchema from '../../mongo/schemas/PostSchema';
import Post from '../../../models/entities/Post';

class DAOPost implements DAO<Post, string> {
  isValidObjectId(post: Post | string): boolean {

    if (post instanceof Post)
      if (post.id !== null)
        return mongoose.Types.ObjectId.isValid(post.id)
      else
        return false;
    else
      return mongoose.Types.ObjectId.isValid(post);
  };

  async save(post: Post) {
    let postSchema: Post & mongoose.Document<any, any, Post>;

    postSchema = new PostSchema({
      title: post.title,
      description: post.description,
      creator: post.creator,

      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    });

    return Post.getFromObject(await postSchema.save());
  };

  async update(post: Post) {
    if (!this.isValidObjectId(post))
      throw 'O id do post é inválido';

    const updatedPost = {
      title: post.title,
      description: post.description,
      creator: post.creator,

      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    };

    const updatePost = await PostSchema.findByIdAndUpdate(post.id, updatedPost, { new: true });

    if (updatePost !== null)
      return Post.getFromObject(updatePost);

    return null;
  };

  async saveOrUpdate(post: Post) {
    if (typeof (post.id) === "undefined") {
      return this.save(post);
    };

    if (!this.isValidObjectId(post))
      throw `O id do post é inválido`;

    const singlePost = await PostSchema.findById(post.id);

    if (singlePost === null)
      return this.save(post);
    else
      return this.update(post);
  };

  async saveOrUpdateWithReturnId(post: Post): Promise<string> {
    await this.saveOrUpdate(post);

    return post.id!?.toString();
  };

  async delete(id: string): Promise<void> {
    if (!this.isValidObjectId(id))
      throw `O id do post é inválido`;

    await PostSchema.findByIdAndRemove(id);
  };

  async select(id: string): Promise<Post | null> {
    const post = await PostSchema.findById(id);

    if (post === null)
      return null;

    return Post.getFromObject(post);
  };

  async selectAll(): Promise<Array<Post>> {
    const posts = await PostSchema.find();
    let postsToReturn: Array<Post> = [];

    posts.forEach((post) => {
      postsToReturn.push(Post.getFromObject(post));
    });

    return postsToReturn;
  };

  async selectBy(query: Object): Promise<Array<Post>> {
    const posts = await PostSchema.find(query).exec();
    let postsToReturn: Array<Post> = [];

    posts.forEach((post) => {
      postsToReturn.push(Post.getFromObject(post));
    });

    return postsToReturn;
  };
};

export default DAOPost;