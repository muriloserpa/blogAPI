import type { User } from "../models/user";
import type IRepository from "./iRepository";

export default interface IUserRepository extends IRepository<User> {
  findByEmail(email: string): Promise<User | null>;
  update(id: string, data: Partial<User>): Promise<User>;
}
