import { Link, useNavigate } from "react-router-dom";
import { Activity, Calendar, FileText, CreditCard, User, Clock } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const PatientDashboard = () => {
  const navigate = useNavigate();

  // Fetch logged-in user from localStorage
  const [user, setUser] = useState({ name: "Guest" });
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const upcomingAppointments = [
    { id: 1, doctor: "Dr. Sarah Johnson", specialty: "Cardiologist", date: "2025-01-22", time: "10:00 AM", status: "Confirmed" },
    { id: 2, doctor: "Dr. Michael Chen", specialty: "Dermatologist", date: "2025-01-25", time: "2:30 PM", status: "Pending" },
  ];

  const prescriptions = [
    { id: 1, medication: "Aspirin 100mg", dosage: "1 tablet daily", prescribedBy: "Dr. Sarah Johnson", date: "2025-01-10" },
    { id: 2, medication: "Vitamin D3", dosage: "1 capsule weekly", prescribedBy: "Dr. Michael Chen", date: "2025-01-08" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl">
            <Activity className="h-6 w-6 text-blue-500" />
            <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">MediCare+</span>
          </Link>

          <div className="flex items-center gap-3 relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center justify-center w-10 h-10 bg-blue-500 text-white rounded-full hover:shadow-lg transition"
            >
              <User className="h-5 w-5" />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-12 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 animate-scale-in">
                <button
                  onClick={() => { navigate("/patient-dashboard"); setDropdownOpen(false); }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 transition"
                >
                  Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100 transition"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-8 animate-fade-in">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Welcome back,{" "}
              <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                {user?.name || "Guest"}
              </span>
            </h1>
            <p className="text-gray-600">Here's your health dashboard</p>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Link to="/appointments">
              <div className="bg-white rounded-2xl shadow-lg p-6 flex items-center gap-4 hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer animate-scale-in">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-4 rounded-xl">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Book Appointment</h3>
                  <p className="text-sm text-gray-600">Schedule a visit</p>
                </div>
              </div>
            </Link>

            <Link to="/medical-records">
              <div className="bg-white rounded-2xl shadow-lg p-6 flex items-center gap-4 hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer animate-scale-in">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-4 rounded-xl">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Medical Records</h3>
                  <p className="text-sm text-gray-600">View your records</p>
                </div>
              </div>
            </Link>

            <Link to="/billing">
              <div className="bg-white rounded-2xl shadow-lg p-6 flex items-center gap-4 hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer animate-scale-in">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-xl">
                  <CreditCard className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Billing</h3>
                  <p className="text-sm text-gray-600">View invoices</p>
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
                <div key={appt.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
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
                <div key={presc.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{presc.medication}</h4>
                    <p className="text-sm text-gray-600">Dosage: {presc.dosage}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Prescribed by {presc.prescribedBy} on {presc.date}
                    </p>
                  </div>
                  <button className="px-4 py-2 text-blue-500 border border-blue-500 rounded-xl hover:bg-blue-50 transition-all">
                    Refill
                  </button>
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
