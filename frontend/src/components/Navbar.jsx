import { Link, useNavigate } from "react-router-dom";
import { Activity, User } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext"; // ✅ use global context

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth(); // ✅ get user globally
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleProfile = () => {
    setDropdownOpen(false);
    navigate("/patient-dashboard");
  };

  const handleLogout = () => {
    setDropdownOpen(false);
    logout(); // ✅ global logout
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <Activity className="h-6 w-6 text-blue-500" />
          <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
            MediCare+
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          {["Home", "Doctors", "Appointments", "About"].map((item, i) => (
            <Link
              key={i}
              to={`/${item.toLowerCase() === "home" ? "" : item.toLowerCase()}`}
              className="text-gray-700 hover:text-blue-500 font-medium transition duration-300"
            >
              {item}
            </Link>
          ))}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3 relative">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white hover:shadow-lg transition"
              >
                <User className="h-6 w-6" />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50">
                  <button
                    onClick={handleProfile}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                  >
                    Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login">
                <button className="px-4 py-2 text-blue-500 hover:bg-blue-100 rounded-lg transition duration-300">
                  Login
                </button>
              </Link>
              <Link to="/register">
                <button className="px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:shadow-lg hover:scale-105 transition duration-300">
                  Get Started
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
