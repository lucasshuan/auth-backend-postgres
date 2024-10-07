import { Role, User } from "@prisma/client";

export interface CreateUserDTO {
  email: string;
  password: string;
  role: Role;
}

export interface UpdateUserDTO extends Partial<CreateUserDTO> {
  id: number;
}

export type CreateUserArgs = Pick<User, "email" | "role" | "passwordHash">;

export type UpdateUserArgs = {
  id: number;
  passwordHash?: string;
  email?: string;
  role?: Role;
};
