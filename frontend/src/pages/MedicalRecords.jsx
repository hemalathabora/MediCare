import { Link } from "react-router-dom";
import {
  Activity,
  Upload,
  FileText,
  Image,
  Clipboard,
  User,
  Trash2,
  Eye,
  X,
} from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

const MedicalRecords = () => {
  const [records, setRecords] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [showViewer, setShowViewer] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const categories = [
    "All",
    "Lab Reports",
    "Prescriptions",
    "Imaging",
    "Visit Summaries",
  ];

  // ✅ Default sample records (for demo)
 // ✅ Default sample records (for demo)
const defaultRecords = [
  {
    id: 1,
    title: "Blood Test Report",
    category: "Lab Reports",
    doctor: "Dr. Sarah Johnson",
    date: "2025-09-12",
    type: "pdf",
    fileName: "blood_test_results.pdf",
    fileUrl:
      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  },
  {
    id: 2,
    title: "Chest X-Ray",
    category: "Imaging",
    doctor: "Dr. Michael Chen",
    date: "2025-09-05",
    type: "image",
    fileName: "chest_xray.png",
    fileUrl: "https://via.placeholder.com/600x400.png?text=Chest+X-Ray",
  },
  {
    id: 3,
    title: "General Health Checkup Summary",
    category: "Visit Summaries",
    doctor: "Dr. Emily Williams",
    date: "2025-08-20",
    type: "pdf",
    fileName: "checkup_summary.pdf",
    fileUrl:
      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  },
  {
    id: 4,
    title: "Post Surgery Follow-Up Summary",
    category: "Visit Summaries",
    doctor: "Dr. Rajesh Kumar",
    date: "2025-07-30",
    type: "pdf",
    fileName: "surgery_followup.pdf",
    fileUrl:
      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  },
];


  // ✅ Load records from localStorage or defaults
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("medicalRecords")) || [];
    if (saved.length === 0) {
      setRecords(defaultRecords);
      localStorage.setItem("medicalRecords", JSON.stringify(defaultRecords));
    } else {
      setRecords(saved);
    }
  }, []);

  // ✅ Save to localStorage whenever updated
  useEffect(() => {
    localStorage.setItem("medicalRecords", JSON.stringify(records));
  }, [records]);

  const filteredRecords = records.filter(
    (r) => activeCategory === "All" || r.category === activeCategory
  );

  // ✅ Upload form
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    doctor: "",
    file: null,
  });

  const handleUpload = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.category || !formData.doctor || !formData.file) {
      toast.error("Please fill all fields and choose a file");
      return;
    }

    const newRecord = {
      id: Date.now(),
      title: formData.title,
      category: formData.category,
      doctor: formData.doctor,
      date: new Date().toISOString().split("T")[0],
      type: formData.file.type.includes("image") ? "image" : "pdf",
      fileName: formData.file.name,
      fileUrl: URL.createObjectURL(formData.file),
    };

    setRecords([...records, newRecord]);
    setShowUploadForm(false);
    setFormData({ title: "", category: "", doctor: "", file: null });
    toast.success("Record uploaded successfully!");
  };

  const handleView = (record) => {
    setSelectedRecord(record);
    setShowViewer(true);
  };

  const handleDelete = (id) => {
    const updated = records.filter((r) => r.id !== id);
    setRecords(updated);
    toast.success("Record deleted successfully!");
  };

  const RecordCard = ({ record }) => (
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all hover:-translate-y-1">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3">
          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-3 rounded-lg">
            {record.type === "pdf" ? (
              <FileText className="h-5 w-5 text-white" />
            ) : (
              <Image className="h-5 w-5 text-white" />
            )}
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
        <div className="flex gap-2">
          <button
            onClick={() => handleView(record)}
            className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-all"
          >
            <Eye className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleDelete(record.id)}
            className="p-2 bg-red-100 text-red-500 rounded-lg hover:bg-red-200 transition-all"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
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
          <Link to="/patient-dashboard">
            <button className="px-4 py-2 text-blue-500 hover:bg-blue-100 rounded-lg transition-all">
              <User className="h-5 w-5" />
            </button>
          </Link>
        </div>
      </nav>

      {/* Main Section */}
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Medical{" "}
                <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                  Records
                </span>
              </h1>
              <p className="text-gray-600">Access and manage your health records</p>
            </div>
            <button
              onClick={() => setShowUploadForm(true)}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg flex items-center gap-2 hover:shadow-lg hover:scale-105 transition-all"
            >
              <Upload className="h-4 w-4" /> Upload Record
            </button>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((category) => (
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
              filteredRecords.map((record) => (
                <RecordCard key={record.id} record={record} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <Clipboard className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">
                  No {activeCategory.toLowerCase()} found
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md relative">
            <button
              onClick={() => setShowUploadForm(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            >
              <X className="h-5 w-5" />
            </button>
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
              Upload Medical Record
            </h2>
            <form onSubmit={handleUpload} className="space-y-4">
              <input
                type="text"
                placeholder="Title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full border rounded-lg px-3 py-2"
                required
              />
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full border rounded-lg px-3 py-2"
                required
              >
                <option value="">Select Category</option>
                {categories
                  .filter((c) => c !== "All")
                  .map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
              </select>
              <input
                type="text"
                placeholder="Doctor's Name"
                value={formData.doctor}
                onChange={(e) =>
                  setFormData({ ...formData, doctor: e.target.value })
                }
                className="w-full border rounded-lg px-3 py-2"
                required
              />
              <input
                type="file"
                accept="application/pdf,image/*"
                onChange={(e) =>
                  setFormData({ ...formData, file: e.target.files[0] })
                }
                className="w-full border rounded-lg px-3 py-2"
                required
              />
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-semibold hover:opacity-90"
              >
                Upload
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Viewer Modal */}
      {showViewer && selectedRecord && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-2xl w-full relative">
            <button
              onClick={() => setShowViewer(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            >
              <X className="h-5 w-5" />
            </button>
            <h3 className="text-xl font-semibold mb-4">
              {selectedRecord.title}
            </h3>
            {selectedRecord.type === "image" ? (
              <img
                src={selectedRecord.fileUrl}
                alt={selectedRecord.title}
                className="rounded-lg w-full"
              />
            ) : (
              <iframe
                src={selectedRecord.fileUrl}
                title="PDF Viewer"
                className="w-full h-96 rounded-lg"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicalRecords;
