import { Request, Response } from "express";
import { loginSchema, registerSchema } from "./authSchema";
import userService from "../user/userService";
import authService from "./authService";

class AuthController {
  async login(req: Request, res: Response) {
    const input = await loginSchema.validateAsync(req.body);
    const result = await authService.login(input);
    return res.status(200).json(result);
  }

  async register(req: Request, res: Response) {
    const input = await registerSchema.validateAsync(req.body);
    const user = await userService.create(input);
    return res.status(201).json(user);
  }
}

export default new AuthController();
