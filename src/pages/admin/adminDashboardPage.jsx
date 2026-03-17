import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Loader } from "../../components/loader";
import { FiUsers, FiPackage, FiMail, FiDollarSign } from "react-icons/fi";

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    orders: 0,
    messages: 0,
    users: 0,
    revenue: 0,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    async function loadStats() {
      try {
        const ordersRes = await axios.get(
          import.meta.env.VITE_API_URL + "/api/orders",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const messagesRes = await axios.get(
          import.meta.env.VITE_API_URL + "/api/contact",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const usersRes = await axios.get(
          import.meta.env.VITE_API_URL + "/api/users",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const totalRevenue = ordersRes.data.reduce(
          (sum, order) => sum + order.total,
          0
        );

        setStats({
          orders: ordersRes.data.length,
          messages: messagesRes.data.length,
          users: usersRes.data.length,
          revenue: totalRevenue,
        });

        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setIsLoading(false);
      }
    }

    loadStats();
  }, [navigate]);

  const statCards = [
    { title: "Total Orders", value: stats.orders, icon: <FiPackage className="text-3xl text-accent" /> },
    { title: "Messages", value: stats.messages, icon: <FiMail className="text-3xl text-accent" /> },
    { title: "Users", value: stats.users, icon: <FiUsers className="text-3xl text-accent" /> },
    { title: "Revenue", value: `LKR ${stats.revenue.toFixed(2)}`, icon: <FiDollarSign className="text-3xl text-accent" /> },
  ];

  return (
    <div className="w-full min-h-screen bg-primary/40 p-6 text-secondary">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6">Admin Dashboard</h1>

      {isLoading ? (
        <Loader />
      ) : (
        <>
          {/* Stats Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {statCards.map((card) => (
              <div
                key={card.title}
                className="flex items-center gap-4 bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-secondary/10 shadow-sm hover:shadow-md transition-shadow"
              >
                <div>{card.icon}</div>
                <div>
                  <p className="text-sm text-secondary/70">{card.title}</p>
                  <p className="text-xl font-bold">{card.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Links / Tables */}
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-secondary/10 p-6 shadow-sm">
              <h2 className="font-semibold text-xl mb-4">Recent Orders</h2>
              {/* You can map your orders here like a table or card list */}
              <p className="text-secondary/70">Order table goes here...</p>
            </div>

            <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-secondary/10 p-6 shadow-sm">
              <h2 className="font-semibold text-xl mb-4">Recent Messages</h2>
              {/* You can map your messages here */}
              <p className="text-secondary/70">Messages table goes here...</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}