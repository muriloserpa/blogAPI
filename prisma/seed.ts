import bcrypt from "bcryptjs";
import prisma from "../src/lib/prisma";
import { UserRole } from "@prisma/client";

const user = await prisma.user.upsert({
  where: { email: "admin@admin.com" },
  update: {},
  create: {
    email: "admin@admin.com",
    name: "Admin",
    password: await bcrypt.hash("admin", 10),
    role: UserRole.ADMIN,
  },
});

await prisma.post.createMany({
  data: [
    {
      title: "Post 1",
      content: "Content 1",
      authorId: user.id,
      status: "PUBLISHED",
    },
    {
      title: "Post 2",
      content: "Content 2",
      authorId: user.id,
      status: "PUBLISHED",
    },
    {
      title: "Post 3",
      content: "Content 3",
      authorId: user.id,
      status: "PUBLISHED",
    },
  ],
});
