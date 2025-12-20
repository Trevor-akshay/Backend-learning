import { Request, Response, NextFunction, Router } from "express";
import UserController from "../controllers/Users.controller.ts";
import UserService from "../service/Users.service.ts";
const userRouter = Router();

const userService = new UserService();
const userController = new UserController(userService);

userRouter.get("/", userController.getUsers);
userRouter.get("/:id", userController.getuser);
userRouter.post("/", userController.addUser);
userRouter.delete("/:id", userController.deleteUser);
userRouter.put("/:id", userController.updateUser);

export default userRouter;
