import dbConnect from "@/lib/dbConnect";
import { WriteForm } from "./WritingForm";
import Category from "@/models/categoryModel";

export default async function WriteFormServerWrapper() {
  await dbConnect();
  const receivedCategories = await Category.find({}, "name");
  const categoryOptions: any[] = [];
  receivedCategories.forEach((category) =>
    categoryOptions.push({ label: category.name, value: category.name }),
  );

  console.log(categoryOptions);
  return <WriteForm initialCategories={categoryOptions} />;
}
