import { Link } from "react-router-dom";
import { Activity, Upload, FileText, Image, Clipboard, User } from "lucide-react";
import { useState } from "react";

const MedicalRecords = () => {
  const [records] = useState([
    { id: 1, title: "Blood Test Results", category: "Lab Reports", date: "2025-01-15", doctor: "Dr. Sarah Johnson", type: "pdf" },
    { id: 2, title: "Prescription - Aspirin", category: "Prescriptions", date: "2025-01-10", doctor: "Dr. Sarah Johnson", type: "pdf" },
    { id: 3, title: "X-Ray - Chest", category: "Imaging", date: "2025-01-05", doctor: "Dr. Michael Chen", type: "image" },
    { id: 4, title: "Annual Checkup Summary", category: "Visit Summaries", date: "2024-12-20", doctor: "Dr. Emily Williams", type: "pdf" },
  ]);

  const categories = ["All", "Lab Reports", "Prescriptions", "Imaging", "Visit Summaries"];
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredRecords = records.filter(record => activeCategory === "All" || record.category === activeCategory);

  const RecordCard = ({ record }) => (
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all hover:-translate-y-1">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3">
          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-3 rounded-lg">
            {record.type === "pdf" ? <FileText className="h-5 w-5 text-white" /> : <Image className="h-5 w-5 text-white" />}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{record.title}</h3>
            <p className="text-sm text-gray-600">{record.category}</p>
          </div>
        </div>
        <span className="text-sm text-gray-500">{record.date}</span>
      </div>
      <div className="flex items-center justify-between pt-4 border-t">
        <p className="text-sm text-gray-600">By {record.doctor}</p>
        <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg text-sm font-semibold hover:shadow-lg hover:scale-105 transition-all">
          View
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl">
            <Activity className="h-6 w-6 text-blue-500" />
            <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
              MediCare+
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/patient-dashboard">
              <button className="px-4 py-2 text-blue-500 hover:bg-blue-100 rounded-lg transition-all">
                <User className="h-5 w-5" />
              </button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="flex items-center justify-between mb-8 animate-fade-in">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Medical <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">Records</span>
              </h1>
              <p className="text-gray-600">Access and manage your health records</p>
            </div>
            <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg flex items-center gap-2 hover:shadow-lg hover:scale-105 transition-all">
              <Upload className="h-4 w-4" /> Upload Record
            </button>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-xl font-semibold transition-all ${
                  activeCategory === category
                    ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Records Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecords.length > 0 ? (
              filteredRecords.map(record => <RecordCard key={record.id} record={record} />)
            ) : (
              <div className="col-span-full text-center py-12">
                <Clipboard className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No {activeCategory.toLowerCase()} found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalRecords;
