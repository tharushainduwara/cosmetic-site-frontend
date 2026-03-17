import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export default function SubscribeForm() {
  const [email, setEmail] = useState("");

  async function handleSubscribe(e) {
    e.preventDefault();

    try {
await axios.post(`${import.meta.env.VITE_API_URL}/api/subscribe`, { email });
      toast.success("Subscribed successfully");
      setEmail("");
    } catch (err) {
      console.error("Error subscription", err);
      toast.error("Subscription failed");
    }
  }

  return (
    <form
      onSubmit={handleSubscribe}
      className="flex flex-col sm:flex-row gap-4 mt-4 w-full max-w-md"
    >
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 px-10 py-3 rounded-sm border border-secondary/30 focus:outline-none focus:ring-2 focus:ring-accent transition"
        required
      />
      <button
        type="submit"
        className="px-6 py-3 bg-accent text-white rounded-sm font-semibold hover:scale-105 hover:shadow-lg transition duration-300"
      >
        Subscribe
      </button>
    </form>
  );
}
