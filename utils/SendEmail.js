import nodemailer from "nodemailer";

export async function SendEmail(email, subject, htmlContent) {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT),
      secure: process.env.EMAIL_SECURE === "true",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: subject,
      html: htmlContent,
    });
    console.log("Email sent to:", email);

    return true;
  } catch (error) {
    console.error("Error in SendEmail POST handler:", error);
    return false;
  }
}
