import cloudinary from "@/cloudinary";
import ImageStore from "./ImageStore";

export default async function ImageStoreServerWrapper() {
  let imageCount = 0;
  let imageData:any[] = [];
  let rateLimitRemaining = 0;

  try {
    const res = await cloudinary.search
      .expression()
      .max_results(20)
      .sort_by('created_at', 'desc')
      .execute();

    imageCount = res.total_count;
    rateLimitRemaining = res.rate_limit_remaining;

    imageData = res.resources.map((image:any) => ({
      url: image.secure_url,
      width: image.width,
      height: image.height,
      size: image.bytes
    }));

    // console.log({ imageCount, imageData, rateLimitRemaining });
  } catch (error) {
    console.error('Error fetching images:', error);
  }

  return (
    <>
      <ImageStore 
        imageCount={imageCount} 
        imageData={imageData} 
        rateLimitRemaining={rateLimitRemaining} 
      />
    </>
  );
}
