// controllers/authController.js
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// 🔑 Generate JWT token
const generateToken = (userId, role) => {
  return jwt.sign({ id: userId, role }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// 📝 @desc Register new user
// @route POST /api/auth/register
// @access Public
export const registerUser = async (req, res) => {
  try {
    const { fullName, email, phone, password } = req.body;

    // ✅ Permanent admin credentials (DON’T expose publicly)
    const ADMIN_EMAIL = "admin@medicare.com";
    const ADMIN_PASSWORD = "Admin@123";

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Check if registering as admin
    let role = "patient";
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      role = "admin";
    }

    // Create user
    const user = await User.create({ fullName, email, phone, password, role });

    res.status(201).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      role: user.role,
      token: generateToken(user._id, user.role),
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// 📝 @desc Login user
// @route POST /api/auth/login
// @access Public
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ✅ Permanent admin credentials
    const ADMIN_EMAIL = "admin@medicare.com";
    const ADMIN_PASSWORD = "Admin@123";

    // Check if it's admin login
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      return res.json({
        _id: "admin123",
        fullName: "Admin",
        email: ADMIN_EMAIL,
        phone: "N/A",
        role: "admin",
        token: generateToken("admin123", "admin"),
      });
    }

    // Find user in DB
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    res.json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      role: user.role,
      token: generateToken(user._id, user.role),
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
