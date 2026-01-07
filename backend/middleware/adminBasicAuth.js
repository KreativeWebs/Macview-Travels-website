import basicAuth from "express-basic-auth";

// In development we don't want the browser to show the HTTP Basic auth popup.
// Only enable the challenge in production when ADMIN_GATE_PASSWORD is set.
const enableBasicAuth = process.env.NODE_ENV === "production" && !!process.env.ADMIN_GATE_PASSWORD;

export const adminBasicAuth = enableBasicAuth
  ? basicAuth({
      users: {
        admin: process.env.ADMIN_GATE_PASSWORD,
      },
      challenge: true,
      unauthorizedResponse: "Unauthorized",
    })
  : (req, res, next) => next();
