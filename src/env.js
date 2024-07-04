import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";
export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "test", "production"]),
    MONGO_URL: z.string(),
    MONGO_DB: z.string(),
    CLOUDINARY_API_SECRET: z.string(),
  },
  client: {
    NEXT_PUBLIC_CLOUDINARY_API_KEY: z.string(),
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: z.string(),
  },
  runtimeEnv: {
    MONGO_URL: process.env.MONGO_URL,
    MONGO_DB: process.env.MONGO_DB,
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_CLOUDINARY_API_KEY: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME:
      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
});
