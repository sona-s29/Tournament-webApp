// src/controllers/payment.js
const Razorpay = require("razorpay");
const crypto = require("crypto");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create an order (used by Checkout)
exports.createOrder = async (req, res) => {
  try {
    let { amount } = req.body;
    if (!amount) return res.status(400).json({ success: false, message: "amount required" });

    amount = Number(amount);
    if (isNaN(amount) || amount <= 0)
      return res.status(400).json({ success: false, message: "invalid amount" });

    const options = {
      amount: Math.round(amount * 100), // rupees -> paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      payment_capture: 1, // auto-capture (test)
    };

    const order = await razorpay.orders.create(options);
    return res.json({ success: true, order });
  } catch (err) {
    console.error("Razorpay createOrder error:", err);
    return res.status(500).json({ success: false, message: "Unable to create order" });
  }
};

// Verify payment signature from Checkout (handler response)
exports.verifyPayment = async (req, res) => {
  try {
    const order_id = req.body.razorpay_order_id || req.body.order_id || req.body.orderId;
    const payment_id = req.body.razorpay_payment_id || req.body.payment_id;
    const signature = req.body.razorpay_signature || req.body.signature;

    if (!order_id || !payment_id || !signature) {
      return res.status(400).json({ success: false, message: "Missing verification fields" });
    }

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${order_id}|${payment_id}`)
      .digest("hex");

    if (expectedSignature === signature) {
      return res.json({ success: true, message: "Payment verified", order_id, payment_id });
    } else {
      return res.status(400).json({ success: false, message: "Invalid signature" });
    }
  } catch (err) {
    console.error("Razorpay verifyPayment error:", err);
    return res.status(500).json({ success: false, message: "Verification failed" });
  }
};
