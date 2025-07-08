import { PrismaClient } from "@prisma/client";
import type { User } from "@prisma/client";
import type IUserRepository from "../interfaces/iUserRepository";
import type { Post } from "../models/post";
import ApiError from "../errors/api-error";

const prisma = new PrismaClient();
export class UserRepository implements IUserRepository {
  async create(data: Omit<User, "id">) {
    const newUser = await prisma.user.create({
      data,
    });
    return newUser;
  }
  async read() {
    const users = await prisma.user.findMany();
    return users;
  }
  async readOne(id: string) {
    return prisma.user.findUnique({ where: { id } });
  }
  async update(id: string, data: Partial<User>) {
    return prisma.user.update({
      where: { id },
      data,
    });
  }
  async delete(id: string) {
    return prisma.user.delete({ where: { id } });
  }

  async findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  }

  async userPosts(userId: string): Promise<Post[]> {
    return prisma.post.findMany({ where: { authorId: userId } });
  }
}
