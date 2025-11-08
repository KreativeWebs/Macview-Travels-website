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
          <a href="${resetURL}" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Reset Password</a>
          <p>This link will expire in 1 hour.</p>
          <p>If you didn't request this, please ignore this email.</p>
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
      subject: "Welcome to Macview Travels!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Welcome to Macview Travels, ${displayName}!</h2>
          <p>Thank you for joining our travel community. We're excited to help you plan your next adventure!</p>
          <p>With Macview Travels, you can:</p>
          <ul>
            <li>Book flights and hotels worldwide</li>
            <li>Discover amazing destinations</li>
            <li>Get personalized travel recommendations</li>
            <li>Access exclusive deals and packages</li>
          </ul>
          <p>Start exploring our services today!</p>
          <a href="${process.env.CLIENT_URL || 'http://localhost:5173'}" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Explore Now</a>
          <p>If you have any questions, feel free to reach out to our support team.</p>
          <p>Happy travels!<br>Macview Travels Team</p>
        </div>
      `,
      category: "Welcome",
    });
  } catch (error) {
    console.error("Error sending welcome email:", error);
    throw new Error("Failed to send welcome email");
  }
};
