import mongoose from "mongoose";
import Post from '../../../models/entities/Post'

const postSchema = new mongoose.Schema<Post>({
  title: {
    type: String,
    required: [true, 'The title is required'],
  },
  description: {
    type: String,
    required: [true, 'The description is required'],
  },
  creator: {
    type: String,
    required: [true, 'The creator user is required'],
  },
  createdAt: {
    type: Date,
    default: new Date(),
    required: [true, 'The date of creation is required'],
  },
  updatedAt: {
    type: Date,
    required: false,
  },
});

// To create methods: https://mongoosejs.com/docs/index.html
var PostSchema = mongoose.model("Post", postSchema);

export default PostSchema;