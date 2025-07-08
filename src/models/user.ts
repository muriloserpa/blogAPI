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

export interface CreateUserData {
  name: string;
  email: string;
  password: string;
}
