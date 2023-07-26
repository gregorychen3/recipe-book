import express from "express";
import path from "path";

export const uiRouter = express.Router();

uiRouter.use(express.static(path.join(__dirname, "../../ui/dist")));
