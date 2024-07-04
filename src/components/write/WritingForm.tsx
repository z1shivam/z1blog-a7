"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { contentSchema } from "@/schemas/contentSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { startTransition, useRef, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { MultiSelect } from "react-multi-select-component";
import { z } from "zod";
import EditorComponent from "./EditorComponent";
import { micromark } from "micromark";
import {savePost} from "@/server/actions/savepost";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { createCategoryIfNotExist } from "@/server/actions/createCategories";

interface WriteFormProps {
  initialCategories: { label: string; value: string }[];
  initialContent?: string;
}

interface EditorComponentHandle {
  getValue: () => string;
  setValue: (value: string) => void;
}

export function WriteForm({
  initialCategories,
  initialContent,
}: WriteFormProps) {
  const form = useForm<z.infer<typeof contentSchema>>({
    resolver: zodResolver(contentSchema),
    defaultValues: {
      title: "",
      slug: "",
      author: "Shivam Kumar",
      mdxContent: "",
      categories: [],
      featuredImage: "",
    },
  });

  const editorRef = useRef<EditorComponentHandle>(null);
  const [selected, setSelected] = useState<{ value: string; label: string; __isNew__?:boolean}[]>(
    [],
  );
  const [categories, setCategories] = useState(initialCategories);
  const [isPending, startTransition] = useTransition();
  const generateSlug = () => {
    const slug = form.getValues().title.toLowerCase().replace(/ /g, "-");
    form.setValue("slug", slug);
  };

  const convertLineBreaks = (input: string) => {
    return input.replace(/\n/g, "<br />");
  };
  const removeLineBreaks = (input: string) => {
    return input.replace(/\n/g, "");
  };

  function onSubmit(values: z.infer<typeof contentSchema>) {
    startTransition(async () => {
      const correctCategoryArray = await createCategoryIfNotExist(selected);
      const selectedCategories: string[] = [];

      correctCategoryArray.map((item) => selectedCategories.push(item.value));

      const title = values.title;
      const slug = values.slug;
      const categories = selectedCategories;
      const author = values.author;
      const mdxContent = editorRef.current?.getValue() as string;
      const htmlContent = removeLineBreaks(
        micromark(editorRef.current?.getValue() as string),
      );
      const featuredImage = values.featuredImage as string;

      const post = {
        title,
        slug,
        categories,
        author,
        mdxContent,
        htmlContent,
        featuredImage,
      };

      savePost(post).then((data) => {});
      // form.reset();
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title of the post</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} disabled={isPending} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug for the URL</FormLabel>
              <FormControl>
                <div className="flex gap-4">
                  <Input placeholder="shadcn" {...field} disabled={isPending} />
                  <Button
                    type="button"
                    onClick={generateSlug}
                    disabled={isPending}
                  >
                    Generate
                  </Button>
                </div>
              </FormControl>
              <FormControl></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="author"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name of the Author</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} disabled={isPending} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="categories"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categories for the post</FormLabel>
              <FormControl>
                <MultiSelect
                  isCreatable
                  hasSelectAll={false}
                  options={initialCategories}
                  value={selected}
                  onChange={setSelected}
                  labelledBy="Select all categories"
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="mdxContent"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <EditorComponent
                  ref={editorRef}
                  initialValue={initialContent}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending}>
          {isPending && (
            <AiOutlineLoading3Quarters className="mx-3 h-4 w-4 animate-spin" />
          )}
          Submit
        </Button>
      </form>
    </Form>
  );
}
