import type z from "zod";
import type { createPostSchema, updatePostSchema } from "../schemas/PostSchema";

export type PostStatus = "DRAFT" | "PUBLISHED";

export type Post = {
  id: string;
  title: string;
  content: string;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
  status: PostStatus;
};

export type createPostData = z.infer<typeof createPostSchema>;

export type updatePostData = z.infer<typeof updatePostSchema>;
