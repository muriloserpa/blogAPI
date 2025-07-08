import type z from "zod";
import type { createUserSchema, updateUserSchema } from "../schemas/UserSchema";

export type UserRole = "USER" | "ADMIN";

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
};

export type UserWithoutPassword = {
  id: string;
  name: string;
  email: string;
  role?: UserRole;
};

export type createUserData = z.infer<typeof createUserSchema>;
export type updateUserData = z.infer<typeof updateUserSchema>;

export interface Credentials {
  email: string;
  password: string;
}
