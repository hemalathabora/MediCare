// pages/About.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Activity,
  Users,
  Award,
  Heart,
  Shield,
  TrendingUp,
  CheckCircle,
} from "lucide-react";
import Navbar from "../components/Navbar";

const About = () => {
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

  const stats = [
    { icon: Users, label: "Expert Doctors", value: "500+" },
    { icon: Heart, label: "Happy Patients", value: "50,000+" },
    { icon: Award, label: "Awards Won", value: "100+" },
    { icon: TrendingUp, label: "Success Rate", value: "98%" },
  ];

  const features = [
    "State-of-the-art medical facilities",
    "Highly qualified and experienced doctors",
    "24/7 emergency services",
    "Advanced diagnostic equipment",
    "Personalized patient care",
    "Affordable healthcare packages",
    "Comprehensive health records",
    "Telemedicine consultations",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      
      {/* Navbar */}
      <Navbar user={user} onLogout={handleLogout} />

      {/* 🏥 Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 animate-fade-in">
          About{" "}
          <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
            MediCare+
          </span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed animate-fade-in">
          We are committed to redefining healthcare through compassion,
          innovation, and excellence. Your health is our mission, and we’re
          dedicated to providing world-class medical care you can trust.
        </p>
      </section>

      {/* 📊 Stats Section */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto grid md:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white shadow-lg rounded-2xl p-8 text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
              >
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-4xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </h3>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ❤️ Mission & Vision */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto grid md:grid-cols-2 gap-10">
          {/* Mission */}
          <div className="bg-white shadow-xl rounded-2xl p-10 hover:shadow-2xl transition">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-4 rounded-xl w-fit mb-6">
              <Heart className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              To deliver accessible, high-quality healthcare services with
              compassion and innovation. We aim to enhance the wellbeing of
              every individual through dedicated care, modern technology, and a
              holistic approach to health.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-white shadow-xl rounded-2xl p-10 hover:shadow-2xl transition">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-4 rounded-xl w-fit mb-6">
              <TrendingUp className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Vision
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              To be a global leader in healthcare innovation, recognized for
              patient-centered excellence, advanced research, and a commitment
              to building healthier communities worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* 🌟 Why Choose Us */}
      <section className="pb-24 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto text-center mb-12 animate-fade-in">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Choose MediCare+
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Because we believe in healthcare that’s personal, professional, and
            progressive.
          </p>
        </div>

        <div className="bg-white shadow-2xl rounded-3xl p-10 md:p-16">
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                <p className="text-gray-700 text-lg">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 💙 CTA Section */}
      <section className="pb-24 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto text-center">
          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl p-12 text-white shadow-2xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Join Our Healthcare Family
            </h2>
            <p className="text-lg md:text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              Become part of a trusted network that puts your health and
              happiness first — every step of the way.
            </p>
            <Link to="/register">
              <button className="px-10 py-4 bg-white text-blue-500 rounded-lg text-lg font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300">
                Get Started Today
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
