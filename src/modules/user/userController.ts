import { Request, Response } from "express";
import userService from "./userService";
import { idJoi } from "../../utils/joi";
import { createUserSchema, updateUserSchema } from "./userSchema";

class UserController {
  async me(req: Request, res: Response) {
    const user = await userService.findById(req.user.id);
    return res.status(200).json(user);
  }

  async list(_req: Request, res: Response) {
    const users = await userService.list();
    return res.status(200).json(users);
  }

  async findById(req: Request, res: Response) {
    const id = await idJoi.validateAsync(req.params.id);
    const user = await userService.findById(id);
    return res.status(200).json(user);
  }

  async create(req: Request, res: Response) {
    const input = await createUserSchema.validateAsync(req.body);
    const user = await userService.create(input);
    return res.status(200).json(user);
  }

  async update(req: Request, res: Response) {
    const id = await idJoi.validateAsync(req.params.id);
    const input = await updateUserSchema.validateAsync(req.body);
    const user = await userService.update({ id, ...input });
    return res.status(200).json(user);
  }

  async delete(req: Request, res: Response) {
    const id = await idJoi.validateAsync(req.params.id);
    const user = await userService.delete(id);
    return res.status(200).json(user);
  }
}

export default new UserController();
