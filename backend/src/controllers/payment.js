// Mock Payment Controller

// Create a fake order
exports.createOrder = async (req, res) => {
  try {
    // Simulate a Razorpay-like order object
    const order = {
      id: "order_" + Date.now(), // fake order id
      amount: req.body.amount,
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    };
    res.json({ success: true, order });
  } catch (err) {
    console.error("Mock order error:", err);
    res.status(500).json({ success: false, message: "Unable to create order" });
  }
};

// Verify fake payment
exports.verifyPayment = async (req, res) => {
  try {
    // In mock mode, assume payment always succeeds
    const { order_id, payment_id } = req.body;

    // You can also add logic to reject some payments randomly if you want testing
    res.json({ success: true, message: "Payment verified successfully", payment_id, order_id });
  } catch (err) {
    console.error("Mock verify error:", err);
    res.status(500).json({ success: false, message: "Payment verification failed" });
  }
};
