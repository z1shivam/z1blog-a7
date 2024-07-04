"use server";

import dbConnect from "@/lib/dbConnect";
import Category from "@/models/categoryModel";

export async function getAllCategories(): Promise<string[]> {
  await dbConnect();
  const allCategories = await Category.find();
  console.log(allCategories);
  return ["a", "b", "c"];
}
