import { Router } from "express";
import authRouter from "./modules/auth/authRouter";
import userRouter from "./modules/user/userRouter";
import authMiddleware from "./middlewares/auth";

const routes = Router();

routes.use("/auth", authRouter);
routes.use("/users", authMiddleware, userRouter);

export default routes;
