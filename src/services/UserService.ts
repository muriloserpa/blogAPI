import { hash } from "bcryptjs";
import ApiError from "../errors/api-error";
import type IUserRepository from "../interfaces/iUserRepository";
import type {
  CreateUserData,
  Credentials,
  User,
  UserRole,
  UserWithoutPassword,
} from "../models/user";
import { comparePassword, generateToken } from "../utils/jwt";
import type { Post } from "../models/post";

export class UserService {
  protected readonly repository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.repository = userRepository;
  }

  async create(
    { name, email, password }: CreateUserData,
    role: UserRole = "USER"
  ): Promise<UserWithoutPassword> {
    const userWithSameEmail = await this.repository.findByEmail(email);
    if (userWithSameEmail) throw new ApiError(400, "User already exists.");
    const created = await this.repository.create({
      name,
      email,
      password: await hash(password, 10),
      role,
    });

    return {
      id: created.id,
      name: created.name,
      email: created.email,
    };
  }
  async read(): Promise<UserWithoutPassword[]> {
    const users = await this.repository.read();
    const usersWithoutPassword = users.map(
      ({ password, role, ...rest }) => rest
    );
    return usersWithoutPassword;
  }
  async readOne(id: string): Promise<UserWithoutPassword> {
    const user = await this.repository.readOne(id);
    if (!user) throw new ApiError(404, "User not found.");
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
  async update(id: string, userData: Partial<User>) {
    const user = await this.repository.readOne(id);
    if (!user) throw new ApiError(404, "User not found.");

    if (userData.email && userData.email !== user.email) {
      const userWithSameEmail = await this.repository.findByEmail(
        userData.email
      );
      if (userWithSameEmail) throw new ApiError(400, "User already exists.");
    }

    if (userData.password) {
      userData.password = await hash(userData.password, 10);
    }

    const updated = await this.repository.update(id, userData);
    const { password, role, ...userWithoutPassword } = updated;
    return userWithoutPassword;
  }
  async delete(id: string) {
    const deleted = await this.repository.delete(id);
    const { password, role, ...userWithoutPassword } = deleted;
    return userWithoutPassword;
  }

  async autenticate(credentials: Credentials): Promise<string> {
    const user = await this.repository.findByEmail(credentials.email);
    if (!user || !comparePassword(credentials.password, user.password))
      throw new ApiError(401, "Invalid credentials.");
    return generateToken(user);
  }

  async userPosts(userId: string): Promise<Post[]> {
    const user = await this.repository.readOne(userId);
    if (!user) throw new ApiError(404, "User not found.");
    return this.repository.userPosts(userId);
  }
}
