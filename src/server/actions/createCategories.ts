"use server"

import dbConnect from "@/lib/dbConnect";
import Category from "@/models/categoryModel";

interface CategoryInput {
  label: string;
  value: string;
  __isNew__?: boolean;
}

interface CategoryOutput {
  label: string;
  value: string;
  __isNew__?: boolean;
}

export async function createCategoryIfNotExist(
  input: CategoryInput[],
): Promise<CategoryOutput[]> {
  await dbConnect();

  const correctCategoryArray = await Promise.all(
    input.map(async (object) => {
      if (object.__isNew__) {
        const result = await Category.create({ name: object.label });
        object.value = String(result._id);
      }
      return object;
    })
  );

  return correctCategoryArray;
}
