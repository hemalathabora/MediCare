import { Link } from "react-router-dom";
import { Activity, DollarSign, Clock, CheckCircle, Download, User } from "lucide-react";
import { useState } from "react";

const Billing = () => {
  const [invoices] = useState([
    { id: "INV-001", date: "2025-01-15", description: "Annual Health Checkup", amount: 250, status: "Paid", doctor: "Dr. Sarah Johnson" },
    { id: "INV-002", date: "2025-01-10", description: "Blood Test - Complete Panel", amount: 150, status: "Paid", doctor: "Dr. Sarah Johnson" },
    { id: "INV-003", date: "2025-01-05", description: "Dermatology Consultation", amount: 200, status: "Pending", doctor: "Dr. Michael Chen" },
    { id: "INV-004", date: "2024-12-28", description: "X-Ray Imaging", amount: 180, status: "Overdue", doctor: "Dr. Emily Williams" },
  ]);

  const totalPaid = invoices.filter(inv => inv.status === "Paid").reduce((sum, inv) => sum + inv.amount, 0);
  const totalPending = invoices.filter(inv => inv.status === "Pending").reduce((sum, inv) => sum + inv.amount, 0);
  const totalOverdue = invoices.filter(inv => inv.status === "Overdue").reduce((sum, inv) => sum + inv.amount, 0);

  const getStatusBadge = (status) => {
    const variants = { Paid: "bg-green-500 text-white", Pending: "bg-yellow-100 text-yellow-800", Overdue: "bg-red-100 text-red-800" };
    return <span className={`px-2 py-1 rounded-full text-xs font-semibold ${variants[status]}`}>{status}</span>;
  };

  const getStatusIcon = (status) => {
    return status === "Paid" ? <CheckCircle className="h-5 w-5 text-green-500" /> : <Clock className="h-5 w-5 text-yellow-600" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl">
            <Activity className="h-6 w-6 text-blue-500" />
            <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">MediCare+</span>
          </Link>
          <Link to="/patient-dashboard">
            <button className="px-4 py-2 text-blue-500 hover:bg-blue-100 rounded-lg transition-all">
              <User className="h-5 w-5" />
            </button>
          </Link>
        </div>
      </nav>

      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 container mx-auto max-w-7xl">

        <h1 className="text-4xl font-bold text-gray-900 mb-2 animate-fade-in">
          Billing & <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">Payments</span>
        </h1>
        <p className="text-gray-600 mb-8">Manage your medical bills and payment history</p>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white shadow-lg rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Total Paid</h3>
              <CheckCircle className="h-5 w-5 text-green-500" />
            </div>
            <p className="text-3xl font-bold text-gray-900">${totalPaid}</p>
          </div>
          <div className="bg-white shadow-lg rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Pending</h3>
              <Clock className="h-5 w-5 text-yellow-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">${totalPending}</p>
          </div>
          <div className="bg-white shadow-lg rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Overdue</h3>
              <DollarSign className="h-5 w-5 text-red-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">${totalOverdue}</p>
          </div>
        </div>

        {/* Invoice History */}
        <div className="bg-white shadow-xl rounded-3xl p-6 animate-slide-up space-y-4">
          {invoices.map(inv => (
            <div key={inv.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-4 flex-1">
                {getStatusIcon(inv.status)}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h4 className="font-semibold text-gray-900">{inv.description}</h4>
                    {getStatusBadge(inv.status)}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>{inv.date}</span>•<span>{inv.doctor}</span>•<span>Invoice: {inv.id}</span>
                  </div>
                </div>
                <div className="text-right mr-4">
                  <p className="text-2xl font-bold text-gray-900">${inv.amount}</p>
                </div>
              </div>
              <div className="flex gap-2">
                {inv.status !== "Paid" && (
                  <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg">Pay Now</button>
                )}
                <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-100">
                  <Download className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Billing;
