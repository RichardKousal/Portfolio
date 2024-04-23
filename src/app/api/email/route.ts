import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import dotenv from "dotenv";

dotenv.config();

export async function POST(request: NextRequest) {
  const { name, email, message, subject, phoneNumber } = await request.json();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  const mailOptions: Mail.Options = {
    from: `${email}`,
    to: process.env.GMAIL_USER,
    subject: "Contact Form Submission",
    text: `
      Name: ${name}
      Email: ${email}
      Subject: ${subject}
      Phone Number: ${phoneNumber}
      Message: ${message}
    `,
  };

  const sendMailPromise = () =>
    new Promise<string>((resolve, reject) => {
      transporter.sendMail(mailOptions, function (err) {
        if (!err) {
          resolve("Email sent");
        } else {
          reject(err.message);
        }
      });
    });

  try {
    await sendMailPromise();
    return NextResponse.json({ message: "Email sent" });
  } catch (err) {
    console.error("Error:", err);
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
