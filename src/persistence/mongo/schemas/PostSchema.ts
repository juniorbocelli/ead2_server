import mongoose from "mongoose";
import Post from '../../../models/entities/Post'

const postSchema = new mongoose.Schema<Post>({
  title: {
    type: String,
    required: [true, 'O título é obrigatório'],
  },
  description: {
    type: String,
    required: [true, 'A descrição é obrigatóriaa'],
  },
  creator: {
    type: String,
    required: [true, 'O criador é obrigatório'],
  },
  createdAt: {
    type: Date,
    default: new Date(),
    required: [true, 'A data de criação é obrigatória'],
  },
  updatedAt: {
    type: Date,
    required: false,
    default: null,
  },
});

// To create methods: https://mongoosejs.com/docs/index.html
var PostSchema = mongoose.model("Post", postSchema);

export default PostSchema;