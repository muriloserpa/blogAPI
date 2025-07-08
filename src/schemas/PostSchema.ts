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

  status: z
    .enum(["DRAFT", "PUBLISHED"])
    .refine((val) => ["draft", "published"].includes(val), {
      message: "Status must be draft ou published",
    }),
});

export const createPostSchema = postSchema.omit({ id: true }).extend({
  status: postSchema.shape.status.optional().default("DRAFT"),
});

export const updatePostSchema = createPostSchema.partial();
