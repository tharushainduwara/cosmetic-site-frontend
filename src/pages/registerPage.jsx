import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function register() {
    if(password !== confirmPassword){
        toast.error("Password do not match")
        return;
    }
    try {
      await axios.post(
        import.meta.env.VITE_API_URL + "/api/users/",
        {
          email: email,
          password: password,
          firstName: firstName,
          lastName: lastName,

        },
      );
      toast.success("Registration successfull Please login.");
      navigate("/login")

    } catch (e) {
      console.log("Login Failed:", e);
      toast.error("Login Failed.Please check again");
    }
  }

  return (
    <div className="relative w-full min-h-screen bg-[url('/bg.jpg')] bg-cover bg-center">
      {/* Soft layered overlays */}
      <div className="absolute inset-0 bg-secondary/70" />
      <div className="absolute inset-0 bg-gradient-to-tr from-accent/25 via-transparent to-primary/10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(250,243,225,0.16),transparent_45%)]" />

      <div className="relative min-h-screen grid lg:grid-cols-2">
        {/* LEFT: “Aura ring” centered form */}
        <div className="flex items-center justify-center p-6">
          <div className="relative w-full max-w-md">
            {/* Aura ring */}
            <div className="absolute -inset-6 rounded-[40px] bg-[conic-gradient(from_180deg,rgba(204,86,30,0.35),rgba(250,243,225,0.16),rgba(204,86,30,0.35))] blur-2xl opacity-80" />
            <div className="absolute -inset-2 rounded-[34px] bg-white/5 border border-white/10 backdrop-blur-xl" />

            {/* Main card */}
            <div className="relative rounded-[34px] border border-white/15 bg-white/10 backdrop-blur-2xl shadow-[0_30px_120px_-60px_rgba(0,0,0,0.9)] overflow-hidden">
              {/* Header */}
              <div className="px-9 pt-9 pb-6">
                <div className="lg:hidden flex items-center justify-center mb-5">
                  <div className="w-14 h-14  shadow-xl flex items-center justify-center">
                    <img
                      src="/logo.png"
                      alt="Beauty Shop"
                      className="w-14 h-14 object-cover bg-accent"
                    />
                  </div>
                </div>

                <p className="mt-1 text-primary/70 text-sm text-center">
                  Register your account now in Beauty Shop
                </p>
              </div>

              {/* Form */}
              <div className="px-9 pb-9">
                <div className="space-y-4">
                  <div className="group">
                    <label className="block text-sm font-medium text-primary/80 mb-2">
                      Email
                    </label>
                    <div
                      className="flex items-center gap-3 h-12 rounded-2xl px-4 bg-primary/95 text-secondary
                                 border border-white/30 shadow-sm transition
                                 focus-within:border-accent focus-within:ring-4 focus-within:ring-accent/20"
                    >
                      <input
                        type="email"
                        placeholder="you@example.com"
                        autoComplete="email"
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-transparent outline-none placeholder:text-secondary/45"
                      />
                    </div>
                  </div>

                  <div className="group">
                    <label className="block text-sm font-medium text-primary/80 mb-2">
                      First Name
                    </label>
                    <div
                      className="flex items-center gap-3 h-12 rounded-2xl px-4 bg-primary/95 text-secondary
                                 border border-white/30 shadow-sm transition
                                 focus-within:border-accent focus-within:ring-4 focus-within:ring-accent/20"
                    >
                      <input
                        type="text"
                        placeholder="e.g.John"
                        autoComplete="given-name"
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full bg-transparent outline-none placeholder:text-secondary/45"
                      />
                    </div>
                  </div>

                  
                  <div className="group">
                    <label className="block text-sm font-medium text-primary/80 mb-2">
                      Last Name
                    </label>
                    <div
                      className="flex items-center gap-3 h-12 rounded-2xl px-4 bg-primary/95 text-secondary
                                 border border-white/30 shadow-sm transition
                                 focus-within:border-accent focus-within:ring-4 focus-within:ring-accent/20"
                    >
                      <input
                        type="text"
                        placeholder="e.g.Doe"
                        autoComplete="family-name"
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full bg-transparent outline-none placeholder:text-secondary/45"
                      />
                    </div>
                  </div>

                  <div className="group">
                    <label className="block text-sm font-medium text-primary/80 mb-2">
                      Password
                    </label>
                    <div
                      className="flex items-center gap-3 h-12 rounded-2xl px-4 bg-primary/95 text-secondary
                                 border border-white/30 shadow-sm transition
                                 focus-within:border-accent focus-within:ring-4 focus-within:ring-accent/20"
                    >
                      <input
                        type="password"
                        placeholder="••••••••"
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-transparent outline-none placeholder:text-secondary/45"
                      />
                    </div>
                  </div>

                  <div className="group">
                    <label className="block text-sm font-medium text-primary/80 mb-2">
                      Confirm Password
                    </label>
                    <div
                      className="flex items-center gap-3 h-12 rounded-2xl px-4 bg-primary/95 text-secondary
                                 border border-white/30 shadow-sm transition
                                 focus-within:border-accent focus-within:ring-4 focus-within:ring-accent/20"
                    >
                      <input
                        type="password"
                        placeholder="••••••••"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full bg-transparent outline-none placeholder:text-secondary/45"
                      />
                    </div>
                  </div>

                  {/* Forgot password row (UI only, no logic change) */}
                  <button
                    onClick={register}
                    className="w-full h-12 rounded-2xl bg-accent text-white font-semibold tracking-wide
                               shadow-lg shadow-accent/25 hover:brightness-110 active:brightness-95 transition
                               relative overflow-hidden"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-130%] hover:translate-x-[130%] transition duration-700" />
                    <span className="relative">Register</span>
                  </button>

                  {/* Create account row (UI only, no logic change) */}
                  <div className="pt-2 text-center text-sm text-primary/75">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="font-semibold text-primary hover:text-white transition underline underline-offset-4 decoration-white/25 hover:decoration-white/60"
                    >
                      Login to your account
                    </Link>
                  </div>
                </div>
              </div>

              {/* subtle bottom line */}
              <div className="h-1 bg-gradient-to-r from-transparent via-accent/70 to-transparent" />
            </div>
          </div>
        </div>
        {/* RIGHT: full-height brand column */}
        <div className="hidden lg:flex flex-col justify-between p-14">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 shadow-lg flex items-center justify-center">
              <img
                src="/logo.png"
                alt="Beauty Shop"
                className="w-14 h-14 object-cover bg-accent"
              />
            </div>
            <div>
              <h1 className="text-primary text-2xl font-semibold tracking-tight">
                Beauty Shop
              </h1>
              <p className="text-primary/70 text-sm">
                Shop • Skincare • Makeup
              </p>
            </div>
          </div>

          <div className="max-w-xl">
            <h2 className="text-primary text-6xl font-semibold leading-[1.05] tracking-tight">
              Ready to shop?
              <br />
              Let’s glow.
            </h2>
            <p className="mt-5 text-primary/80 text-lg leading-relaxed">
              Register & Login to add items to your cart, save favorites, and checkout
              faster with your delivery details.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-primary/80 text-sm backdrop-blur">
                Fast checkout
              </span>
              <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-primary/80 text-sm backdrop-blur">
                Track orders
              </span>
              <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-primary/80 text-sm backdrop-blur">
                Save favorites
              </span>
            </div>
          </div>

          <p className="text-primary/55 text-xs">
            © {new Date().getFullYear()} Beauty Shop • All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
