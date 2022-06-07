class Post {
  id: string | null;

  title: string;
  description: string;
  creator: string;

  createdAt: Date;
  updatedAt: Date | null;

  constructor(id: Post['id'], title: Post['title'], description: Post['description'], creator: Post['creator'], createdAt: Post['createdAt'], updatedAt: Post['updatedAt']) {
    this.id = id;

    this.title = title;
    this.description = description;
    this.creator = creator;

    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  };

  public static getNew(title: Post['title'], description: Post['description'], creator: Post['creator']): Post {
    return new Post(null, title, description, creator, new Date(), null);
  };

  public static getFromObject(o: Post): Post {
    return new Post(o.id, o.title, o.description, o.creator, o.createdAt, o.updatedAt);
  };

  public static getUpdated(o: Object, previousPost: Post): Post {
    let post = o as Post;

    const updatedPost = {
      // Imutable fields
      id: previousPost.id,
      createdAt: previousPost.createdAt,
      creator: previousPost.creator,

      title: post['title'] || previousPost.title,
      description: post['description'] || previousPost.description,
      updatedAt: post['updatedAt'] || new Date(),
    };

    return this.getFromObject(updatedPost as Post);
  };
};

export default Post;