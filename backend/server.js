// server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./utils/db.js";
import { protect } from "./middleware/auth.js";
import authRoutes from "./routes/auth.js";

// Load environment variables
dotenv.config();

// Initialize app
const app = express();

// Middleware
app.use(express.json());

// ✅ Enable CORS for your frontend
app.use(
  cors({
    origin: "http://localhost:3000", // Allow React app
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// ✅ Connect to MongoDB
connectDB();

// ✅ Routes
app.use("/api/auth", authRoutes);

// ✅ Test routes
app.get("/", (req, res) => res.send("MediCare+ Backend is running..."));
app.get("/api/protected", protect, (req, res) => {
  res.json({ message: `Hello ${req.user.fullName}, you are authenticated!` });
});

// ✅ Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
