// pages/Index.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Activity,
  Calendar,
  Users,
  Heart,
  Shield,
  Search,
  ArrowUp,
  Quote,
} from "lucide-react";
import Navbar from "../components/Navbar";

const Index = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [counts, setCounts] = useState({ doctors: 0, patients: 0, success: 0 });

  // ✅ Animated stats effect
  useEffect(() => {
    let d = 0,
      p = 0,
      s = 0;
    const interval = setInterval(() => {
      if (d < 500) d += 10;
      if (p < 50000) p += 1000;
      if (s < 98) s += 2;
      setCounts({ doctors: d, patients: p, success: s });
      if (d >= 500 && p >= 50000 && s >= 98) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // ✅ Show scroll-to-top button
  useEffect(() => {
    const handleScroll = () => setShowTopBtn(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  // ✅ No need to store user here — Navbar handles that globally
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Navbar (automatically detects login) */}
      <Navbar onLogout={handleLogout} />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Your Health,
              <span className="block bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                Our Priority
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Experience world-class healthcare with MediCare+. Book appointments,
              consult top doctors, and manage your health all in one place.
            </p>

            {/* Search Bar */}
            <div className="relative mb-6 max-w-md">
              <input
                type="text"
                placeholder="Search for doctors, specialties..."
                className="w-full p-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
              />
              <Search className="absolute right-4 top-4 text-gray-500" />
            </div>

            <div className="flex flex-wrap gap-4">
              <Link to="/appointments">
                <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg text-lg font-semibold hover:shadow-xl hover:scale-105 transition">
                  Book Appointment
                </button>
              </Link>
              <Link to="/doctors">
                <button className="px-8 py-4 bg-white text-blue-500 border-2 border-blue-500 rounded-lg text-lg font-semibold hover:bg-blue-500 hover:text-white hover:shadow-xl hover:scale-105 transition">
                  Find a Doctor
                </button>
              </Link>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative animate-scale-in">
            <img
              src="https://th.bing.com/th/id/OIP.5Uy0ZHbYVWm-qmyvBgImvAHaEh?w=270&h=180&c=7&r=0&o=7&cb=12&dpr=1.5&pid=1.7&rm=3"
              alt="Modern Hospital"
              className="rounded-3xl shadow-2xl w-full h-[500px] object-cover"
            />
            <div className="absolute bottom-4 left-4 bg-white p-5 rounded-2xl shadow-xl flex items-center gap-4">
              <Heart className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-2xl font-bold text-gray-900">24/7</p>
                <p className="text-gray-600">Emergency Care</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Why Choose MediCare+
          </h2>
          <p className="text-xl text-gray-600 mb-16">
            Experience healthcare that puts you first
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Calendar,
                title: "Easy Scheduling",
                desc: "Book appointments with top doctors in just a few clicks.",
                color: "from-blue-500 to-cyan-500",
              },
              {
                icon: Users,
                title: "Expert Doctors",
                desc: "Access to 500+ certified specialists across all fields.",
                color: "from-green-500 to-emerald-500",
              },
              {
                icon: Shield,
                title: "Secure & Private",
                desc: "Your medical data is encrypted and fully protected.",
                color: "from-purple-500 to-pink-500",
              },
            ].map((f, i) => (
              <div
                key={i}
                className="group bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div
                  className={`bg-gradient-to-br ${f.color} p-4 rounded-xl w-fit mx-auto mb-6 group-hover:scale-110 transition-transform`}
                >
                  <f.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{f.title}</h3>
                <p className="text-gray-600 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
        <div className="container mx-auto px-4 grid md:grid-cols-4 gap-8 text-center">
          <div>
            <p className="text-5xl font-bold mb-2">{counts.doctors}+</p>
            <p className="text-xl text-white/90">Expert Doctors</p>
          </div>
          <div>
            <p className="text-5xl font-bold mb-2">
              {counts.patients.toLocaleString()}+
            </p>
            <p className="text-xl text-white/90">Happy Patients</p>
          </div>
          <div>
            <p className="text-5xl font-bold mb-2">24/7</p>
            <p className="text-xl text-white/90">Emergency Care</p>
          </div>
          <div>
            <p className="text-5xl font-bold mb-2">{counts.success}%</p>
            <p className="text-xl text-white/90">Success Rate</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-gray-900">
            What Our Patients Say
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Dr. Emily Carter",
                text: "MediCare+ makes managing my patients so much easier. The appointment system is flawless!",
              },
              {
                name: "John Matthews",
                text: "Booking appointments online saved me hours. The doctors here truly care about patients.",
              },
              {
                name: "Sarah Khan",
                text: "Excellent support and privacy. I can access my reports anytime. Highly recommended!",
              },
            ].map((t, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-8 shadow-lg hover:-translate-y-2 transition"
              >
                <Quote className="h-8 w-8 text-blue-500 mb-4 mx-auto" />
                <p className="text-gray-600 mb-6 italic">"{t.text}"</p>
                <h4 className="font-semibold text-gray-900">{t.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl p-12 text-center text-white shadow-2xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Join thousands of patients who trust MediCare+ for their care.
            </p>
            <Link to="/register">
              <button className="px-10 py-4 bg-white text-blue-500 rounded-lg text-lg font-semibold hover:shadow-xl hover:scale-105 transition">
                Create Free Account
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8 relative">
        <div className="container mx-auto grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 font-bold text-xl mb-4">
              <Activity className="h-6 w-6 text-blue-500" />
              <span>MediCare+</span>
            </div>
            <p className="text-gray-400">
              Your trusted partner in healthcare excellence.
            </p>
          </div>

          <div>
            <h3 className="font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              {["Home", "Doctors", "Appointments", "About"].map((link) => (
                <li key={link}>
                  <Link
                    to={`/${link.toLowerCase() === "home" ? "" : link.toLowerCase()}`}
                    className="hover:text-white transition"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Services</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Emergency Care</li>
              <li>Outpatient Services</li>
              <li>Medical Records</li>
              <li>Lab Services</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li>123 Medical Center Drive</li>
              <li>Phone: (555) 123-4567</li>
              <li>Email: info@medicareplus.com</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          &copy; 2025 MediCare+. All rights reserved.
        </div>

        {/* Scroll to top */}
        {showTopBtn && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition"
          >
            <ArrowUp />
          </button>
        )}
      </footer>
    </div>
  );
};

export default Index;
