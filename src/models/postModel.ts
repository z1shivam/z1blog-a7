import mongoose, { Document, Model, Schema } from "mongoose";
import { ICategory } from "./categoryModel";

export interface IPost extends Document {
  title: string;
  featuredImage: string;
  content: string;
  viewCount: number;
  likeCount: number;
  author: string;
  slug: string;
  htmlContent: string;
  mdxContent: string;
  categories: ICategory[];
}

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    featuredImage: {
      type: String,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    htmlContent: {
      type: String,
      required: true,
    },
    mdxContent: {
      type: String,
      required: true,
    },
    viewCount: {
      type: Number,
      default: 0,
    },
    likeCount: {
      type: Number,
      default: 0,
    },
    categories: [
      {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true,
      },
    ],
  },
  { timestamps: true }
);

const Post: Model<IPost> =
  mongoose.models?.Post || mongoose.model<IPost>("Post", PostSchema);

export default Post;
