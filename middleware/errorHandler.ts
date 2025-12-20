import { Request, Response, NextFunction } from "express";
import { PrismaError } from "../utils/utils.ts";
const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof PrismaError) {
    return res.status(err.status).json({
      message: err.message,
    });
  }

  if (err instanceof Error) {
    return res.status(400).json({
      message: err.message,
    });
  }
  res.status(500).json({
    message: "Internal server error",
  });
};

export default errorHandler;
