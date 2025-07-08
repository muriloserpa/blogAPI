import { hash } from "bcryptjs";
import ApiError from "../errors/api-error";
import type IUserRepository from "../interfaces/iUserRepository";
import type {
  CreateUserData,
  User,
  UserRole,
  UserWithoutPassword,
} from "../models/user";

export class UserService {
  protected readonly repository: IUserRepository<User>;

  constructor(userRepository: IUserRepository<User>) {
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
      role: created.role,
    };
  }
  async read(): Promise<UserWithoutPassword[]> {
    const users = await this.repository.read();
    const usersWithoutPassword = users.map(({ password, ...rest }) => rest);
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
    const { password, ...userWithoutPassword } = updated;
    return userWithoutPassword;
  }
  async delete(id: string) {
    const deleted = await this.repository.delete(id);
    const { password, ...userWithoutPassword } = deleted;
    return userWithoutPassword;
  }
}
