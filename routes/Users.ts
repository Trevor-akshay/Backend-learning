import { Request, Response, NextFunction, Router } from "express";

const userRouter = Router();

const users : any[] = []

userRouter.get("/", (req: Request, res: Response, next: NextFunction) => {
	res.status(200).json({
		data : users
	})
});

userRouter.get("/:id", (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  const user = users.find((u) => u.id === id);

  if(!user) {
	return res.status(404).json({
		message: "User not found"
	})
  };

  res.status(200).json({
    data: user,
  });
});

export default userRouter;
