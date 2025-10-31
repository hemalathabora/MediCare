import { Link } from "react-router-dom";
import {
  Activity,
  IndianRupee,
  Clock,
  CheckCircle,
  Download,
  User,
  Plus,
  X,
} from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

const Billing = () => {
  // ✅ Default Invoices
  const defaultInvoices = [
    {
      id: "INV-001",
      date: "2025-01-15",
      description: "Annual Health Checkup",
      amount: 2500,
      status: "Paid",
      doctor: "Dr. Sarah Johnson",
    },
    {
      id: "INV-002",
      date: "2025-01-10",
      description: "Blood Test - Complete Panel",
      amount: 1200,
      status: "Paid",
      doctor: "Dr. Sarah Johnson",
    },
    {
      id: "INV-003",
      date: "2025-01-05",
      description: "Dermatology Consultation",
      amount: 1500,
      status: "Pending",
      doctor: "Dr. Michael Chen",
    },
    {
      id: "INV-004",
      date: "2024-12-28",
      description: "X-Ray Imaging",
      amount: 800,
      status: "Overdue",
      doctor: "Dr. Emily Williams",
    },
  ];

  // ✅ Local state + localStorage sync
  const [invoices, setInvoices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newBill, setNewBill] = useState({
    description: "",
    amount: "",
    date: "",
    doctor: "",
    status: "Pending",
  });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("billingData")) || [];
    if (saved.length === 0) {
      setInvoices(defaultInvoices);
      localStorage.setItem("billingData", JSON.stringify(defaultInvoices));
    } else {
      setInvoices(saved);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("billingData", JSON.stringify(invoices));
  }, [invoices]);

  // ✅ Totals
  const totalPaid = invoices
    .filter((inv) => inv.status === "Paid")
    .reduce((sum, inv) => sum + inv.amount, 0);
  const totalPending = invoices
    .filter((inv) => inv.status === "Pending")
    .reduce((sum, inv) => sum + inv.amount, 0);
  const totalOverdue = invoices
    .filter((inv) => inv.status === "Overdue")
    .reduce((sum, inv) => sum + inv.amount, 0);

  // ✅ Helpers
  const getStatusBadge = (status) => {
    const variants = {
      Paid: "bg-green-100 text-green-800",
      Pending: "bg-yellow-100 text-yellow-800",
      Overdue: "bg-red-100 text-red-800",
    };
    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-semibold ${variants[status]}`}
      >
        {status}
      </span>
    );
  };

  const getStatusIcon = (status) => {
    return status === "Paid" ? (
      <CheckCircle className="h-5 w-5 text-green-500" />
    ) : (
      <Clock className="h-5 w-5 text-yellow-600" />
    );
  };

  // ✅ Pay Now
  const handlePayNow = (id) => {
    const updated = invoices.map((inv) =>
      inv.id === id ? { ...inv, status: "Paid" } : inv
    );
    setInvoices(updated);
    toast.success("✅ Payment successful! Invoice marked as Paid.");
  };

  // ✅ Download Invoice (Simulated)
  const handleDownload = (id) => {
    const invoice = invoices.find((inv) => inv.id === id);
    const content = `
      MediCare+ Invoice
      ------------------------------
      Invoice ID: ${invoice.id}
      Date: ${invoice.date}
      Description: ${invoice.description}
      Doctor: ${invoice.doctor}
      Amount: ₹${invoice.amount}
      Status: ${invoice.status}
      ------------------------------
      Thank you for choosing MediCare+
    `;
    const blob = new Blob([content], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${invoice.id}.txt`;
    link.click();
    toast.info("📄 Invoice downloaded successfully.");
  };

  // ✅ Add New Bill
  const handleAddBill = () => {
    if (
      !newBill.description ||
      !newBill.amount ||
      !newBill.date ||
      !newBill.doctor
    ) {
      toast.error("⚠️ Please fill in all fields.");
      return;
    }

    const newInvoice = {
      ...newBill,
      id: `INV-${String(invoices.length + 1).padStart(3, "0")}`,
      amount: parseFloat(newBill.amount),
    };

    setInvoices([newInvoice, ...invoices]);
    setNewBill({
      description: "",
      amount: "",
      date: "",
      doctor: "",
      status: "Pending",
    });
    setShowModal(false);
    toast.success("🧾 New bill added successfully!");
  };

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

      {/* Main Content */}
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 container mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2 animate-fade-in">
              Billing &{" "}
              <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                Payments
              </span>
            </h1>
            <p className="text-gray-600">
              Manage your medical bills and payment history
            </p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all"
          >
            <Plus className="h-5 w-5" /> Add New Bill
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white shadow-lg rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Total Paid</h3>
              <CheckCircle className="h-5 w-5 text-green-500" />
            </div>
            <p className="text-3xl font-bold text-gray-900">₹{totalPaid}</p>
          </div>

          <div className="bg-white shadow-lg rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Pending</h3>
              <Clock className="h-5 w-5 text-yellow-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">₹{totalPending}</p>
          </div>

          <div className="bg-white shadow-lg rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Overdue</h3>
              <IndianRupee className="h-5 w-5 text-red-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">₹{totalOverdue}</p>
          </div>
        </div>

        {/* Invoice List */}
        <div className="bg-white shadow-xl rounded-3xl p-6 animate-slide-up space-y-4">
          {invoices.map((inv) => (
            <div
              key={inv.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-4 flex-1">
                {getStatusIcon(inv.status)}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h4 className="font-semibold text-gray-900">
                      {inv.description}
                    </h4>
                    {getStatusBadge(inv.status)}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>{inv.date}</span>•<span>{inv.doctor}</span>•
                    <span>Invoice: {inv.id}</span>
                  </div>
                </div>
                <div className="text-right mr-4">
                  <p className="text-2xl font-bold text-gray-900">
                    ₹{inv.amount}
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                {inv.status !== "Paid" && (
                  <button
                    onClick={() => handlePayNow(inv.id)}
                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:shadow-lg hover:scale-105 transition-all"
                  >
                    Pay Now
                  </button>
                )}
                <button
                  onClick={() => handleDownload(inv.id)}
                  className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
                >
                  <Download className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ✅ Modal for Adding New Bill */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            >
              <X className="h-5 w-5" />
            </button>

            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Add New Bill
            </h2>

            <div className="space-y-3">
              <input
                type="text"
                placeholder="Description"
                className="w-full border rounded-lg p-2"
                value={newBill.description}
                onChange={(e) =>
                  setNewBill({ ...newBill, description: e.target.value })
                }
              />
              <input
                type="number"
                placeholder="Amount (₹)"
                className="w-full border rounded-lg p-2"
                value={newBill.amount}
                onChange={(e) =>
                  setNewBill({ ...newBill, amount: e.target.value })
                }
              />
              <input
                type="date"
                className="w-full border rounded-lg p-2"
                value={newBill.date}
                onChange={(e) =>
                  setNewBill({ ...newBill, date: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Doctor Name"
                className="w-full border rounded-lg p-2"
                value={newBill.doctor}
                onChange={(e) =>
                  setNewBill({ ...newBill, doctor: e.target.value })
                }
              />
              <select
                className="w-full border rounded-lg p-2"
                value={newBill.status}
                onChange={(e) =>
                  setNewBill({ ...newBill, status: e.target.value })
                }
              >
                <option value="Pending">Pending</option>
                <option value="Paid">Paid</option>
                <option value="Overdue">Overdue</option>
              </select>
            </div>

            <div className="mt-5 flex justify-end">
              <button
                onClick={handleAddBill}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:shadow-md transition-all"
              >
                Save Bill
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Billing;
