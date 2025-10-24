import { Link } from "react-router-dom";
import { Activity, Users, Calendar, DollarSign, TrendingUp, User } from "lucide-react";

const AdminDashboard = () => {
  const recentActivities = [
    { id: 1, action: "New patient registered", user: "John Doe", time: "5 mins ago" },
    { id: 2, action: "Appointment scheduled", user: "Dr. Sarah Johnson", time: "15 mins ago" },
    { id: 3, action: "Medical record updated", user: "Jane Smith", time: "1 hour ago" },
    { id: 4, action: "Payment received", user: "Mike Wilson", time: "2 hours ago" },
  ];

  const kpiCards = [
    { title: "Total Patients", value: "2,547", icon: Users, change: "+12% from last month", changeColor: "text-green-600" },
    { title: "Today's Appointments", value: "42", icon: Calendar, change: "18 completed, 24 pending", changeColor: "text-gray-600" },
    { title: "Total Doctors", value: "156", icon: User, change: "+3 new this month", changeColor: "text-green-600" },
    { title: "Monthly Revenue", value: "$485K", icon: DollarSign, change: "+8% from last month", changeColor: "text-green-600" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl">
            <Activity className="h-6 w-6 text-blue-500" />
            <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">MediCare+</span>
          </Link>
          <button className="px-4 py-2 text-blue-500 hover:bg-blue-100 rounded-lg transition-all">
            <User className="h-5 w-5" />
          </button>
        </div>
      </nav>

      {/* Dashboard Content */}
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 container mx-auto max-w-7xl">

        <h1 className="text-4xl font-bold text-gray-900 mb-2 animate-fade-in">
          Admin <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">Dashboard</span>
        </h1>
        <p className="text-gray-600 mb-8">Hospital management and analytics</p>

        {/* KPI Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {kpiCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div key={idx} className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition animate-scale-in">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-600">{card.title}</h3>
                  <Icon className="h-5 w-5 text-blue-500" />
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-1">{card.value}</p>
                <p className={`text-xs flex items-center gap-1 ${card.changeColor}`}>
                  {card.change.includes('%') && <TrendingUp className="h-3 w-3" />}
                  {card.change}
                </p>
              </div>
            );
          })}
        </div>

        {/* Recent Activities */}
        <div className="bg-white shadow-xl rounded-xl p-6 animate-slide-up">
          <h2 className="text-2xl font-bold mb-4">Recent Activities</h2>
          <div className="space-y-4">
            {recentActivities.map(activity => (
              <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-600">{activity.user}</p>
                </div>
                <span className="text-sm text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
