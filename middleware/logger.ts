import { Request, Response, NextFunction } from "express";
const logger = (req: Request, _res: Response, _next: NextFunction) => {
  console.log(`Request Method: ${req.method}, API: ${req.url}`);
};

export default logger;
