import axios from "axios";
import { useEffect, useState } from "react";
import mediaUpload from "../utils/mediaUpload";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function UserSettings() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [image, setImage] = useState(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
      return;
    }
    axios
      .get(import.meta.env.VITE_API_URL + "/api/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setFirstName(res.data.firstName);
        setLastName(res.data.lastName);
        setUser(res.data);
      })
      .catch(() => {
        localStorage.removeItem("token");
        window.location.href = "/login";
      });
  }, []);

  async function updateUserData() {
    const data = {
      firstName: firstName,
      lastName: lastName,
      image: user.image,
    };
    if (image != null) {
      const link = await mediaUpload(image);
      data.image = link;
    }
    await axios
      .put(import.meta.env.VITE_API_URL + "/api/users/me", data, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then(() => {
        toast.success("Profile updated successfully");
      })
      .catch((err) => {
        console.error("Error updating profile:", err);
        toast.error("Failed to update profile");
      });
    navigate("/");
  }

  async function updatePassword() {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    await axios
      .put(
        import.meta.env.VITE_API_URL + "/api/users/me/password",
        {
          password: password,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
      )
      .then(() => {
        toast.success("Password updated successfully");
        setPassword("");
        setConfirmPassword("");
      })
      .catch((err) => {
        console.error("Error updating password:", err);
        toast.error("Failed to update password");
      });
    navigate("/");
  }

  return (
    <div className="relative min-h-screen overflow-hidden w-full bg-[url('/bg.jpg')] bg-cover bg-center flex items-center justify-center p-6 ">
      {/* Soft layered overlays */}
      <div className="absolute inset-0 bg-secondary/70" />
      <div className="absolute inset-0 bg-gradient-to-tr from-accent/30 via-transparent to-primary/20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(250,243,225,0.16),transparent_25%)]" />
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8">
        {/* LEFT CARD */}
        <div className="bg-white/40 backdrop-blur-lg rounded-3xl shadow-2xl p-8 animate-fadeIn">
          <h2 className="text-2xl font-bold text-secondary mb-6">
            Profile Settings
          </h2>

          {/* PROFILE IMAGE */}
          <div className="flex justify-center mb-8">
            <div className="relative group">
              <img
                src={
                  image
                    ? URL.createObjectURL(image)
                    : user?.image ||
                      "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                }
                className="w-28 h-28 rounded-full object-cover border-4 border-accent shadow-lg"
              />

              <label className="absolute bottom-0 right-0 bg-accent text-white p-2 rounded-full cursor-pointer shadow-md hover:scale-105 transition">
                +
                <input
                  type="file"
                  hidden
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </label>
            </div>
          </div>

          <div className="grid gap-5">
            <div>
              <p className="text-sm text-secondary mb-1 font-medium">
                First Name
              </p>
              <input
                type="text"
                placeholder="Enter your first name"
                className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-accent outline-none transition placeholder-secondary/40"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <div>
              <p className="text-sm text-secondary mb-1 font-medium">
                Last Name
              </p>
              <input
                type="text"
                placeholder="Enter your last name"
                className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-accent outline-none transition placeholder-secondary/40"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>

          <button
            onClick={updateUserData}
            className="mt-8 w-full bg-accent text-white py-3 rounded-xl font-semibold shadow-lg hover:brightness-110 transition"
          >
            Save Profile Changes
          </button>
        </div>

        {/* RIGHT CARD */}
        <div className="bg-white/40 backdrop-blur-xl rounded-3xl shadow-2xl p-8 animate-fadeIn">
          <h2 className="text-2xl font-bold text-secondary mb-6">
            Change Password
          </h2>

          <div className="space-y-5">
            <div>
              <p className="text-sm text-secondary mb-1 font-medium">
                New Password
              </p>
              <input
                type="password"
                placeholder="Enter new password"
                className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-accent outline-none transition placeholder-secondary/40"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div>
              <p className="text-sm text-secondary mb-1 font-medium">
                Confirm Password
              </p>
              <input
                type="password"
                placeholder="Re-enter new password"
                className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-accent outline-none transition placeholder-secondary/40"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            onClick={updatePassword}
            className="mt-8 w-full bg-secondary text-white py-3 rounded-xl font-semibold shadow-lg hover:brightness-110 transition"
          >
            Update Password
          </button>
        </div>
      </div>
    </div>
  );
}
