const connectToMongo = require("./db");
const express = require("express");
const cors = require("cors");
const authRoute = require("./routes/auth");
const usersRoute = require("./routes/users");
const guesthousesRoute = require("./routes/guesthouses");
const roomsRoute = require("./routes/rooms");
const cookieParser = require("cookie-parser");
const nodemailer = require("nodemailer");

connectToMongo();
const app = express();
const port = 5000;

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/auth", authRoute);
app.use("/guesthouses", guesthousesRoute);
app.use("/rooms", roomsRoute);
app.use("/users", usersRoute);

//error handling middleware
//middlewares
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.post("/send-email", async (req, res) => {
  const { email, subject, text } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "punamkumavat01@gmail.com", // Replace with your email
      pass: "PunamNimcetair56@", // Replace with your email password
    },
  });
  
  const mailOptions = {
    from: "punamkumavat01@gmail.com", // Replace with your email
    to: email,
    subject,
    text,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
