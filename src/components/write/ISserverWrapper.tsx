import cloudinary from "@/cloudinary";
import ImageStore from "./ImageStore";

export default async function ImageStoreServerWrapper() {
  let imageCount = 0;
  let imageData:any[] = [];
  let rateLimitRemaining = 0;
  let nextCursorId = "";

  try {
    const res = await cloudinary.search
      .expression()
      .max_results(4)
      .sort_by('created_at', 'desc')
      .execute();

      // console.log(res);
    imageCount = res.total_count;
    rateLimitRemaining = res.rate_limit_remaining;
    nextCursorId = res.next_cursor;

    imageData = res.resources.map((image:any) => ({
      url: image.secure_url,
      width: image.width,
      height: image.height,
      size: image.bytes,
    }));

    console.log({ imageCount, imageData, rateLimitRemaining, nextCursorId });
  } catch (error) {
    console.error('Error fetching images:', error);
  }

  return (
    <>
      <ImageStore 
        imageCount={imageCount} 
        imageData={imageData} 
        rateLimitRemaining={rateLimitRemaining} 
        nextCursorId={nextCursorId}
      />
    </>
  );
}
