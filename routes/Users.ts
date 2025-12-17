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
    const id = Number(req.params.id);
    if (Number.isNaN(id))
      return validationError(400, "User id must be a number", req, res);

    const user = users.find((u) => u.id === id);
    if (!user) return validationError(404, "User not found", req, res);

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

    if (!name) return validationError(400, "User name is required", req, res);
    if (!email) return validationError(400, "User email is required", req, res);
    if (!password)
      return validationError(400, "User password is required", req, res);

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
