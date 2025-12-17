import { Request, Response, NextFunction, Router } from "express";
import { validationError } from "../utils/utils.ts";
const userRouter = Router();

const users: any[] = [];

userRouter.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    data: users,
  });
});

userRouter.get("/:id", (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;

    const user = users.find((u) => u.id === id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      data: user,
    });
  } catch (err: unknown) {
    next(err);
  }
});

userRouter.post("/", (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password } = req.body;

    if (!name) validationError(400, "User name is required", req, res);
    if (!email) validationError(400, "User email is required", req, res);
    if (!password) validationError(400, "User password is required", req, res);

    const user = {
      id: users.length + 1,
      name,
      email,
      password,
    };

    users.push(user);

    res.status(201).json({ message: "User added" });
  } catch (err: unknown) {
    next(err);
  }
});
export default userRouter;
