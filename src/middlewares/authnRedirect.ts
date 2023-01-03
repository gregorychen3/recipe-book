import { NextFunction, Request, Response } from "express";

export const authnRedirect = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user) {
    return next();
  }

  return res.redirect("/authn/login/federated/google");
};
