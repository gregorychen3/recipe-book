import express from "express";
import passport from "passport";
import GoogleStrategy from "passport-google-oidc";
import db from "./authDb";

export const authRouter = express.Router();

//authRouter.get("/login", function (req, res, next) {
//  res.render("login");
//});

authRouter.get("/login/federated/google", passport.authenticate("google"));
