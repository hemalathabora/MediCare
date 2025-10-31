import { Link, useNavigate } from "react-router-dom";
import {
  Calendar,
  FileText,
  CreditCard,
  Clock,
  RefreshCw,
  Edit3,
  XCircle,
} from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import Navbar from "../components/Navbar";

const PatientDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ fullName: "Guest" });

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // Default appointments
  const [upcomingAppointments, setUpcomingAppointments] = useState(() => {
    return (
      JSON.parse(localStorage.getItem("appointments")) || [
        {
          id: 1,
          doctor: "Dr. Sarah Johnson",
          specialty: "Cardiologist",
          date: "2025-11-05",
          time: "10:00 AM",
          status: "Confirmed",
        },
        {
          id: 2,
          doctor: "Dr. Michael Chen",
          specialty: "Dermatologist",
          date: "2025-11-08",
          time: "2:30 PM",
          status: "Pending",
        },
      ]
    );
  });

  // Default prescriptions (with new field)
  const [prescriptions, setPrescriptions] = useState(() => {
    return (
      JSON.parse(localStorage.getItem("prescriptions")) || [
        {
          id: 1,
          medication: "Aspirin 100mg",
          dosage: "1 tablet daily",
          prescribedBy: "Dr. Sarah Johnson",
          date: "2025-10-15",
          instructions: "Take after meals with water.",
          status: "Active",
        },
        {
          id: 2,
          medication: "Vitamin D3",
          dosage: "1 capsule weekly",
          prescribedBy: "Dr. Michael Chen",
          date: "2025-10-10",
          instructions: "Take with milk every Sunday morning.",
          status: "Active",
        },
      ]
    );
  });

  // Save updates
  useEffect(() => {
    localStorage.setItem("appointments", JSON.stringify(upcomingAppointments));
    localStorage.setItem("prescriptions", JSON.stringify(prescriptions));
  }, [upcomingAppointments, prescriptions]);

  // Actions
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleRefill = (id) => {
    setPrescriptions((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: "Refilled" } : p))
    );
    toast.success("✅ Prescription refilled successfully!");
  };

  const handleCancel = (id) => {
    setPrescriptions((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: "Canceled" } : p))
    );
    toast.info("❌ Prescription canceled.");
  };

  const handleEdit = (id) => {
    const prescription = prescriptions.find((p) => p.id === id);
    const newDosage = prompt(
      `Edit dosage for ${prescription.medication}:`,
      prescription.dosage
    );
    const newInstructions = prompt(
      `Edit instructions for ${prescription.medication}:`,
      prescription.instructions
    );

    if (newDosage || newInstructions) {
      setPrescriptions((prev) =>
        prev.map((p) =>
          p.id === id
            ? {
                ...p,
                dosage: newDosage || p.dosage,
                instructions: newInstructions || p.instructions,
              }
            : p
        )
      );
      toast.success("✏️ Prescription updated successfully!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <Navbar user={user} onLogout={handleLogout} />

      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          {/* Greeting */}
          <div className="mb-8 animate-fade-in">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Welcome back,{" "}
              <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                {user?.fullName || "Guest"}
              </span>
            </h1>
            <p className="text-gray-600">
              Here’s your personalized health dashboard
            </p>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <Link to="/appointments">
              <div className="bg-white rounded-2xl shadow-lg p-6 flex items-center gap-4 hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-4 rounded-xl">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Book Appointment
                  </h3>
                  <p className="text-sm text-gray-600">Schedule a visit</p>
                </div>
              </div>
            </Link>

            <Link to="/medical-records">
              <div className="bg-white rounded-2xl shadow-lg p-6 flex items-center gap-4 hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-4 rounded-xl">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Medical Records</h3>
                  <p className="text-sm text-gray-600">View your history</p>
                </div>
              </div>
            </Link>

            <Link to="/billing">
              <div className="bg-white rounded-2xl shadow-lg p-6 flex items-center gap-4 hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-xl">
                  <CreditCard className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Billing</h3>
                  <p className="text-sm text-gray-600">View your payments</p>
                </div>
              </div>
            </Link>
          </div>

          {/* Upcoming Appointments */}
          <div className="bg-white shadow-xl rounded-2xl p-6 mb-8 animate-slide-up">
            <h2 className="flex items-center gap-2 font-bold text-gray-900 mb-4">
              <Calendar className="h-5 w-5 text-blue-500" /> Upcoming Appointments
            </h2>

            <div className="space-y-4">
              {upcomingAppointments.map((appt) => (
                <div
                  key={appt.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{appt.doctor}</h4>
                    <p className="text-sm text-gray-600">{appt.specialty}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" /> {appt.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" /> {appt.time}
                      </span>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      appt.status === "Confirmed"
                        ? "bg-blue-500 text-white"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {appt.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Active Prescriptions */}
          <div className="bg-white shadow-xl rounded-2xl p-6 animate-slide-up">
            <h2 className="flex items-center gap-2 font-bold text-gray-900 mb-4">
              <FileText className="h-5 w-5 text-blue-500" /> Active Prescriptions
            </h2>

            <div className="space-y-4">
              {prescriptions.map((presc) => (
                <div
                  key={presc.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all"
                >
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">
                      {presc.medication}
                    </h4>
                    <p className="text-sm text-gray-600">
                      Dosage: {presc.dosage}
                    </p>
                    <p className="text-sm text-gray-600">
                      Instructions: {presc.instructions}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Prescribed by {presc.prescribedBy} on {presc.date}
                    </p>

                    {presc.status === "Refilled" && (
                      <p className="text-green-600 text-sm mt-1 font-medium">
                        ✅ Prescription Refilled
                      </p>
                    )}
                    {presc.status === "Canceled" && (
                      <p className="text-red-600 text-sm mt-1 font-medium">
                        ❌ Prescription Canceled
                      </p>
                    )}
                  </div>

                  <div className="flex gap-3">
                    {presc.status === "Active" && (
                      <>
                        <button
                          onClick={() => handleRefill(presc.id)}
                          className="px-3 py-2 text-blue-500 border border-blue-500 rounded-xl hover:bg-blue-50 flex items-center gap-2 transition-all"
                        >
                          <RefreshCw className="h-4 w-4" /> Refill
                        </button>
                        <button
                          onClick={() => handleEdit(presc.id)}
                          className="px-3 py-2 text-green-500 border border-green-500 rounded-xl hover:bg-green-50 flex items-center gap-2 transition-all"
                        >
                          <Edit3 className="h-4 w-4" /> Edit
                        </button>
                        <button
                          onClick={() => handleCancel(presc.id)}
                          className="px-3 py-2 text-red-500 border border-red-500 rounded-xl hover:bg-red-50 flex items-center gap-2 transition-all"
                        >
                          <XCircle className="h-4 w-4" /> Cancel
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
