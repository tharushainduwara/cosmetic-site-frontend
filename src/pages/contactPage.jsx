import { useNavigate } from "react-router-dom";
import SubscribeForm from "../components/subscribeForm";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function ContactPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
  e.preventDefault();

  try {

    await axios.post(import.meta.env.VITE_API_URL + "/api/contact", {
      name,
      email,
      message,
    });

    toast.success("Message sent successfully");

    setName("");
    setEmail("");
    setMessage("");

  } catch (err) {
    console.error("Failed to submit the user data",(err))
    toast.error("Failed to send message");

  }
}

  return (
    <div className="w-full min-h-[calc(100vh-100px)] bg-primary relative overflow-hidden text-secondary">
      {/* PREMIUM BACKGROUND (same as AboutPage) */}
      <div className="pointer-events-none absolute -top-40 -right-40 h-96 w-96 rounded-full bg-accent/20 blur-3xl"></div>
      <div className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-secondary/10 blur-3xl"></div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/10"></div>

      {/* PAGE CONTENT */}
      <div className="relative z-10">
        {/* HERO */}
        <section className="max-w-6xl mx-auto px-6 pt-24 pb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>

          <p className="text-secondary/80 max-w-xl mx-auto">
            Have questions about our beauty products or need assistance? Our
            team is here to help you with anything you need.
          </p>
        </section>

        {/* CONTACT SECTION */}
        <section className="max-w-6xl mx-auto px-6 pb-24 grid md:grid-cols-2 gap-12">
          {/* CONTACT FORM */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-lg">
            <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-white/10 border border-secondary/20 rounded-xl px-4 py-3 focus:outline-none focus:border-accent"
              />

              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/10 border border-secondary/20 rounded-xl px-4 py-3 focus:outline-none focus:border-accent"
              />

              <textarea
                rows="4"
                placeholder="Your Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="bg-white/10 border border-secondary/20 rounded-xl px-4 py-3 focus:outline-none focus:border-accent"
              />

              <button
                type="submit"
                className="bg-accent text-white py-3 rounded-xl font-semibold hover:opacity-90 transition"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* CONTACT INFO */}
          <div className="flex flex-col gap-6">
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
              <h3 className="font-semibold text-lg mb-1">📍 Address</h3>
              <p className="text-secondary/80">
                123 Beauty Street, Colombo, Sri Lanka
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
              <h3 className="font-semibold text-lg mb-1">📞 Phone</h3>
              <p className="text-secondary/80">+94 71 234 5678</p>
            </div>

            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
              <h3 className="font-semibold text-lg mb-1">✉ Email</h3>
              <p className="text-secondary/80">support@beautyshop.com</p>
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="py-20 px-6 border-t border-secondary/20">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-2">Stay in the Glow</h3>

              <p className="text-secondary/80">
                Subscribe to receive beauty tips, new collections, and exclusive
                offers.
              </p>
            </div>

            <SubscribeForm />
          </div>
        </section>

        {/* FOOTER */}
        <footer className="relative bg-secondary p-10 text-white">
          <div className="grid md:grid-cols-3 gap-16 max-w-6xl mx-auto w-full">
            <div>
              <h4 className="font-semibold mb-4">Products</h4>
              <ul className="space-y-2">
                <li className="hover:text-accent cursor-pointer">Skincare</li>
                <li className="hover:text-accent cursor-pointer">Makeup</li>
                <li className="hover:text-accent cursor-pointer">Fragrance</li>
                <li
                  className="hover:text-accent cursor-pointer"
                  onClick={() => navigate("/products")}
                >
                  All Products
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li className="hover:text-accent cursor-pointer">
                  <a onClick={() => navigate("/about")}>About</a>
                </li>
                <li className="hover:text-accent cursor-pointer">
                  <a onClick={()=> navigate("/terms")}>Terms & Conditions</a>
                </li>
                <li className="hover:text-accent cursor-pointer">
                  <a onClick={()=> navigate("/terms")}>Privacy Policy</a>
                </li>
                <li className="hover:text-accent cursor-pointer">Contact</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <div className="flex gap-4">
                <a className="hover:text-accent cursor-pointer">Facebook</a>
                <a className="hover:text-accent cursor-pointer">Twitter</a>
                <a className="hover:text-accent cursor-pointer">Instagram</a>
              </div>
            </div>
          </div>

          <div className="border-t border-primary/20 mt-10 pt-6 text-center text-primary text-sm">
            © {new Date().getFullYear()} Beauty Shop. All rights reserved.
          </div>
        </footer>
      </div>
    </div>
  );
}




