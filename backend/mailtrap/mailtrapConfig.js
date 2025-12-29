import { MailtrapClient } from "mailtrap";

export const mailtrapClient = new MailtrapClient({
  token: process.env.MAILTRAP_API_TOKEN,
});

export const sender = {
  email: "hello@macviewtravel.com",
  name: "Macview Travels",
};