const domain = "dev-cuxf3af6zqwbel75.us.auth0.com";
const clientId = "yXN9cXHPym1LpOkyrItZ2hl7gPD84EF7";
const audience = "http://localhost:3000";
const scope =
  "openid profile email read:current_user update:current_user_metadata";

export const auth0Config = { domain, clientId, audience, scope };
