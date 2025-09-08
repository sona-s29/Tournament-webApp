const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./src/routes/auth.js"));
app.use("/api/slots", require("./src/routes/slots.js"));
app.use("/api/payment", require("./src/routes/payment.js"));

module.exports = app;
