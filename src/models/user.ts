export type UserRole = "USER" | "ADMIN";

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
};

export type UserWithoutPassword = Omit<User, "password">;

export interface CreateUserData {
  name: string;
  email: string;
  password: string;
}
