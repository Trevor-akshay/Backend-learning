import { Request, Response, NextFunction } from "express";
const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
