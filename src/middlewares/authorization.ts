import { NextFunction, Request, Response } from "express";

const editRecipesPermission = "edit:recipes";

/*
 * Middleware that verifies the jwt token and makes its payload available for
 * later middleware(s) at `resp.locals.user`.
 */
export const requireEditPermission = async (
  _: Request,
  resp: Response,
  next: NextFunction
) => {
  const user = resp.locals.user;

  if (!user?.permissions?.includes(editRecipesPermission)) {
    return resp
      .status(403)
      .send(`User does not have permission to edit recipes`);
  }

  return next();
};
