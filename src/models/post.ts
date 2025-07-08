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

export type createPostData = Omit<Post, "id" | "createdAt" | "updatedAt">;
