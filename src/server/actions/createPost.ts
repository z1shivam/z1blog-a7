"use server";

import dbConnect from "@/lib/dbConnect";
import Post from "@/models/postModel";
import mongoose from "mongoose";
import { validateRequest } from "../auth/validateSession";

interface IPostInput {
  title: string;
  featuredImage: string;
  author: string;
  slug: string;
  mdxContent: string;
  htmlContent: string;
  categories: string[];
}

export async function createPost(input: IPostInput) {
  try {
    await dbConnect();
    const { user } = await validateRequest();
    const categoryIds = input.categories.map(
      (id) => new mongoose.Types.ObjectId(id),
    );

    await Post.create({
      title: input.title,
      featuredImage: input.featuredImage,
      author: input.author,
      authorId: user?.id,
      slug: input.slug,
      mdxContent: input.mdxContent,
      htmlContent: input.htmlContent,
      categories: categoryIds,
    });

    return { success: "Post created successfully" };
  } catch (error) {
    console.log(error);
    return { error: "There was a problem creating the post" };
  }
}
