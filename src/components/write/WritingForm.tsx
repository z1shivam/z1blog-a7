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
import {
  contentSchema,
  featuredImageFormSchema,
} from "@/schemas/contentSchema";
import { createCategoryIfNotExist } from "@/server/actions/createCategories";
import { savePost } from "@/server/actions/savepost";
import { zodResolver } from "@hookform/resolvers/zod";
import { micromark } from "micromark";
import { RefObject, useRef, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaRegImage } from "react-icons/fa";
import { MultiSelect } from "react-multi-select-component";
import { z } from "zod";
import EditorComponent from "./EditorComponent";

interface WriteFormProps {
  initialCategories: { label: string; value: string }[];
  initialContent?: string;
}

interface EditorComponentHandle {
  getValue: () => string;
  setValue: (value: string) => void;
}

const ImagePlaceHolder: React.FC = () => (
  <div className="flex h-full w-full items-center justify-center rounded-md border-2 border-gray-300 bg-gray-200">
    <FaRegImage className="size-12 text-gray-500" />
  </div>
);

interface FeaturedImageFormProps {
  fileInputRef: RefObject<HTMLInputElement>;
  featuredImage: string;
  isPending: boolean;
  clearFeaturedImage: () => void;
}

const FeaturedImageForm: React.FC<FeaturedImageFormProps> = ({
  fileInputRef,
  featuredImage,
  isPending,
  clearFeaturedImage,
}) => {
  const featuredImageForm = useForm<z.infer<typeof featuredImageFormSchema>>({
    resolver: zodResolver(featuredImageFormSchema),
    defaultValues: {
      featuredImageUrl: featuredImage || "",
    },
  });

  return (
    <Form {...featuredImageForm}>
      <form className="flex w-full justify-between gap-4 pb-4">
        <div className="aspect-video w-1/2 rounded-md">
          {featuredImage ? <img src="#" /> : <ImagePlaceHolder />}
        </div>
        <div className="w-1/2 space-y-3">
          <FormField
            control={featuredImageForm.control}
            name="featuredImageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Featured Image</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter the URL of the image.."
                    {...field}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-1.5 file:px-3 file:rounded-md file:border-2 file:text-sm file:font-semibold file:bg-gray-50 file:text-gray-700 hover:file:bg-indigo-100 file:border-gray-300"
          />
          <div className="flex justify-between gap-4">
            <Button className="flex-grow" type="submit">Upload</Button>
            <Button
              variant={"destructive"}
              className="flex-grow"
              type="button"
              onClick={clearFeaturedImage}
            >
              Remove
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export const WriteForm: React.FC<WriteFormProps> = ({
  initialCategories,
  initialContent,
}) => {
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

  const [featuredImage, setfeaturedImage] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editorRef = useRef<EditorComponentHandle>(null);
  const [selected, setSelected] = useState<
    { value: string; label: string; __isNew__?: boolean }[]
  >([]);
  const [categories, setCategories] = useState(initialCategories);
  const [isPending, startTransition] = useTransition();

  const generateSlug = () => {
    const slug = form.getValues().title.toLowerCase().replace(/ /g, "-");
    form.setValue("slug", slug);
  };

  const removeLineBreaks = (input: string) => input.replace(/\n/g, "");

  const clearFeaturedImage = () => {
    setfeaturedImage("");
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Clear the input value
    }
  };

  const onSubmit = (values: z.infer<typeof contentSchema>) => {
    startTransition(async () => {
      const correctCategoryArray = await createCategoryIfNotExist(selected);
      const selectedCategories: string[] = correctCategoryArray.map(
        (item) => item.value
      );

      const post = {
        title: values.title,
        slug: values.slug,
        categories: selectedCategories,
        author: values.author,
        mdxContent: editorRef.current?.getValue() as string,
        htmlContent: removeLineBreaks(
          micromark(editorRef.current?.getValue() as string)
        ),
        featuredImage: values.featuredImage as string,
      };

      savePost(post).then(() => {
        form.reset();
      });
    });
  };

  return (
    <>
      <FeaturedImageForm
        fileInputRef={fileInputRef}
        featuredImage={featuredImage}
        isPending={isPending}
        clearFeaturedImage={clearFeaturedImage}
      />
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
                    <Input
                      placeholder="shadcn"
                      {...field}
                      disabled={isPending}
                    />
                    <Button
                      type="button"
                      onClick={generateSlug}
                      disabled={isPending}
                    >
                      Generate
                    </Button>
                  </div>
                </FormControl>
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
    </>
  );
};
