import { NextFunction, Request, Response } from "express";
import { HttpException } from "../errors";

const ADMINS: Set<string> = new Set(
  process.env.ADMINS ? JSON.parse(process.env.ADMINS) : []
);

export const authz = async (req: Request, _: Response, next: NextFunction) => {
  if (!req.user) {
    return next(new HttpException(401, `Unauthorized: not logged in`));
  }

  if (ADMINS.has((req.user as any).name)) {
    return next();
  }

  return next(new HttpException(401, `Unauthorized: not admin user`));
};
