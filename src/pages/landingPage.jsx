import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/productCard";

export default function LandingPage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await axios.get(
          import.meta.env.VITE_API_URL + "/api/products",
        );

        // show only first 4 products
        setProducts(res.data.slice(0, 4));
      } catch {
        console.log("Failed to load landing products");
      }
    }

    loadProducts();
  }, []);

  return (
    <div className="w-full text-secondary">
      {/* HERO SECTION */}
      <section
        className="min-h-[calc(100vh-80px)] flex items-center justify-center px-6
  bg-[url('/landpage.jpg')] bg-contain bg-fixed bg-center relative overflow-hidden"
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/25 to-transparent"></div>

        {/* Decorative Glow */}
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-accent/30 blur-3xl rounded-lg"></div>

        <div className="relative max-w-7xl w-full grid md:grid-cols-2 items-center">
          {/* Empty column for spacing */}
          <div></div>

          {/* Content */}
          <div className="flex flex-col gap-6 text-white p-8 rounded-3xl bg-white/10 backdrop-blur-md shadow-xl">
            {/* Badge */}
            <span className="inline-block px-4 py-1 text-sm tracking-wide text-accent bg-white/90 rounded-full font-medium">
              Premium Beauty Collection
            </span>

            {/* Heading */}
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Luxury <span className="text-accent">Cosmetics</span>
            </h1>

            {/* Subheading */}
            <h2 className="text-xl md:text-2xl font-medium text-white/90">
              Elevate Your Natural Beauty
            </h2>

            {/* Description */}
            <p className="text-lg md:text-xl text-white/85 max-w-xl">
              Discover premium skincare and beauty essentials crafted with
              high-quality ingredients to bring elegance, glow, and confidence
              to your everyday routine.
            </p>

            {/* Feature Tags */}
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

            {/* Buttons */}
            <div className="flex gap-6 flex-wrap mt-2">
              <button
                onClick={() => navigate("/products")}
                className="px-8 py-3 bg-accent text-white rounded-xl
          hover:scale-105 hover:shadow-xl transition duration-300"
              >
                Shop Now
              </button>

              <button
                onClick={() => navigate("/products")}
                className="px-8 py-3 border border-white text-white rounded-xl
          hover:bg-white hover:text-secondary transition duration-300"
              >
                Browse Products
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS FROM API */}
      <section className="py-28 px-6 bg-primary relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-accent/20 blur-3xl rounded-full"></div>

        <div className="max-w-7xl mx-auto relative">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14 gap-6">
            <div>
              <p className="text-accent font-semibold tracking-wide mb-2">
                Featured Collection
              </p>

              <h2 className="text-3xl md:text-4xl font-bold text-secondary">
                Featured Products
              </h2>

              <div className="w-16 h-1 bg-accent mt-3 rounded-full"></div>
            </div>

            <button
              onClick={() => navigate("/products")}
              className="group flex items-center gap-2 text-accent font-semibold
        hover:gap-3 transition-all duration-300"
            >
              View All
              <span className="group-hover:translate-x-1 transition">→</span>
            </button>
          </div>

          {/* Product Grid */}
          <div
            className="grid gap-8
      grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {products.map((item) => (
              <div
                key={item.productID}
                onClick={() => navigate(`/product/${item.productID}`)}
                className="cursor-pointer transform hover:-translate-y-2 hover:shadow-xl transition duration-300"
              >
                <ProductCard product={item} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission SECTION */}
      <section className="py-28 px-6 bg-primary relative overflow-hidden">
        {/* Decorative background glows */}
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-accent/20 blur-3xl rounded-full"></div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          {/* Section Header */}
          <p className="text-accent font-semibold tracking-wide mb-2">
            Our Promise
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-secondary">
            Experience Beauty Like Never Before
          </h2>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="group relative bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-lg hover:shadow-2xl transition duration-300 cursor-pointer">
              <div className="text-4xl mb-4">💎</div>
              <h3 className="text-xl font-semibold mb-2 text-secondary">
                Premium Ingredients
              </h3>
              <p className="text-secondary/80">
                Only the finest natural and luxurious ingredients, designed to
                nourish and protect your skin.
              </p>
            </div>

            {/* Card 2 */}
            <div className="group relative bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-lg hover:shadow-2xl transition duration-300 cursor-pointer">
              <div className="text-4xl mb-4">✨</div>
              <h3 className="text-xl font-semibold mb-2 text-secondary">
                Long-Lasting Glow
              </h3>
              <p className="text-secondary/80">
                Formulated to maintain elegance and radiance throughout your
                day, for an effortless luxurious look.
              </p>
            </div>

            {/* Card 3 */}
            <div className="group relative bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-lg hover:shadow-2xl transition duration-300 cursor-pointer">
              <div className="text-4xl mb-4">🌿</div>
              <h3 className="text-xl font-semibold mb-2 text-secondary">
                Dermatologist Tested
              </h3>
              <p className="text-secondary/80">
                Safe, skin-friendly, and tested to provide the best experience
                without compromise.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <footer className="relative bg-primary/50  text-secondary overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-6 py-20 flex flex-col gap-16">
          {/* Newsletter Section */}
          <div className="flex flex-col text-center items-center gap-4">
            <h3 className="text-3xl font-bold">Stay in the Glow</h3>
            <p className="text-secondary/80 max-w-md ">
              Subscribe to our newsletter for the latest updates, luxury
              collections, and exclusive offers.
            </p>

            <form className="flex flex-col sm:flex-row gap-4 mt-4 w-full max-w-md">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-xl border border-secondary/30 focus:outline-none focus:ring-2 focus:ring-accent transition"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-accent text-white rounded-xl font-semibold hover:scale-105 hover:shadow-lg transition duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Links Section */}
          <div className="grid sm:grid-cols-3 gap-12 text-center sm:text-left">
            <div>
              <h4 className="font-semibold mb-4">Products</h4>
              <ul className="space-y-2">
                <li className="hover:text-accent cursor-pointer transition">
                  Skincare
                </li>
                <li className="hover:text-accent cursor-pointer transition">
                  Makeup
                </li>
                <li className="hover:text-accent cursor-pointer transition">
                  Fragrance
                </li>
                <li className="hover:text-accent cursor-pointer transition" onClick={() => navigate("/products")}>
                  All Products
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li className="hover:text-accent cursor-pointer transition">
                  <a>About Us</a>
                </li>
                <li className="hover:text-accent cursor-pointer transition">
                  <a>Terms & Conditions</a>
                </li>
                <li className="hover:text-accent cursor-pointer transition">
                  <a>Privacy Policy</a>
                </li>
                <li className="hover:text-accent cursor-pointer transition">
                  Contact
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <div className="flex gap-4 justify-center sm:justify-start text-m">
                <a
                  href="#"
                  className="hover:text-accent cursor-pointer transition"
                >
                  Facebook
                </a>
                <a
                  href="#"
                  className="hover:text-accent cursor-pointer transition"
                >
                  Twitter
                </a>
                <a
                  href="#"
                  className="hover:text-accent cursor-pointer transition"
                >
                  Instagram
                </a>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-secondary/20 mt-8 pt-6 text-center text-secondary/60 text-sm">
            © {new Date().getFullYear()} Your Brand Name. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
