import axios from "axios";
import { NextFunction, Request, Response } from "express";
import HttpException from "../errors";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const tokenId = req.header("Authorization");
  if (!tokenId) {
    return next(new HttpException(401, "Unauthorized: no tokenId found"));
  }

  try {
    const resp = await axios.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${tokenId}`);
    const decoded = resp.data;
    console.log(decoded);
    next();
  } catch (e) {
    return next(new HttpException(401, `Unauthorized: decoding tokenId: ${e.message}`));
  }
};
