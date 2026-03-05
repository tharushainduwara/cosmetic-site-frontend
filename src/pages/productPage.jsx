import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ProductCard from "../components/productCard";
import { Loader } from "../components/loader";

export function ProductPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-secondary">
              Shop Products
            </h1>
            <p className="text-sm text-secondary/70">
              Discover high-end essentials curated for you.
            </p>
          </div>

          {/* Small status chip (visual only) */}
          <div className="inline-flex items-center gap-2 self-start sm:self-auto rounded-full border border-white/25 bg-white/10 backdrop-blur-md px-4 py-2 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-accent" />
            <span className="text-xs font-medium text-secondary/80">
              {products.length} items
            </span>
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <Loader />
          </div>
        ) : (
          <>
            {/* Grid (layout only) */}
            <div className="w-full h-full grid gap-6 justify-items-center
                            grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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