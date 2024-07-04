import z from "zod";

export const contentSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, { message: "Title is required!" })
    .max(100, { message: "Title is too long" }),
  featuredImage: z.string().trim().optional(),
  author: z.string().trim(),
  slug: z.string().trim(),
  mdxContent: z.string().min(1, { message: "Content can not be empty!" }),
  category: z.string(),
});
