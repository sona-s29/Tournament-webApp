const express = require("express");
const router = express.Router();
const { createOrder, verifyPayment } = require("../controllers/payment.js");

// Routes for mock payments
router.post("/order", createOrder);
router.post("/verify", verifyPayment);

module.exports = router;
