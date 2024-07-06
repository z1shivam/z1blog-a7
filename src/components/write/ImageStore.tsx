"use client";

import { uploadImage } from "@/server/actions/imageUpload";
import { loadMoreImages } from "@/server/actions/loadMoreImages";
import { FormEvent, useEffect, useState, useTransition } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaRegCopy } from "react-icons/fa";
import { ErrorToast } from "../global/ErrorToast";
import { SuccessToast } from "../global/SuccessToast";
import { Button } from "../ui/button";

type ImageData = {
  url: string;
  width?: number;
  height?: number;
  size?: number;
};

type ImageStoreProps = {
  imageCount: number;
  imageData: ImageData[];
  rateLimitRemaining: number;
  nextCursorId: string;
};

const ImageStore: React.FC<ImageStoreProps> = ({
  imageCount,
  imageData,
  rateLimitRemaining,
  nextCursorId,
}) => {
  const [numberOfImages, setNumberOfImages] = useState<number>(imageCount);
  const [nextCursor, setNextCursor] = useState<string>(nextCursorId);
  const [isPending, startTransition] = useTransition();
  const [isLoading, startLoading] = useTransition();
  const [imageArray, setImageArray] = useState<ImageData[]>(imageData);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (rateLimitRemaining === 1) {
      setError("API rate limit reached. Wait for next hour");
    }
  }, [rateLimitRemaining]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setError("");
    setSuccess("");
    startTransition(() => {
      uploadImage(formData).then((data) => {
        if (data?.success) {
          const newImage: ImageData = {
            url: data.url,
            width: data.width,
            height: data.height,
            size: data.size,
          };
          setImageArray((prevArray) => [newImage, ...prevArray]);
          setNumberOfImages((p) => p + 1);
          setSuccess(data.success);
        }
        data?.error && setError(data.error);
      });
    });
  };

  const handleLoadmore = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    startLoading(async () => {
      const { newImages, nextCursorId } = await loadMoreImages(nextCursor);
      setImageArray((prevArray) => [...prevArray, ...newImages]);
      setNextCursor(nextCursorId);
    });
  };

  const handleImageClick = (url: string) => {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        setSuccess("Image URL Copied");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <>
      <div className="flex items-end justify-between px-4 pt-4">
        <h2 className="text-3xl font-bold">Image Store</h2>
        {numberOfImages && <span>{numberOfImages} items</span>}
      </div>
      <form className="p-4" onSubmit={handleSubmit}>
        <div className="flex items-center justify-between rounded-md border border-gray-300 bg-gray-50 p-2">
          <input
            type="file"
            name="imageToUpload"
            accept="image/*"
            className="block w-full text-sm text-gray-500 file:mr-4 file:rounded-md file:border-2 file:border-gray-300 file:bg-white file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-gray-700 hover:file:bg-gray-100"
          />
          <div className="flex gap-2">
            <Button className="" type="submit">
              {isPending && (
                <AiOutlineLoading3Quarters className="mx-3 h-4 w-4 animate-spin" />
              )}
              Upload
            </Button>
            {/* <Button variant={"default"} size={"icon"}>
              <MdOutlineRefresh className="size-5" />
            </Button> */}
          </div>
        </div>
      </form>
      <div className="px-4 pb-4">
        <ErrorToast message={error} />
        <SuccessToast message={success} />
      </div>
      <div className="grid grid-cols-2 gap-3 px-4 pb-4">
        {imageArray.map((image) => (
          <div className="group relative cursor-pointer" key={image.url}>
            <img
              src={image.url}
              width={image.width}
              height={image.height}
              className="aspect-video cursor-pointer rounded-md border border-gray-300 object-cover"
            />
            <div
              className="absolute top-0 flex h-full w-full items-center justify-center rounded-md bg-black/50 text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100"
              onClick={() => handleImageClick(image.url)}
            >
              <FaRegCopy className="mr-2 size-5" /> Copy URL
            </div>
          </div>
        ))}
      </div>
      <form
        className="flex w-full items-center justify-center"
        onSubmit={handleLoadmore}
      >
        {nextCursor ? (
          <Button type="submit">
            {isLoading && (
              <AiOutlineLoading3Quarters className="mx-3 h-4 w-4 animate-spin" />
            )}
            Load More
          </Button>
        ) : (
          <p>No more images in store</p>
        )}
      </form>
    </>
  );
};

export default ImageStore;
