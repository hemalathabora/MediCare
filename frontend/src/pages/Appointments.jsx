// pages/Appointments.jsx
import { useState, useEffect } from "react";
import { toast } from "sonner";
import Navbar from "../components/Navbar";

const Appointments = () => {
  const [formData, setFormData] = useState({
    patientName: "",
    email: "",
    phone: "",
    doctor: "",
    date: "",
    time: "",
    reason: "",
  });

  const [user, setUser] = useState(null);

  // Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Appointment booked successfully!", {
      description: "We'll send you a confirmation email shortly.",
    });
    setFormData({
      patientName: "",
      email: "",
      phone: "",
      doctor: "",
      date: "",
      time: "",
      reason: "",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Navbar */}
      <Navbar user={user} onLogout={handleLogout} />

      {/* Form Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Book an{" "}
              <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                Appointment
              </span>
            </h1>
            <p className="text-xl text-gray-600">Schedule your visit with our expert doctors</p>
          </div>

          {/* Appointment Card */}
          <div className="bg-white shadow-2xl rounded-3xl p-8 animate-scale-in">
            <h2 className="text-2xl font-bold mb-6">Appointment Details</h2>
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Grid Inputs */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-gray-700 font-medium">Patient Name</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={formData.patientName}
                    onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-gray-700 font-medium">Email</label>
                  <input
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-gray-700 font-medium">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-gray-700 font-medium">Select Doctor</label>
                  <select
                    value={formData.doctor}
                    onChange={(e) => setFormData({ ...formData, doctor: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  >
                    <option value="">Choose a doctor</option>
                    <option value="dr-johnson">Dr. Sarah Johnson - Cardiologist</option>
                    <option value="dr-chen">Dr. Michael Chen - Dermatologist</option>
                    <option value="dr-williams">Dr. Emily Williams - Pediatrician</option>
                    <option value="dr-rodriguez">Dr. James Rodriguez - Orthopedic</option>
                    <option value="dr-anderson">Dr. Lisa Anderson - Neurologist</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-gray-700 font-medium">Preferred Date</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-gray-700 font-medium">Preferred Time</label>
                  <input
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  />
                </div>
              </div>

              {/* Reason */}
              <div className="space-y-2">
                <label className="text-gray-700 font-medium">Reason for Visit</label>
                <textarea
                  placeholder="Please describe your symptoms or reason for visit..."
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-lg py-4 rounded-lg hover:opacity-90 transition-all"
              >
                Book Appointment
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Appointments;
