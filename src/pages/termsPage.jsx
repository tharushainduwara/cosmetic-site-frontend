import SubscribeForm from "../components/subscribeForm";
import Header from "../components/header";
import Footer from "../components/footer";

export default function TermsPage() {

  // Section data
  const sections = [
    { id: "acceptance", title: "Acceptance of Terms" },
    { id: "use-of-services", title: "Use of Services" },
    { id: "intellectual-property", title: "Intellectual Property" },
    { id: "privacy", title: "Privacy" },
    { id: "changes", title: "Changes to Terms" },
    { id: "contact", title: "Contact" },
  ];

  return (
    <div className="w-full min-h-[calc(100vh-100px)] bg-primary relative overflow-hidden text-secondary">
        <Header/>
      {/* Background effects */}
      <div className="pointer-events-none absolute -top-40 -right-40 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-secondary/10 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/10" />

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 p-10">

        {/* Main Content */}
        <div className="flex-1 bg-white/70 backdrop-blur-xl rounded-2xl border border-secondary/20 p-8 sm:p-12 shadow-[0_20px_60px_-35px_rgba(0,0,0,0.35)]">
          <h1 className="text-3xl sm:text-4xl font-bold mb-6">Terms & Conditions</h1>
          <p className="text-secondary/70 text-sm sm:text-base mb-8">
            Please read these terms and conditions carefully before using our website. By accessing or using our site, you agree to comply with and be bound by the following terms.
          </p>

          {/* Sections */}
          {sections.map((sec) => (
            <section key={sec.id} id={sec.id} className="mb-8 scroll-mt-20">
              <h2 className="text-xl sm:text-2xl font-semibold mb-2">{sec.title}</h2>
              <p className="text-secondary/80 text-sm sm:text-base">
                {sec.id === "acceptance" &&
                  "By accessing this website, you agree to be bound by these terms and conditions. If you do not agree, please do not use our services."}
                {sec.id === "use-of-services" &&
                  "You may use our services only for lawful purposes and in accordance with these terms. Any misuse may result in suspension or termination of your account."}
                {sec.id === "intellectual-property" &&
                  "All content, including text, images, and logos, are the property of Beauty Shop and protected by intellectual property laws. Unauthorized use is prohibited."}
                {sec.id === "privacy" &&
                  "We value your privacy. Please refer to our Privacy Policy for details on how we collect and use your data."}
                {sec.id === "changes" &&
                  "We may update these terms from time to time. Continued use of the site signifies acceptance of any changes."}
                {sec.id === "contact" &&
                  <>For questions about these terms, please <a href="/contact" className="text-accent underline">contact us</a>.</>}
              </p>
            </section>
          ))}
        </div>

      </div>

        {/* CTA SECTION */}
        <section className="py-20 px-6 border-t border-secondary/20">

          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">

            <div>
              <h3 className="text-3xl font-bold mb-2">
                Stay in the Glow
              </h3>

              <p className="text-secondary/80">
                Subscribe to receive beauty tips, new collections, and exclusive
                offers.
              </p>
            </div>

            <SubscribeForm />

          </div>

        </section>

        <Footer/>

    </div>
  );
}