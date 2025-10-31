import { useState, useEffect } from "react";
import { toast } from "sonner";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editData, setEditData] = useState({ date: "", time: "" });
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // ✅ Load appointments and user from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedAppointments =
      JSON.parse(localStorage.getItem("appointments")) || [];
    setUser(storedUser);
    setAppointments(storedAppointments);
  }, []);

  // ✅ Cancel appointment
  const handleCancel = (index) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this appointment?"
    );
    if (!confirmCancel) return;

    const updated = appointments.filter((_, i) => i !== index);
    setAppointments(updated);
    localStorage.setItem("appointments", JSON.stringify(updated));
    toast.success("Appointment cancelled successfully!");
  };

  // ✅ Start editing appointment
  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditData({
      date: appointments[index].date,
      time: appointments[index].time,
    });
  };

  // ✅ Save edited appointment
  const handleSave = () => {
    const updated = [...appointments];
    updated[editingIndex] = {
      ...updated[editingIndex],
      date: editData.date,
      time: editData.time,
    };
    setAppointments(updated);
    localStorage.setItem("appointments", JSON.stringify(updated));
    setEditingIndex(null);
    toast.success("Appointment rescheduled successfully!");
  };

  // ✅ Logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <Navbar user={user} onLogout={handleLogout} />

      <section className="pt-28 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold text-center mb-10">
            My{" "}
            <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
              Appointments
            </span>
          </h1>

          {appointments.length === 0 ? (
            <p className="text-center text-gray-500 text-lg">
              You have no appointments yet.{" "}
              <button
                onClick={() => navigate("/appointments")}
                className="text-blue-600 hover:underline"
              >
                Book one now!
              </button>
            </p>
          ) : (
            <div className="space-y-6">
              {appointments.map((appt, index) => (
                <div
                  key={appt.id}
                  className="bg-white shadow-lg rounded-2xl p-6 border border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center"
                >
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">
                      {appt.doctorName} — {appt.specialty}
                    </h3>

                    {editingIndex === index ? (
                      <div className="flex gap-2 mt-3">
                        <input
                          type="date"
                          value={editData.date}
                          onChange={(e) =>
                            setEditData({ ...editData, date: e.target.value })
                          }
                          className="border border-gray-300 rounded-lg px-3 py-1"
                        />
                        <input
                          type="time"
                          value={editData.time}
                          onChange={(e) =>
                            setEditData({ ...editData, time: e.target.value })
                          }
                          className="border border-gray-300 rounded-lg px-3 py-1"
                        />
                      </div>
                    ) : (
                      <p className="text-gray-600 mt-2">
                        📅 {appt.date} at ⏰ {appt.time}
                      </p>
                    )}
                    <p className="text-gray-500 mt-1">🩺 Reason: {appt.reason}</p>
                  </div>

                  <div className="flex gap-3 mt-4 sm:mt-0">
                    {editingIndex === index ? (
                      <button
                        onClick={handleSave}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-all"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEdit(index)}
                        className="bg-yellow-400 text-white px-4 py-2 rounded-lg hover:bg-yellow-500 transition-all"
                      >
                        Edit
                      </button>
                    )}

                    <button
                      onClick={() => handleCancel(index)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default MyAppointments;
