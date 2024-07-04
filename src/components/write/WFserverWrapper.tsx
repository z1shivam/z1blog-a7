import dbConnect from "@/lib/dbConnect";
import Category from "@/models/categoryModel";
import { WriteForm } from "./WritingForm";

export default async function WriteFormServerWrapper() {
  await dbConnect();
  const receivedCategories = await Category.find({}, "name");
  const categoryOptions: any[] = [];
  receivedCategories.forEach((category) =>
    categoryOptions.push({ label: category.name, value: String(category._id)}),
  );

  return <WriteForm initialCategories={categoryOptions}/>;
}
