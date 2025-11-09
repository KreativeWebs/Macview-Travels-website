import { mailtrapClient, sender } from "../mailtrap/mailtrapConfig.js";

export const sendPasswordResetEmail = async (email, resetURL) => {
  const recipients = [{ email }];

  try {
    await mailtrapClient.send({
      from: sender,
      to: recipients,
      subject: "Password Reset Request",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Password Reset Request</h2>
          <p>You requested a password reset for your Macview Travels account.</p>
          <p>Click the link below to reset your password:</p>
          <a href="${resetURL}" style="background-color: #175aa1; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Reset Password</a>
          <p>This link will expire in 1 hour.</p>
          <p>If you didn't request this, please ignore this email.</p>
          <p>Questions? Contact <a href="https://wa.me/2348169056956" target="_blank">Support Team</a></p>
          <p>Best regards,<br>Macview Travels Team</p>
        </div>
      `,
      category: "Password Reset",
    });
  } catch (error) {
    console.error("Error sending password reset email:", error);
    throw new Error("Failed to send password reset email");
  }
};

export const sendWelcomeEmail = async (email, firstName = null) => {
  const recipients = [{ email }];
  const displayName = firstName || email.split('@')[0];

  try {
    await mailtrapClient.send({
      from: sender,
      to: recipients,
      template_uuid: "ad17422b-6756-4493-b43f-32f2cacb09d0",
      template_variables: {
        username: displayName,
        company_name: "Macview Travels",
        login_url: process.env.CLIENT_URL || 'http://localhost:5173',
        support_email: "support@macviewtravels.com"
      }
    });
  } catch (error) {
    console.error("Error sending welcome email:", error);
    throw new Error("Failed to send welcome email");
  }
};
