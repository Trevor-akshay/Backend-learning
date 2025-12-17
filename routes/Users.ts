import { Request, Response, NextFunction, Router } from "express";

const userRouter = Router();

const users : any[] = []

userRouter.get("/", (req: Request, res: Response, next: NextFunction) => {
	res.status(200).json({
		data : users
	})
});


export default userRouter;
