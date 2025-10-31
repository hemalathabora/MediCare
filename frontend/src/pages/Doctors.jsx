// pages/Doctors.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Star, Calendar, Award, MapPin, Clock, Search } from "lucide-react";
import Navbar from "../components/Navbar";

const Doctors = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All");
  const [user, setUser] = useState(null);
  const [doctors, setDoctors] = useState([]);

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

  // ✅ Fetch doctors from backend
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/doctors");
        const data = await res.json();
        setDoctors(data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };
    fetchDoctors();
  }, []);

  const specialties = ["All", ...new Set(doctors.map((doc) => doc.specialty))];

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty =
      selectedSpecialty === "All" || doctor.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Navbar */}
      <Navbar user={user} onLogout={handleLogout} />

      {/* Header */}
      <section className="pt-32 pb-12 text-center px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          Meet Our{" "}
          <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
            Top Doctors
          </span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Trusted professionals providing compassionate and expert care for every patient.
        </p>
      </section>

      {/* Search & Filter */}
      <section className="pb-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto bg-white rounded-2xl shadow-lg p-6 animate-slide-up">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or specialty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition"
              />
            </div>

            <select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="border-2 border-gray-200 rounded-xl py-3 px-4 focus:border-blue-500 focus:outline-none transition bg-gray-50"
            >
              {specialties.map((spec) => (
                <option key={spec} value={spec}>
                  {spec}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Doctors Grid */}
      <section className="pb-24 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDoctors.map((doctor, index) => (
            <div
              key={doctor._id}
              className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span
                  className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-semibold ${
                    doctor.available ? "bg-green-500 text-white" : "bg-gray-400 text-white"
                  }`}
                >
                  {doctor.available ? "Available" : "Unavailable"}
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{doctor.name}</h3>
                <p className="text-blue-500 font-semibold mb-3">{doctor.specialty}</p>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.round(doctor.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-gray-700 font-medium">
                    {doctor.rating} ({doctor.reviews})
                  </span>
                </div>

                {/* Info */}
                <div className="text-gray-600 space-y-2 mb-6">
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-blue-500" /> {doctor.experience} experience
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-blue-500" /> {doctor.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-blue-500" /> Next: {doctor.nextAvailable}
                  </div>
                </div>

                {/* Button */}
                <Link to={doctor.available ? "/appointments" : "#"}>
                  <button
                    disabled={!doctor.available}
                    className={`w-full py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                      doctor.available
                        ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:shadow-lg hover:scale-105"
                        : "bg-gray-200 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    <Calendar className="h-5 w-5" />{" "}
                    {doctor.available ? "Book Appointment" : "Not Available"}
                  </button>
                </Link>
              </div>
            </div>
          ))}

          {filteredDoctors.length === 0 && (
            <p className="text-center text-2xl text-gray-600 py-20 animate-fade-in col-span-full">
              No doctors found matching your search.
            </p>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 text-center">
        <p className="text-gray-400 text-sm">
          © 2025 MediCare+. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Doctors;
