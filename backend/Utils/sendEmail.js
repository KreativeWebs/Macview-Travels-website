import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.mailgun.org",
  port: 587,
  auth: {
    user: process.env.MAILGUN_USER, // e.g. postmaster@yourdomain.com
    pass: process.env.MAILGUN_PASS,
  },
});

export const sendPasswordResetEmail = async (to, name, resetURL) => {
  const html = `
    <div style="font-family: Arial, sans-serif; background: #f7f7f7; padding: 20px;">
      <div style="max-width: 500px; margin: auto; background: white; padding: 30px; border-radius: 10px;">
        <h2 style="color: #0066ff;">Macview Travels</h2>
        <p>Hello ${name || "traveler"},</p>
        <p>We received a request to reset your password. Click the button below:</p>
        <a href="${resetURL}" 
           style="display:inline-block;background:#ff6600;color:white;padding:10px 20px;text-decoration:none;border-radius:5px;">
           Reset Password
        </a>
        <p style="margin-top:20px;">If you didn’t request this, you can safely ignore this email.</p>
      </div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"Macview Travels" <noreply@${process.env.MAILGUN_DOMAIN}>`,
      to,
      subject: "Reset your password",
      html,
    });
    console.log("✅ Password reset email sent");
  } catch (error) {
    console.error("❌ Email sending failed:", error);
    throw new Error("Email could not be sent");
  }
};
