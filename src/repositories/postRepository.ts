import { PrismaClient } from "@prisma/client";
import type { Post } from "@prisma/client";
import type IPostRepository from "../interfaces/iPostRepository";
import type { User } from "../models/user";

const prisma = new PrismaClient();
export class PostRepository implements IPostRepository {
  async read() {
    const posts = await prisma.post.findMany();
    return posts;
  }

  async create(data: Omit<Post, "id">) {
    const newPost = await prisma.post.create({
      data,
    });
    return newPost;
  }

  async readOne(id: string) {
    return prisma.post.findUnique({ where: { id } });
  }
  async update(id: string, data: Partial<Post>) {
    return prisma.post.update({
      where: { id },
      data,
    });
  }
  async delete(id: string) {
    return prisma.post.delete({ where: { id } });
  }

  async publish(id: string): Promise<Post> {
    return prisma.post.update({
      where: { id },
      data: { status: "PUBLISHED" },
    });
  }

  async getAuthor(post: Post): Promise<User | null> {
    const author = await prisma.user.findUnique({
      where: { id: post.authorId },
    });
    return author;
  }
}
