import { Request, Response } from "express";
export const validationError = (
  _req: Request,
  res: Response,
  status: number,
  message: string
) => {
  return res.status(status).json({
    message,
  });
};
