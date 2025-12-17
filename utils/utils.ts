import { Request, Response } from "express";
export const validationError = (
  status: number,
  message: string,
  _req: Request,
  res: Response
) => {
  return res.status(status).json({
    message,
  });
};
