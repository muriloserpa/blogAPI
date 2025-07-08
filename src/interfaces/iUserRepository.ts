import type { CreateUserData } from "../models/user";
import type IRepository from "./iRepository";

export default interface IUserRepository<T> extends IRepository<T> {
  findByEmail(email: string): Promise<T | null>;
  update(id: string, data: Partial<T>): Promise<T>;
}
