const jwt = require("jsonwebtoken");

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const JWT_SECRET = process.env.JWT_SECRET;

if (!ADMIN_PASSWORD) {
  throw new Error("ADMIN_PASSWORD is not set in environment variables!");
}
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not set in environment variables!");
}

exports.adminLogin = (req, res) => {
  const { password } = req.body;
  if (password === ADMIN_PASSWORD) {
    const token = jwt.sign({ isAdmin: true }, JWT_SECRET, { expiresIn: "30m" });
    return res.json({ token });
  }
  return res.status(401).json({ message: "Invalid password" });
};
