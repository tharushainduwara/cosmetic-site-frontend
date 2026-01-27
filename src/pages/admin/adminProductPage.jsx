import axios from "axios";
import { useEffect, useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { CiCirclePlus } from "react-icons/ci";
import { Link } from "react-router-dom";

export default function AdminProductPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_API_URL + "/api/products")
      .then((response) => {
        console.log(response.data);
        setProducts(response.data);
      });
  }, []);

  return (
    <div className="w-full min-h-full bg-primary/40 p-4 sm:p-6">
      {/* Page Header */}
      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-secondary">
            Products
          </h1>
          <p className="text-sm text-secondary/70">
            Manage your catalog: view, edit, and remove products.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="inline-flex items-center rounded-full border border-secondary/10 bg-white/70 px-4 py-2 text-sm text-secondary shadow-sm">
            <span className="mr-2 inline-block h-2 w-2 rounded-full bg-accent" />
            Total:{" "}
            <span className="ml-1 font-semibold text-secondary">
              {products.length}
            </span>
          </div>
        </div>
      </div>

      {/* Table Card */}
      <div className="rounded-2xl border border-secondary/10 bg-white/70 backdrop-blur-xl shadow-[0_20px_60px_-35px_rgba(0,0,0,0.35)] overflow-hidden">
        {/* Scroll wrapper */}
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[900px] text-left">
            <thead className="sticky top-0 z-10 bg-white/80 backdrop-blur">
              <tr className="text-xs uppercase tracking-wider text-secondary/70">
                <th className="px-5 py-4 font-semibold">Image</th>
                <th className="px-5 py-4 font-semibold">Product ID</th>
                <th className="px-5 py-4 font-semibold">Product Name</th>
                <th className="px-5 py-4 font-semibold">Price</th>
                <th className="px-5 py-4 font-semibold">Label Price</th>
                <th className="px-5 py-4 font-semibold">Category</th>
                <th className="px-5 py-4 font-semibold text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-secondary/10">
              {products.map((item) => {
                return (
                  <tr
                    key={item.productID}
                    className="group hover:bg-primary/35 transition-colors"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-xl overflow-hidden border border-secondary/10 bg-white shadow-sm">
                          <img
                            src={item.images[0]}
                            className="w-full h-full object-cover"
                            alt={item.name}
                          />
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <span className="inline-flex items-center rounded-full border border-secondary/10 bg-white px-3 py-1 text-sm text-secondary shadow-sm">
                        {item.productID}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex flex-col">
                        <span className="font-semibold text-secondary">
                          {item.name}
                        </span>
                        <span className="text-xs text-secondary/60">
                          {item.category}
                        </span>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <span className="font-semibold text-secondary">
                        LKR {item.price}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <span className="text-secondary/80">
                        LKR {item.labelPrice}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <span className="inline-flex items-center rounded-full border border-secondary/10 bg-primary/40 px-3 py-1 text-sm text-secondary">
                        {item.category}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex flex-row gap-2 justify-center items-center">
                        <button
                          type="button"
                          className="inline-flex items-center justify-center h-10 w-10 rounded-xl border border-secondary/10 bg-white/80 shadow-sm
                                     hover:border-red-200 hover:bg-red-50 transition"
                          title="Delete"
                        >
                          <RiDeleteBin5Line className="text-lg text-secondary/70 hover:text-red-600 transition" />
                        </button>

                        <button
                          type="button"
                          className="inline-flex items-center justify-center h-10 w-10 rounded-xl border border-secondary/10 bg-white/80 shadow-sm
                                     hover:border-accent/30 hover:bg-accent/10 transition"
                          title="Edit"
                        >
                          <FiEdit className="text-lg text-secondary/70 hover:text-accent transition" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-5 py-4 text-sm text-secondary/70 border-t border-secondary/10 bg-white/60">
          <span>
            Showing{" "}
            <span className="font-semibold text-secondary">
              {products.length}
            </span>{" "}
            product(s)
          </span>
        </div>
      </div>
      <Link
        to="/admin/add-product"
        className="fixed right-[50px] bottom-[50px] text-5xl hover:text-accent"
      >
        <CiCirclePlus />
      </Link>
    </div>
  );
}
