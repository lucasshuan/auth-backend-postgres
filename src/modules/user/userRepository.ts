import { prisma } from "../../database";
import { CreateUserArgs, CreateUserDTO, UpdateUserArgs } from "./userModel";

class UserRepository {
  private selectPublicUser = {
    id: true,
    email: true,
    createdAt: true,
  };

  private selectPrivateUser = {
    ...this.selectPublicUser,
    passwordHash: true,
  };

  async list() {
    return prisma.user.findMany({
      select: this.selectPublicUser,
    });
  }

  async findById(id: number) {
    return prisma.user.findUnique({
      where: { id },
      select: this.selectPublicUser,
    });
  }

  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
      select: this.selectPrivateUser,
    });
  }

  async create(data: CreateUserArgs) {
    return prisma.user.create({
      data,
      select: this.selectPublicUser,
    });
  }
  async update({ id, ...data }: UpdateUserArgs) {
    return prisma.user.update({
      where: {
        id,
      },
      data,
      select: this.selectPublicUser,
    });
  }

  async delete(id: number) {
    return prisma.user.delete({
      where: { id },
      select: this.selectPublicUser,
    });
  }
}

export default new UserRepository();
