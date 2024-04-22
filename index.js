import express from "express";
import nodemailer from "nodemailer";
const app = express();
import cors from 'cors';
import dotenv from 'dotenv';

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cors());

dotenv.config();

app.post("/api/contact", async (req, res) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  try {
    const {
      name,
      email,
      message,
    } = req.body;

    const mailOptions = {
      from: email,
      to: "krock792@gmail.com",
      subject: "Contact us form",
      text: `
            Full Name: ${name}
            Email: ${email}
            Message: ${message}
          `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Form submitted successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Network Problem" });
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});