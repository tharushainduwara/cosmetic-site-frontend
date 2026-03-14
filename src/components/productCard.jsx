import { Link } from "react-router-dom";

export default function ProductCard(props) {
  const product = props.product;

  return (
    <div
      className="group relative flex flex-col w-[300px] h-[420px] m-4 rounded-3xl overflow-hidden
                    border border-white/25 bg-white/10 backdrop-blur-xl
                    shadow-[0_12px_40px_rgba(0,0,0,0.18)]
                    hover:shadow-[0_18px_60px_rgba(0,0,0,0.25)]
                    transition-all duration-300 hover:-translate-y-2"
    >
      {/* Soft glow + luxury gradient (visual only) */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-52 w-52 rounded-full bg-accent/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-52 w-52 rounded-full bg-secondary/10 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/20 via-white/5 to-black/10" />

      {/* Image */}
      <div className="relative w-full h-[250px] overflow-hidden">
        <img
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          src={product.images[0]}
        />

        {/* Gloss highlight */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/30 opacity-70" />

        {/* Category pill */}
        <div
          className="absolute top-3 left-3 rounded-full border border-white/30 bg-white/15 backdrop-blur-md px-3 py-1
                        text-[11px] font-medium text-accent/70 shadow-sm"
        >
          {product.category}
        </div>
      </div>

      {/* Content */}
      <div className="relative flex flex-col flex-grow p-5">
        <h1 className="text-[16px] font-semibold tracking-tight text-secondary line-clamp-2">
          {product.name}
        </h1>

        <div className="mt-2">
          {product.labelPrice > product.price ? (
            <div className="flex gap-3 items-end">
              <p className="text-[13px] text-secondary/60 font-medium line-through">
                LKR {product.labelPrice.toFixed(2)}
              </p>
              <p className="text-[20px] text-accent font-bold tracking-tight">
                LKR {product.price.toFixed(2)}
              </p>
            </div>
          ) : (
            <p className="text-[20px] text-accent font-bold tracking-tight">
              LKR {product.price.toFixed(2)}
            </p>
          )}
        </div>

        <p className="mt-2 text-[12px] text-secondary/55">
          ID: {product.productID}
        </p>

        {/* Luxury divider */}
        <div className="my-4 h-px w-full bg-gradient-to-r from-transparent via-white/30 to-transparent" />

        {/* Button */}
        <Link to={"/overview/"+product.productID}
          className="mt-auto w-full rounded-2xl py-2.5 font-medium
                     border border-white/35 bg-white/15 backdrop-blur-md
                     text-secondary shadow-sm text-center
                     transition-all duration-300
                     hover:bg-accent hover:text-white hover:border-accent
                     active:scale-[0.98]"
        >
          View Product
        </Link>
      </div>
    </div>
  );
}
