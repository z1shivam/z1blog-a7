"use server";

import cloudinary from "@/cloudinary";

export async function uploadImage(formdata: FormData): Promise<{
  url: string;
  success: string;
  error: string;
  width?: number;
  height?: number;
  size?: number;
}> {
  const file = formdata.get("imageToUpload") as File;
  if (!file) {
    return { url: "", success: "", error: "No file provided" };
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);

  try {
    const result = await new Promise<{
      url: string;
      success: string;
      error: string;
      width?: number;
      height?: number;
      size?: number;
    }>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({}, (err, res) => {
          // console.log(res);
          if (err || !res) {
            reject({ url: "", success: "", error: "Upload failed, try again" });
          } else {
            resolve({
              url: res.url,
              success: "Image uploaded successfully",
              error: "",
              width: res.width,
              height: res.height,
              size: res.bytes,
            });
          }
        })
        .end(buffer);
    });

    return result;
  } catch (error: any) {
    return {
      url: "",
      success: "",
      error: error.error || "An unexpected error occurred",
    };
  }
}
