import express from "express";
import path from "path";
import { authnRedirect } from "../middlewares/authnRedirect";

export const uiRouter = express.Router();

uiRouter.use(authnRedirect);
uiRouter.use(express.static(path.join(__dirname, "../../ui/build")));
