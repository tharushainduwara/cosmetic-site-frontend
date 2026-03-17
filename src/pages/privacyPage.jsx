import { useNavigate } from "react-router-dom";
import SubscribeForm from "../components/subscribeForm";
import Header from "../components/header";

export default function PrivacyPage() {
  const navigate = useNavigate();

  // Section data
  const sections = [
    { id: "information-collection", title: "Information Collection" },
    { id: "information-use", title: "Use of Information" },
    { id: "cookies", title: "Cookies" },
    { id: "data-sharing", title: "Data Sharing" },
    { id: "security", title: "Security" },
    { id: "contact", title: "Contact" },
  ];

  return (
    <div className="w-full min-h-[calc(100vh-100px)] bg-primary relative overflow-hidden text-secondary">
      <Header />

      {/* Background effects */}
      <div className="pointer-events-none absolute -top-40 -right-40 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-secondary/10 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/10" />

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 p-10">

        {/* Main Content */}
        <div className="flex-1 bg-white/70 backdrop-blur-xl rounded-2xl border border-secondary/20 p-8 sm:p-12 shadow-[0_20px_60px_-35px_rgba(0,0,0,0.35)]">
          <h1 className="text-3xl sm:text-4xl font-bold mb-6">Privacy Policy</h1>
          <p className="text-secondary/70 text-sm sm:text-base mb-8">
            Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.
          </p>

          {/* Sections */}
          {sections.map((sec) => (
            <section key={sec.id} id={sec.id} className="mb-8 scroll-mt-20">
              <h2 className="text-xl sm:text-2xl font-semibold mb-2">{sec.title}</h2>
              <p className="text-secondary/80 text-sm sm:text-base">
                {sec.id === "information-collection" &&
                  "We collect information you provide directly to us, such as name, email, and payment details, as well as information automatically collected through cookies and site usage."}
                {sec.id === "information-use" &&
                  "Your information is used to provide services, improve user experience, send updates, and for analytics purposes."}
                {sec.id === "cookies" &&
                  "We use cookies to enhance site functionality, remember preferences, and collect analytical data. You can disable cookies in your browser settings."}
                {sec.id === "data-sharing" &&
                  "We do not sell your personal information. We may share information with trusted service providers or as required by law."}
                {sec.id === "security" &&
                  "We implement reasonable security measures to protect your data, but no system is completely secure."}
                {sec.id === "contact" &&
                  <>For questions about our privacy practices, please <a href="/contact" className="text-accent underline">contact us</a>.</>}
              </p>
            </section>
          ))}
        </div>


      </div>

      {/* CTA SECTION */}
      <section className="py-20 px-6 border-t border-secondary/20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h3 className="text-3xl font-bold mb-2">Stay in the Glow</h3>
            <p className="text-secondary/80">
              Subscribe to receive beauty tips, new collections, and exclusive offers.
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
              <li className="hover:text-accent cursor-pointer"><a onClick={()=> navigate("/about")}>About</a></li>
              <li className="hover:text-accent cursor-pointer"><a onClick={()=> navigate("/terms")}>Terms & Conditions</a></li>
              <li className="hover:text-accent cursor-pointer"><a onClick={()=> navigate("/terms")}>Privacy Policy</a></li>
              <li className="hover:text-accent cursor-pointer"><a onClick={()=> navigate("/contact")}>Contact</a></li>
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
  );
}