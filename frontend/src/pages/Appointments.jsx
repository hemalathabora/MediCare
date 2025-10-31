import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Appointments = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    doctor: "",
    date: "",
    time: "",
    reason: "",
  });

  const [user, setUser] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // ✅ Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      console.log("✅ Loaded user:", JSON.parse(storedUser));
    } else {
      console.warn("⚠️ No user found in localStorage");
    }
  }, []);

  // ✅ Load mock doctors (no backend)
  useEffect(() => {
    const mockDoctors = [
      { _id: "1", name: "Dr. Sarah Williams", specialty: "Cardiologist" },
      { _id: "2", name: "Dr. Rajesh Kumar", specialty: "Dermatologist" },
      { _id: "3", name: "Dr. Emily Davis", specialty: "Neurologist" },
      { _id: "4", name: "Dr. John Smith", specialty: "Pediatrician" },
    ];
    setDoctors(mockDoctors);
  }, []);

  // ✅ Form submission
  const handleSubmit = (e) => {
  e.preventDefault();
  console.log("📤 handleSubmit triggered with data:", formData);

  // Allow booking even without login
  const storedUser = localStorage.getItem("user");
  const userData = storedUser ? JSON.parse(storedUser) : { fullName: "Guest" };

  if (!formData.doctor || !formData.date || !formData.time) {
    toast.error("Please fill all required fields.");
    return;
  }

  setLoading(true);

  setTimeout(() => {
    const newAppointment = {
      id: Date.now(),
      user: userData.fullName,
      doctor:
        doctors.find((d) => d._id === formData.doctor)?.name || "Unknown Doctor",
      specialty:
        doctors.find((d) => d._id === formData.doctor)?.specialty || "N/A",
      date: formData.date,
      time: formData.time,
      reason: formData.reason,
    };

    const existing =
      JSON.parse(localStorage.getItem("appointments") || "[]") || [];
    existing.push(newAppointment);
    localStorage.setItem("appointments", JSON.stringify(existing));

    console.log("✅ Appointment saved locally:", newAppointment);
    toast.success("Appointment booked successfully!");

    setLoading(false);
    setSuccess(true);

    // Force redirect after 2 seconds
    setTimeout(() => {
      console.log("🔁 Redirecting to /my-appointments...");
      navigate("/my-appointments");
    }, 2000);
  }, 1000);
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <Navbar user={user} />
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl bg-white shadow-2xl rounded-3xl p-8">
          {success ? (
            <div className="text-center py-10">
              <div className="text-6xl mb-4">✅</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Appointment Confirmed!
              </h2>
              <p className="text-gray-600">
                Redirecting to your appointments...
              </p>
            </div>
          ) : (
            <>
              <h1 className="text-3xl font-bold mb-8 text-center">
                Book an Appointment
              </h1>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block font-medium mb-1">
                    Select Doctor
                  </label>
                  <select
                    value={formData.doctor}
                    onChange={(e) =>
                      setFormData({ ...formData, doctor: e.target.value })
                    }
                    className="w-full border rounded-lg px-3 py-2"
                    required
                  >
                    <option value="">Choose a doctor</option>
                    {doctors.map((doc) => (
                      <option key={doc._id} value={doc._id}>
                        {doc.name} — {doc.specialty}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block font-medium mb-1">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) =>
                        setFormData({ ...formData, date: e.target.value })
                      }
                      className="w-full border rounded-lg px-3 py-2"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-medium mb-1">
                      Preferred Time
                    </label>
                    <input
                      type="time"
                      value={formData.time}
                      onChange={(e) =>
                        setFormData({ ...formData, time: e.target.value })
                      }
                      className="w-full border rounded-lg px-3 py-2"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-medium mb-1">
                    Reason for Visit
                  </label>
                  <textarea
                    rows={3}
                    value={formData.reason}
                    onChange={(e) =>
                      setFormData({ ...formData, reason: e.target.value })
                    }
                    className="w-full border rounded-lg px-3 py-2"
                    placeholder="Describe your symptoms or reason..."
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full text-white py-3 rounded-lg ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-blue-500 to-cyan-500 hover:opacity-90"
                  }`}
                >
                  {loading ? "Booking..." : "Book Appointment"}
                </button>
              </form>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Appointments;
