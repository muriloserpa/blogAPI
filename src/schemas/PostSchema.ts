import { z } from "zod";

export const postSchema = z.object({
  id: z.string().uuid("User ID must be a valid UUID."),

  title: z
    .string()
    .min(3, "Title must have at least 3 characters")
    .max(50, "Title must have at most 50 characters"),

  content: z
    .string()
    .min(3, "Content must have at least 3 characters")
    .max(1000, "Content must have at most 1000 characters"),

  authorId: z.string().uuid("Author ID must be a valid UUID."),
});

export const createPostSchema = postSchema.omit({ id: true }).extend({
  authorId: postSchema.shape.authorId.optional(),
});

export const updatePostSchema = createPostSchema.partial();
