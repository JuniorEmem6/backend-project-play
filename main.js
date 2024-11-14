const express = require("express");
const multer = require("multer");
const nodemailer = require("nodemailer");
const helmet = require("helmet");
const cors = require("cors");
const app = express();
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(
  cors({
    origin: "*",
  })
);

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "simplyemem10@gmail.com",
    pass: "yjsd bslx tfhx kxbl",
  },
});

app.post("/submit-form", upload.single("file"), (req, res) => {
  const { name, email, phone } = req.body;
  console.log(req.body);
  const file = req.file;

  // Create mail options
  const mailOptions = {
    from: process.env.EMAIL,
    to: "ememeden6@gmail.com", // Replace with your target email
    subject: "REQUEST FOR ARTICLE SUBMISSION",
    text: `Name: ${name}\nEmail: ${email}\nPhone Number: ${phone}`,
    attachments: [
      {
        filename: file.originalname,
        content: file.buffer,
      },
    ],
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      return res.status(500).send("Failed to send email");
    }
    console.log("Email sent: " + info.response);
    res.status(200).send("Form submitted successfully");
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
