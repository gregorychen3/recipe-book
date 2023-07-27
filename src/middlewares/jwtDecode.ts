import { NextFunction, Request, Response } from "express";
import jwt_decode from "jwt-decode";

/*
 * Middleware that verifies the jwt token and makes its payload available for
 * later middleware(s) at `resp.locals.user`.
 */
export const jwtDecode = async (
  req: Request,
  resp: Response,
  next: NextFunction
) => {
  const bearer = req.headers["authorization"];
  if (!bearer) {
    return resp.status(401).send("bearer token not present in request");
  }

  if (!bearer.startsWith("Bearer ")) {
    return resp.status(400).send("Malformed bearer token header value");
  }

  const jwt = bearer.replace("Bearer ", "");

  try {
    resp.locals.user = jwt_decode(jwt);
  } catch (e) {
    console.error(`Failed decoding jwt: ${e.message}`);
    return resp.status(401).send(`Malformed jwt token`);
  }

  return next();
};
