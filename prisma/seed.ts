import bcrypt from "bcryptjs";
import prisma from "../src/lib/prisma";
import { UserRole } from "@prisma/client";

await prisma.user.upsert({
  where: { email: "admin@admin.com" },
  update: {},
  create: {
    email: "admin@admin.com",
    name: "Admin",
    password: await bcrypt.hash("admin", 10),
    role: UserRole.ADMIN,
  },
});
