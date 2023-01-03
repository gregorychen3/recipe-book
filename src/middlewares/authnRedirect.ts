import { NextFunction, Request, Response } from "express";

export const authnRedirect = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user) {
    return next();
  }
  console.log(2);
  return res.redirect("/login/federated/google");
};
