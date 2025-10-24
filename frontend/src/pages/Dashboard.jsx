import { useEffect, useState } from "react";
import { toast } from "sonner";

const Dashboard = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProtectedData = async () => {
      const token = localStorage.getItem("token"); // get JWT from login
      if (!token) {
        toast.error("No token found, please login!");
        return;
      }

      try {
        const res = await fetch("http://localhost:5000/api/protected", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          toast.error(data.message || "Not authorized");
        } else {
          setMessage(data.message);
        }
      } catch (err) {
        console.error(err);
        toast.error("Server error");
      }
    };

    fetchProtectedData();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p>{message || "Loading..."}</p>
    </div>
  );
};

export default Dashboard;
