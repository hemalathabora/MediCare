import Appointment from "../models/Appointment.js";

// ✅ Create new appointment
export const createAppointment = async (req, res) => {
  try {
    const { user, doctor, date, time, reason } = req.body;

    if (!user || !doctor || !date || !time || !reason) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const appointment = await Appointment.create({
      user,
      doctor,
      date,
      time,
      reason,
    });

    res.status(201).json({
      message: "Appointment booked successfully",
      appointment,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating appointment", error: err.message });
  }
};

// ✅ Get all appointments for a specific user
export const getUserAppointments = async (req, res) => {
  try {
    const { userId } = req.params;

    const appointments = await Appointment.find({ user: userId })
      .populate("doctor", "name specialty")
      .sort({ date: 1 });

    res.json(appointments);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching appointments", error: err.message });
  }
};
