import basicAuth from "express-basic-auth";

export const adminBasicAuth = basicAuth({
  users: {
    admin: process.env.ADMIN_GATE_PASSWORD,
  },
  challenge: true,
  unauthorizedResponse: "Unauthorized",
});
