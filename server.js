const nodemailer = require("nodemailer");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post("/contact", (req, res) => {
  const { name, email, subject, message } = req.body;

  const transporter = nodemailer.createTransport({
    //service: "gmail",
    host: "localhost",
    port: 25,
    secure: false,
    /*auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },*/
  });

  const mailOptions = {
    from: email,
    to: process.env.SMTP_USER,
    subject: subject,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send("Message sent: " + info.response);
  });
});

const PORT = process.env.PORT || 2000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
