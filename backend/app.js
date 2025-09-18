const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();


app.use(cors({
  origin: [
    "https://classytournament.vercel.app/", // your deployed frontend domain
    "https://tournament-webapp.onrender.com"             // for local dev (Vite default)
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
