import { Request, Response, NextFunction, Router } from "express";
import UserController from "../controllers/Users.controller.ts";
import UserService from "../service/Users.service.ts";
const userRouter = Router();

const userService = new UserService();
const userController = new UserController(userService);

userRouter.get("/", (req: Request, res: Response, next: NextFunction) => {
  try {
    return userController.getUsers(req, res);
  } catch (err: unknown) {
    next(err);
  }
});

userRouter.get("/:id", (req: Request, res: Response, next: NextFunction) => {
  try {
    return userController.getuser(req, res);
  } catch (err: unknown) {
    next(err);
  }
});

userRouter.post("/", (req: Request, res: Response, next: NextFunction) => {
  try {
    return userController.addUser(req, res);
  } catch (err: unknown) {
    next(err);
  }
});

userRouter.delete("/:id", (req: Request, res: Response, next: NextFunction) => {
  try {
    return userController.deleteUser(req, res);
  } catch (err: unknown) {
    next(err);
  }
});

userRouter.put("/:id", (req: Request, res: Response, next: NextFunction) => {
  try {
    return userController.updateUser(req, res);
  } catch (err: unknown) {
    next(err);
  }
});

export default userRouter;
