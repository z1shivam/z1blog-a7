"use server";

import cloudinary from "@/cloudinary";

export  async function loadMoreImages(nextCursor: string) {
  const images = await cloudinary.search
    .expression()
    .max_results(20)
    .next_cursor(nextCursor)
    .execute();

  const newImages = images.resources.map((image: any) => ({
    url: image.secure_url,
    width: image.width,
    height: image.height,
    size: image.bytes,
  }));

  const nextCursorId = images.next_cursor;
  return { newImages, nextCursorId };
}
