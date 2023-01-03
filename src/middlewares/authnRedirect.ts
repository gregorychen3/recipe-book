import { NextFunction, Request, Response } from "express";

export const authnRedirect = (
  req: Request,
  res: Response,
  next: NextFunction
) => (req.user ? next() : res.redirect("/login/federated/google"));
