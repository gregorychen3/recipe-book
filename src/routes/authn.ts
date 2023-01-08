import express from "express";
import passport from "passport";
import { authnDb } from "./authnDb";
const GoogleStrategy = require("passport-google-oidc");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env["GOOGLE_CLIENT_ID"],
      clientSecret: process.env["GOOGLE_CLIENT_SECRET"],
      callbackURL: process.env["GOOGLE_CALLBACK_URL"],
      scope: ["profile", "email"],
    },
    function verify(issuer: any, profile: any, cb: any) {
      authnDb.get(
        "SELECT * FROM users WHERE id = ?",
        [profile.id],
        function (err, row) {
          if (err) {
            return cb(err);
          }

          if (!row) {
            authnDb.run(
              "INSERT INTO users (id, name) VALUES (?, ?)",
              [profile.id, profile.displayName],
              function (err) {
                if (err) {
                  return cb(err);
                }

                var id = this.lastID;
                var user = {
                  id: id,
                  name: profile.displayName,
                };
                return cb(null, user);
              }
            );
            return;
          }

          return cb(null, row);
        }
      );
    }
  )
);

export const authnRouter = express.Router();

authnRouter.get("/login/federated/google", passport.authenticate("google"));

authnRouter.get(
  "/oauth2/redirect/google",
  passport.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

passport.serializeUser(function (user: any, cb) {
  process.nextTick(function () {
    cb(null, { id: user.id, username: user.username, name: user.name });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});
