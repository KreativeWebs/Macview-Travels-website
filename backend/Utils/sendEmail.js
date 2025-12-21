import { mailtrapClient, sender } from "../mailtrap/mailtrapConfig.js";

export const sendPasswordResetEmail = async (email, resetURL) => {
  const recipients = [{ email }];

  try {
    await mailtrapClient.send({
      from: sender,
      to: recipients,
      template_uuid: "dbc13ce9-458f-495c-9475-ff19a9195277",
      template_variables: {
        reset_url: resetURL,
        company_name: "Macview Travels",
        support_whatsapp: "https://wa.me/2348169056956",
        expiry_time: "1 hour",
      },
    });
  } catch (error) {
    console.error("Error sending password reset email:", error);
    throw new Error("Failed to send password reset email");
  }
};

export const sendWelcomeEmail = async (email, firstName = null) => {
  const recipients = [{ email }];
  const displayName = firstName || email.split("@")[0];

  try {
    await mailtrapClient.send({
      from: sender,
      to: recipients,
      template_uuid: "ad17422b-6756-4493-b43f-32f2cacb09d0",
      template_variables: {
        username: displayName,
        company_name: "Macview Travels",
        login_url: process.env.CLIENT_URL || "http://localhost:5173",
        support_email: "macviewtravels@gmail.com",
      },
    });
  } catch (error) {
    console.error("Error sending welcome email:", error);
    throw new Error("Failed to send welcome email");
  }
};

export const sendWelcomeNewsletterEmail = async (email, subject, message) => {
  const recipients = [{ email }];
  const unsubscribeUrl = `${process.env.CLIENT_URL || "http://localhost:5173"}/unsubscribe/${encodeURIComponent(email)}`;

  try {
    await mailtrapClient.send({
      from: sender,
      to: recipients,
      template_uuid: "fe4a604e-a560-4c10-9eb7-d6f3d3f07b8b",
      template_variables: {
        company_name: "Macview Travels",
        support_email: "macviewtravels@gmail.com",
        unsubscribe_url: unsubscribeUrl,
    }
  });
  } catch (error) {
    console.error("Error sending newsletter email:", error);
    throw new Error("Failed to send newsletter email");
  }
};

export const sendContactEmail = async (name, email, subject, message) => {
  const recipients = [{ email: "macviewtravels@gmail.com" }];

  try {
    await mailtrapClient.send({
      from: sender,
      to: recipients,
      subject: subject,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>New Contact Form Message</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <hr />
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, "<br>")}</p>
        </div>
      `,
      category: "Contact",
    });
  } catch (error) {
    console.error("Error sending contact email:", error);
    throw new Error("Failed to send contact email");
  }
};
