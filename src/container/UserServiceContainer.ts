import { UserRepository } from "../repositories/userRepository";
import { UserService } from "../services/UserService";

const usersRepository = new UserRepository();
const usersService = new UserService(usersRepository);

export { usersService };
