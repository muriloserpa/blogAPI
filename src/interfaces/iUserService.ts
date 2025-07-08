import type { User } from "../models/user";
import Service from "./iServices";
import type IUserRepository from "./iUserRepository";

export default abstract class IUserService extends Service<User> {
  protected repository: IUserRepository<User>;
  constructor(repository: IUserRepository<User>) {
    super(repository);
  }
}
