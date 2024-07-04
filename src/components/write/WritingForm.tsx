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
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { MultiSelect } from "react-multi-select-component";
import { z } from "zod";
import EditorComponent from "./EditorComponent";

interface WriteFormProps {
  initialCategories: { label: string; value: string }[];
}

interface EditorComponentHandle {
  getValue: () => string;
  setValue: (value: string) => void;
}

export function WriteForm({ initialCategories }: WriteFormProps) {
  const form = useForm<z.infer<typeof contentSchema>>({
    resolver: zodResolver(contentSchema),
    defaultValues: {
      title: "",
      slug: "",
      author: "Shivam Kumar",
      mdxContent: "",
      categories: [],
    },
  });

  const editorRef = useRef<EditorComponentHandle>(null);
  const [selected, setSelected] = useState<{ value: string; label: string }[]>(
    [],
  );
  const [categories, setCategories] = useState(initialCategories);

  const generateSlug = () => {
    const slug = form.getValues().title.toLowerCase().replace(/ /g, "-");
    form.setValue("slug", slug);
  };

  function onSubmit(values: z.infer<typeof contentSchema>) {
    const selectedCategories: any[] = [];
    selected.map((item) => selectedCategories.push(item.value));
    values.categories = selectedCategories;
    values.mdxContent = editorRef.current?.getValue() as string;
    console.log(values);
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
                <Input placeholder="shadcn" {...field} />
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
                  <Input placeholder="shadcn" {...field} />
                  <Button onClick={generateSlug}>Generate</Button>
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
                <Input placeholder="shadcn" {...field} />
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
                <EditorComponent ref={editorRef} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
