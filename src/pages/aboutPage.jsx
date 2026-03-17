import { useNavigate } from "react-router-dom";
import SubscribeForm from "../components/subscribeForm";
import Footer from "../components/footer";

export default function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-[calc(100vh-100px)] bg-primary relative overflow-hidden">

      {/* Premium Background Effects */}
      <div className="pointer-events-none absolute -top-40 -right-40 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-secondary/10 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/10" />

      <div className="w-full text-secondary">

        {/* HERO SECTION */}
        <section className="max-w-6xl mx-auto px-6 pt-24 pb-20 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            Beauty That Enhances Your Natural Glow
          </h1>

          <p className="max-w-2xl mx-auto text-secondary/80 text-lg leading-relaxed">
            Discover premium skincare, makeup, and fragrance collections designed
            to elevate your everyday beauty routine.
          </p>

          <button
            onClick={() => navigate("/products")}
            className="mt-8 px-6 py-3 rounded-full bg-accent text-white font-medium hover:scale-105 transition"
          >
            Explore Products
          </button>
        </section>

        {/* OUR STORY */}
        <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16 items-center">

          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-10 shadow-lg">
            <h2 className="text-3xl font-semibold mb-4">Our Story</h2>

            <p className="text-secondary/80 leading-relaxed">
              Our journey began with a vision to create a beauty destination
              where customers can discover products that truly enhance
              confidence and individuality.
            </p>

            <p className="text-secondary/80">
              We carefully curate every skincare, makeup, and fragrance item
              to ensure quality, authenticity, and a luxurious experience.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-10 shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">Our Mission</h3>

            <p className="text-secondary/80">
              To empower people to feel confident in their own skin by providing
              carefully selected beauty products and a seamless shopping
              experience.
            </p>
          </div>

        </section>

        {/* VALUES */}
        <section className="max-w-6xl mx-auto px-6 py-20">

          <h2 className="text-3xl font-semibold text-center mb-14">
            Our Values
          </h2>

          <div className="grid md:grid-cols-3 gap-10">

            <div className="p-8 rounded-2xl shadow-2xl bg-accent text-white backdrop-blur-lg border border-white/20 hover:scale-105 transition">
              <h4 className="text-xl font-semibold mb-3">Quality</h4>
              <p>
                We select products that meet the highest beauty and skincare
                standards.
              </p>
            </div>

            <div className="p-8 rounded-2xl shadow-2xl bg-accent text-white backdrop-blur-lg border border-white/20 hover:scale-105 transition">
              <h4 className="text-xl font-semibold mb-3">Trust</h4>
              <p>
                Authentic products and transparent practices build lasting
                trust.
              </p>
            </div>

            <div className="p-8 rounded-2xl  shadow-2xl bg-accent text-white backdrop-blur-lg border border-white/20 hover:scale-105 transition">
              <h4 className="text-xl font-semibold mb-3">Innovation</h4>
              <p>
                We continuously search for modern beauty solutions and trends.
              </p>
            </div>

          </div>

        </section>

        {/* WHY CHOOSE US */}
        <section className="max-w-6xl mx-auto px-6 py-20">
          <h2 className="text-3xl font-semibold text-center mb-14">
            Why Choose Us
          </h2>

          <div className="grid md:grid-cols-3 gap-12 text-center">

            <div className="space-y-3">
              <h4 className="font-semibold text-lg text-accent">Premium Products</h4>
              <p className="text-secondary/80">
                Carefully selected luxury skincare and makeup collections.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-lg text-accent">Secure Shopping</h4>
              <p className="text-secondary/80">
                Your personal data and payments are protected.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-lg text-accent">Customer Focused</h4>
              <p className="text-secondary/80">
                We prioritize customer satisfaction and support.
              </p>
            </div>

          </div>

        </section>

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
    </div>
  );
}