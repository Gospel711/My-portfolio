require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/send-message", async (req, res) => {
  console.log("Received Data: ", req.body);

  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.json({ status: "Error", message: "All fields are required." });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // Replace with your email
      pass: process.env.EMAIL_PASS, // Replace with your email password or app password
    },
  });

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER, // Your email
    subject: `Message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ status: "Success", message: "Message sent successfully!" });
  } catch (error) {
    console.error("Email error: ", error);
    res.json({ status: "Error", message: error.message });
  }
});

app.get("/", (req, res) => {
  res.send("Welcome to my application!");
});

app.listen(3000, () => console.log("Server running on port 3000"));