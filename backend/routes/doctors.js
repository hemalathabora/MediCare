import express from "express";
import { addDoctor, getDoctors, getDoctorById } from "../controllers/doctorController.js";

const router = express.Router();

// Routes
router.post("/", addDoctor);   // Add a new doctor
router.get("/", getDoctors);   // Get all doctors
router.get("/:id", getDoctorById); // Get doctor by ID

export default router;
