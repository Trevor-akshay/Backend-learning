import { Request, Response, NextFunction } from "express";
const logger = (req: Request, _res: Response, next: NextFunction) => {
  console.log(`Request Method: ${req.method}, API: ${req.url}`);
  next();
};

export default logger;
