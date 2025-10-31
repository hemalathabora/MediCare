import express from "express";
import {
  createAppointment,
  getUserAppointments,
} from "../controllers/appointmentController.js";

const router = express.Router();

// Create new appointment
router.post("/", createAppointment);

// Get all appointments for a specific user
router.get("/:userId", getUserAppointments);

export default router;
