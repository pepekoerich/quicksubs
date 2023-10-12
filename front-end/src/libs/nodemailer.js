import nodemailer from "nodemailer";

const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;

export const transporter = nodemailer.createTransport({
  port: 465,
  host: "smtp.gmail.com",
  secure: true, // use SSL
  auth: {
    user: emailUser,
    pass: emailPass,
  },
});

export const mailOptions = {
  from: emailUser,
  to: emailUser,
};
