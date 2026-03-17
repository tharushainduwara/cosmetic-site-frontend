import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/productCard";
import SubscribeForm from "../components/subscribeForm";
import Footer from "../components/footer";

export default function LandingPage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await axios.get(
          import.meta.env.VITE_API_URL + "/api/products"
        );

        setProducts(res.data.slice(0, 4));
      } catch {
        console.log("Failed to load landing products");
      }
    }

    loadProducts();
  }, []);

  return (
    <div className="w-full text-secondary bg-primary relative overflow-hidden">

      {/* PREMIUM BACKGROUND (same as AboutPage) */}
      <div className="pointer-events-none absolute -top-40 -right-40 h-96 w-96 rounded-full bg-accent/20 blur-3xl"></div>
      <div className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-secondary/10 blur-3xl"></div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/10"></div>

      {/* HERO SECTION */}
      <section
        className="min-h-[calc(100vh-100px)] flex items-center justify-center px-6
        bg-[url('/landpage.jpg')] bg-contain bg-fixed bg-center relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/25 to-transparent"></div>

        <div className="relative max-w-7xl w-full grid md:grid-cols-2 items-center">
          <div></div>

          <div className="flex flex-col gap-6 text-white p-8 rounded-3xl bg-white/10 backdrop-blur-md shadow-xl">
            <span className="inline-block px-4 py-1 text-sm tracking-wide text-accent bg-white/90 rounded-full font-medium">
              Premium Beauty Collection
            </span>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Luxury <span className="text-accent">Cosmetics</span>
            </h1>

            <h2 className="text-xl md:text-2xl font-medium text-white/90">
              Elevate Your Natural Beauty
            </h2>

            <p className="text-lg md:text-xl text-white/85 max-w-xl">
              Discover premium skincare and beauty essentials crafted with
              high-quality ingredients to bring elegance, glow, and confidence
              to your everyday routine.
            </p>

            <div className="flex flex-wrap gap-4 text-sm text-white/80">
              <span className="bg-white/10 px-3 py-1 rounded-full">
                🌿 Natural Ingredients
              </span>
              <span className="bg-white/10 px-3 py-1 rounded-full">
                ✨ Long-Lasting Beauty
              </span>
              <span className="bg-white/10 px-3 py-1 rounded-full">
                💎 Luxury Quality
              </span>
            </div>

            <div className="flex gap-6 flex-wrap mt-2">
              <button
                onClick={() => navigate("/products")}
                className="px-8 py-3 bg-accent text-white rounded-xl hover:scale-105 hover:shadow-xl transition duration-300"
              >
                Shop Now
              </button>

              <button
                onClick={() => navigate("/products")}
                className="px-8 py-3 border border-white text-white rounded-xl hover:bg-white hover:text-secondary transition duration-300"
              >
                Browse Products
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="py-28 px-6 relative">
        <div className="max-w-7xl mx-auto relative">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14 gap-6">
            <div>
              <p className="text-accent font-semibold tracking-wide mb-2">
                Featured Collection
              </p>

              <h2 className="text-3xl md:text-4xl font-bold">
                Featured Products
              </h2>

              <div className="w-16 h-1 bg-accent mt-3 rounded-full"></div>
            </div>

            <button
              onClick={() => navigate("/products")}
              className="group flex items-center gap-2 text-accent font-semibold hover:gap-3 transition-all duration-300"
            >
              View All
              <span className="group-hover:translate-x-1 transition">→</span>
            </button>
          </div>

          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((item) => (
              <div
                key={item.productID}
                className="cursor-pointer transform hover:-translate-y-2 transition-all duration-300"
              >
                <ProductCard product={item} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MISSION SECTION */}
      <section className="py-28 px-6 relative">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-accent font-semibold tracking-wide mb-2">
            Our Promise
          </p>

          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            Experience Beauty Like Never Before
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-lg hover:shadow-2xl transition">
              <div className="text-4xl mb-4">💎</div>
              <h3 className="text-xl font-semibold mb-2">Premium Ingredients</h3>
              <p className="text-secondary/80">
                Only the finest natural and luxurious ingredients.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-lg hover:shadow-2xl transition">
              <div className="text-4xl mb-4">✨</div>
              <h3 className="text-xl font-semibold mb-2">Long-Lasting Glow</h3>
              <p className="text-secondary/80">
                Maintain elegance and radiance throughout your day.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-lg hover:shadow-2xl transition">
              <div className="text-4xl mb-4">🌿</div>
              <h3 className="text-xl font-semibold mb-2">
                Dermatologist Tested
              </h3>
              <p className="text-secondary/80">
                Safe, skin-friendly, and tested for the best experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
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
      <Footer/>


    </div>
  );
}