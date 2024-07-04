import mongoose, { Document, Model, Schema } from "mongoose";
import { ICategory } from "./categoryModel";
import { string } from "zod";

export interface IPost extends Document {
  title: string;
  content: string;
  viewCount: number;
  likeCount: number;
  category: ICategory["_id"];
}

const PostSchema: Schema = new Schema(
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
      type: string,
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
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  { timestamps: true },
);

PostSchema.index({ title: "text", content: "text" });

const Post: Model<IPost> =
  mongoose.models?.Post || mongoose.model<IPost>("Post", PostSchema);

export default Post;