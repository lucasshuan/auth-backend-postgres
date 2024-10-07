import { Request, RequestHandler, Response } from "express";
import { CustomError } from "./error";
import Joi from "joi";

type RouterHandler = (req: Request, res: Response) => Promise<any>;

export function Route(handler: RouterHandler): RequestHandler {
  return async (req: Request, res: Response) => {
    try {
      await handler(req, res);
    } catch (err: any) {
      console.log(err);
      if (err instanceof CustomError) {
        console.log(err);
        res.status(err.status).json({ message: err.message });
        return;
      } else if (err instanceof Joi.ValidationError) {
        res.status(400).json({ message: err.message });
        return;
      }
      res.status(500).json(err);
    }
  };
}
