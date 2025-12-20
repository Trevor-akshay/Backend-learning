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

export class PrismaError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = "PrismaError";
    this.status = status;
  }
}
