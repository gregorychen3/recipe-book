import { auth } from "express-oauth2-jwt-bearer";

export const jwtCheck = auth({
  audience: "http://localhost:3000",
  issuerBaseURL: "https://dev-cuxf3af6zqwbel75.us.auth0.com/",
  tokenSigningAlg: "RS256",
});
