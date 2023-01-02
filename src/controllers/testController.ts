import express from "express";

export const testController = express.Router();

testController.get("/", (req, res, next) => res.send("Ok"));
