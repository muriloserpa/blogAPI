export type PostStatus = "draft" | "published";

export type Post = {
  id: string;
  title: string;
  content: string;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
  status: PostStatus;
};
