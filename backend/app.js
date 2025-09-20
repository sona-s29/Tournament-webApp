const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();


app.use(cors({
  origin: [
    "http://localhost:5173/", // your deployed frontend domain
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

// Routes
app.use("/auth", require("./src/routes/auth.js"));
app.use("/slots", require("./src/routes/slots.js"));
app.use("/payment", require("./src/routes/payment.js"));

module.exports = app;
