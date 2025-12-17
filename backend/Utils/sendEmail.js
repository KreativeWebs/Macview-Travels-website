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
      },

    
    });
  } catch (error) {
    console.error("Error sending welcome email:", error);
    throw new Error("Failed to send welcome email");
  }
};

export const sendNewsletterEmail = async (email, subject, message) => {
  const recipients = [{ email }];

  try {
    await mailtrapClient.send({
      from: sender,
      to: recipients,
      subject: subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Newsletter from Macview Travels</h2>
          <div>${message.replace(/\n/g, '<br>')}</div>
          <p>Best regards,<br>Macview Travels Team</p>
          <p>If you no longer wish to receive our newsletters, please contact us.</p>
        </div>
      `,
      category: "Newsletter",
    });
  } catch (error) {
    console.error("Error sending newsletter email:", error);
    throw new Error("Failed to send newsletter email");
  }
};
