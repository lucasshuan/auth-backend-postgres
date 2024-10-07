import { Router } from "express";
import { Route } from "../../utils/route";
import userController from "./userController";

const userRouter = Router();

userRouter.get("/me", Route(userController.me));
userRouter.get("/", Route(userController.list));
userRouter.get("/:id", Route(userController.findById));
userRouter.post("/", Route(userController.create));
userRouter.put("/:id", Route(userController.update));
userRouter.delete("/:id", Route(userController.delete));

export default userRouter;
