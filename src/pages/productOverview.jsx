import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import { Loader } from "../components/loader";
import ImageSlider from "../components/imageSlider";
import { addToCart} from "../utils/cart";

export default function ProductOverview() {
  const params = useParams();
  const [status, setStatus] = useState("loading");
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_API_URL + "/api/products/" + params.id)
      .then((res) => {
        setProduct(res.data);
        setStatus("success");
      })
      .catch(() => {
        toast.error("Failed to fetch product details");
        setStatus("error");
      });
  }, []);

  return (
    <div className="w-full min-h-[calc(100vh-80px)] text-secondary relative overflow-hidden bg-primary">
      {/* Luxe background (visual only) */}
      <div className="pointer-events-none absolute -top-44 -right-44 h-[520px] w-[520px] rounded-full bg-accent/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-44 -left-44 h-[520px] w-[520px] rounded-full bg-secondary/10 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/10" />

      {status == "loading" && (
        <div className="relative flex items-center justify-center py-20">
          <Loader />
        </div>
      )}

      {status == "success" && (
        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div
            className="w-full flex flex-col lg:flex-row gap-8
                       rounded-3xl border border-white/20 bg-white/10 backdrop-blur-2xl
                       shadow-[0_18px_60px_rgba(0,0,0,0.18)] overflow-hidden"
          >
            {/* Left: Gallery */}      
            <h1 className="absolute p-8 text-2xl sm:text-3xl font-semibold tracking-tight lg:hidden">
              {product.name}
            </h1>
            <div className="w-full flex justify-center items-center p-5 sm:p-8" >             
              <div className="w-full max-w-xl relative p-15 flex justify-center items-center">
                <ImageSlider images={product.images} />
              </div>
            </div>

            {/* Right: Details */}
            <div className="w-full flex flex-col gap-4 p-6 sm:p-10">
              {/* Small top row */}
              <div className="flex items-center justify-between gap-3">
                <span
                  className="inline-flex items-center rounded-full border border-white/25 bg-white/10 backdrop-blur-md px-3 py-1
                                 text-xs font-medium text-secondary/70"
                >
                  {product.productID}
                </span>

                <span
                  className="inline-flex items-center rounded-full border border-white/25 bg-white/10 backdrop-blur-md px-3 py-1
                                 text-xs font-medium text-secondary/70"
                >
                  {product.category}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-left text-2xl sm:text-3xl font-semibold tracking-tight">
                {product.name}
                {product.altNames.map((name, index) => {
                  return (
                    <span
                      key={index}
                      className="font-normal text-secondary/60 text-base sm:text-lg"
                    >
                      {" | " + name}
                    </span>
                  );
                })}
              </h1>

              {/* Divider */}
              <div className="h-px w-full bg-gradient-to-r from-transparent via-white/30 to-transparent" />

              {/* Description */}
              <p className="text-sm sm:text-[15px] leading-7 text-secondary/80 text-justify">
                {product.description}
              </p>

              {/* Price */}
              <div className="mt-2">
                {product.labelPrice > product.price ? (
                  <div className="flex gap-3 items-end flex-wrap">
                    <p className="text-sm sm:text-base text-secondary/60 font-semibold line-through">
                      LKR {product.labelPrice.toFixed(0)}
                    </p>
                    <p className="text-2xl sm:text-3xl text-accent font-bold tracking-tight">
                      LKR {product.price.toFixed(2)}
                    </p>
                    <span
                      className="inline-flex items-center rounded-full border border-white/25 bg-accent/15 backdrop-blur-md px-3 py-1
                                     text-xs font-semibold text-accent"
                    >
                      SALE
                    </span>
                  </div>
                ) : (
                  <p className="text-2xl sm:text-3xl text-accent font-bold tracking-tight">
                    LKR {product.price.toFixed(2)}
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 sm:mt-10">
                <button
                  className="w-full h-[44px] rounded-2xl bg-accent text-white font-semibold
                                   shadow-[0_12px_26px_rgba(0,0,0,0.18)]
                                   transition-all duration-300 hover:bg-accent/85 active:scale-[0.98]"
                  onClick={() => {
                    addToCart(product, 1);
                    toast.success("Added to cart");
                  }}
                >
                  Add to Cart
                </button>

                <Link to="/checkout" state={[{
                  images : product.images[0],
                  productID : product.productID,
                  name : product.name,
                  price : product.price,
                  labelPrice : product.labelPrice,
                  quantity : 1
                }]}
                  className="w-full h-[44px] rounded-2xl border border-white/30 bg-white/10 backdrop-blur-md
                                   text-accent font-semibold flex justify-center items-center
                                   shadow-sm transition-all duration-300
                                   hover:bg-accent hover:text-white hover:border-accent
                                   active:scale-[0.98]"
                >
                  Buy Now
                </Link>
              </div>

              {/* Subtle bottom note (visual only) */}
              <p className="mt-2 text-xs text-secondary/50">
                Premium finish • Secure checkout • Fast delivery
              </p>
            </div>
          </div>
        </div>
      )}

      {status == "error" && (
        <div className="relative w-full max-w-4xl mx-auto px-4 sm:px-6 py-16">
          <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-6 text-center">
            <h1 className="text-red-400 font-semibold text-lg">
              Failed to load product details
            </h1>
            <p className="text-red-300/80 text-sm mt-1">
              Please refresh the page and try again.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
