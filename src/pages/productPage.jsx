import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ProductCard from "../components/productCard";
import { Loader } from "../components/loader";
import { FiSearch } from "react-icons/fi";

export function ProductPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [category, setCategory] = useState(["All"]);
  const [categories, setCategories] = useState([]);

useEffect(() => {
  async function fetchCategories() {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/products/categories`,
      );
      console.log("Categories fetched:", res.data); // ✅ debug
      setCategories(["All", ...res.data]);
    } catch (err) {
      console.error("Failed to load categories:", err); // show actual error
      toast.error("Failed to load categories");
    }
  }
  fetchCategories();
}, []);

  useEffect(() => {
    if (isLoading) {
      axios
        .get(import.meta.env.VITE_API_URL + "/api/products")
        .then((response) => {
          setProducts(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching products", error);
          setIsLoading(false);
          toast.error("Failed to load products");
        });
    }
  }, [isLoading]);

  return (
    <div className="w-full min-h-[calc(100vh-80px)] bg-primary relative overflow-hidden">
      {/* Premium background (visual only) */}
      <div className="pointer-events-none absolute -top-40 -right-40 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-secondary/10 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/10" />

      {/* Page container */}
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          {/* Left Section */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-secondary">
              Shop Products
            </h1>
            <p className="text-sm text-secondary/70">
              Discover high-end essentials curated for you.
            </p>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Enhanced Search Bar */}
            <div className="relative w-[260px] sm:w-[320px]">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary/60 text-lg" />

              <input
                type="text"
                placeholder="Search cosmetics, skincare..."
                onChange={async (e) => {
                  try {
                    if (e.target.value == "") {
                      setIsLoading(true);
                    } else {
                      const searchResult = await axios.get(
                        import.meta.env.VITE_API_URL +
                          "/api/products/search/" +
                          e.target.value,
                      );
                      setProducts(searchResult.data);
                    }
                  } catch {
                    toast.error("Search failed");
                  }
                }}
                className="w-full pl-11 pr-4 py-3
        rounded-full
        border-2 border-[#A33A3A]/30
        bg-white
        shadow-md
        text-sm
        text-secondary
        placeholder-secondary/50
        focus:outline-none
        focus:ring-2
        focus:ring-[#A33A3A]/40
        focus:border-[#A33A3A]
        transition-all duration-200"
              />
            </div>

            <div className="flex items-center gap-2 w-[150px]">
              <select
                value={category}
                onChange={async (e) => {
                  const selected = e.target.value;
                  setCategory(selected);

                  try {
                    if (selected === "All") {
                      setIsLoading(true);
                    } else {
                      const res = await axios.get(
                        import.meta.env.VITE_API_URL +
                          "/api/products/category/" +
                          selected,
                      );
                      setProducts(res.data);
                    }
                  } catch {
                    toast.error("Failed to filter by category");
                  }
                }}
                className="w-[130px] pl-5 pr-4 py-3
        rounded-full
        border-2 border-[#A33A3A]/30
        bg-white
        shadow-md
        text-sm
        text-secondary
        focus:outline-none
        focus:ring-2
        focus:ring-[#A33A3A]/40
        focus:border-[#A33A3A]
        transition-all duration-200"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Chip */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/20 backdrop-blur-md px-4 py-2 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-accent" />
              <span className="text-xs font-medium text-secondary/80">
                {products.length} items
              </span>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <Loader />
          </div>
        ) : (
          <>
            {/* Grid (layout only) */}
            <div
              className="w-full h-full grid gap-6 justify-items-center
                            grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              {products.map((item) => {
                return <ProductCard key={item.productID} product={item} />;
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
