import { CustomError } from "../../utils/error";
import { CreateUserDTO, UpdateUserDTO } from "./userModel";
import userRepository from "./userRepository";
import bcrypt from "bcrypt";

class UserService {
  async list() {
    const users = await userRepository.list();
    return users;
  }

  async findById(id: number) {
    const user = await userRepository.findById(id);
    if (!user) throw new CustomError(404, "Usuário não encontrado");
    return user;
  }

  async findByEmail(email: string) {
    const user = await userRepository.findByEmail(email);
    if (!user) throw new CustomError(404, "Usuário não encontrado");
    return user;
  }

  async create({ password, ...input }: CreateUserDTO) {
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await userRepository.create({ passwordHash, ...input });
    return user;
  }

  async update({ password, ...input }: UpdateUserDTO) {
    let passwordHash;
    if (password) {
      passwordHash = await bcrypt.hash(password, 10);
    }
    const user = await userRepository.update({ passwordHash, ...input });
    return user;
  }

  async delete(id: number) {
    const user = await userRepository.delete(id);
    return user;
  }
}

export default new UserService();
