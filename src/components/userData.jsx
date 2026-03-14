import axios from "axios";
import { useEffect, useState } from "react";

export default function UserData() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token != null) {
      axios
        .get(import.meta.env.VITE_API_URL + "/api/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setUser(res.data);
          setLoading(false);
        })
        .catch(() => {
          localStorage.removeItem("token");
          setUser(null);
          setLoading(false);
        });
    }else{
        setLoading(false);
    }
  }, []);

  return (
    <div className="flex items-center justify-center relative">
      {/* Loader */}
      {loading && (
        <div className="w-[28px] h-[28px] border-[3px] border-primary border-t-transparent rounded-full animate-spin"></div>
      )}

      {/* Logged User */}
      {user && (
        <div className="relative flex items-center gap-3">
          {/* User Button */}
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 bg-primary/80 px-3 py-1 rounded-full shadow hover:shadow-lg transition"
          >
            <img
              src={user.image}
              className="w-[38px] h-[38px] rounded-full object-cover"
            />

            <span className="text-accent px-3 text-sm font-semibold">
              {user.firstName}
            </span>
          </button>

          {/* Dropdown */}
          {open && (
            <div className="top-[-120px] absolute lg:right-0 lg:top-[50px] w-[180px] z-50 bg-white text-accent rounded-xl shadow-xl  overflow-hidden animate-fadeIn">
              <a
                href="/settings"
                className="block px-4 py-2 text-sm font-semibold hover:bg-primary transition"
              >
                Account Settings
              </a>

              <a
                href="/orders"
                className="block px-4 py-2 text-sm font-semibold hover:bg-primary  transition"
              >
                Orders
              </a>

              <button
                onClick={() => setShowLogoutConfirm(true)}
                className="w-full text-left px-4 py-2 text-sm font-semibold text-red-500 hover:bg-primary transition"
              >
                Logout
              </button>
            </div>
          )}
          {showLogoutConfirm && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[200]">
              <div className="bg-white rounded-xl shadow-xl w-[300px] p-5">
                <h2 className="text-lg font-semibold text-secondary">
                  Confirm Logout
                </h2>

                <p className="text-sm text-gray-600 mt-2">
                  Are you sure you want to logout?
                </p>

                <div className="flex justify-end gap-3 mt-5">
                  <button
                    onClick={() => setShowLogoutConfirm(false)}
                    className="px-4 py-1 bg-accent rounded-md border text-white hover:bg-black/40"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={() => {
                      localStorage.removeItem("token");
                      setUser(null);
                      setShowLogoutConfirm(false);
                    }}
                    className="px-4 py-1 rounded-md border bg-accent text-white hover:bg-red-500"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Login */}
      {!loading && user == null && (
        <a
          href="/login"
          className="bg-accent text-white text-sm font-semibold px-4 py-2 rounded-lg shadow hover:bg-[#8d2f2f] hover:scale-105 transition"
        >
          Login
        </a>
      )}
    </div>
  );
}
