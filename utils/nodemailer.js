
// import { transporter } from "./email.js";
// import {RESET_PASSWORD_TEMPLATE} from "./templates/email.js"
// export const sendPasswordResetEmail = async (toEmail, resetURL) => {
//   const mailOptions = {
//     from: '"ABU BAKAR SIDDIQUE" <mailtrap@demomailtrap.com>',
//     to: toEmail,
//     subject: "Reset Your Password",
//     html: RESET_PASSWORD_TEMPLATE.replace("{resetURL}", resetURL),
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     console.log("✅ Password reset email sent to:", toEmail);
//   } catch (error) {
//     console.error("❌ Error sending email:", error);
//   }
// };


import { transporter } from "./email.js";
import {RESET_PASSWORD_TEMPLATE} from "./templates/email.js"
export const sendPasswordResetEmail = async (toEmail, resetURL) => {
  const resetLink = `http://localhost:5173/reset-password/${resetURL}`;
  const htmlContent = RESET_PASSWORD_TEMPLATE.replace("{{resetURL}}", resetLink);
  const mailOptions = {
    from: `DevOx Syndicate <${process.env.MAILTRAP_USER}>`,
    to: toEmail,
    subject: "Reset Your Password",
    html: htmlContent,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("✅ Password reset email sent to:", toEmail);
  } catch (error) {
    console.error("❌ Error sending email:", error);
  }
};

export const sendForgotPassEmail = async (email, resetToken) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASS,
    },
  });
  const mailOptions = {
    from: `DevOx Syndicate  <${process.env.MAILTRAP_USER}>`,
    to: email,
    subject: "Password Reset",

    html: generateForgotEmailTemplate(resetToken),
  };

  return transporter.sendMail(mailOptions);
};