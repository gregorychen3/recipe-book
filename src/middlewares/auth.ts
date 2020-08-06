import { NextFunction, Request, Response } from "express";

export const auth = function (req: Request, res: Response, next: NextFunction) {
  console.log("LOGGED");
  next();
};
