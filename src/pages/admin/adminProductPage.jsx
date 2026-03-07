import axios from "axios";
import { useEffect, useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { CiCirclePlus } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { GrClose } from "react-icons/gr";
import toast from "react-hot-toast";
import { Loader } from "../../components/loader";

function ProductDeleteConfirm(props) {
  const productID = props.productID;
  const close = props.close;
  const refresh = props.refresh;
  function deleteProduct() {
    const token = localStorage.getItem("token");
    axios
      .delete(import.meta.env.VITE_API_URL + "/api/products/" + productID, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        close();
        toast.success("Product deleted successfully");
        refresh();
      })
      .catch(() => {
        toast.error("Failed to delete product");
      });
  }

  return (
    <div className="flex justify-center items-center fixed left-0 top-0 w-full h-screen bg-[#00000050] z-[100]">
      <div className=" bg-primary gap-[20px] flex flex-col justify-center items-center w-[80%] sm:w-[500px] h-[200px] bg-white relative rounded-2xl border-2 border-accent">
        <button
          onClick={close}
          className="absolute right-[-40px] top-[-40px] w-[30px] h-[30px] bg-red-500 rounded-full text-white flex justify-center items-center border border-red-600 hover:bg-white hover:text-red-600"
        >
          <GrClose />
        </button>
        <p className="text-xl font-semibold">
          Are you sure? You want to delete the product with Product ID:
          {productID}?
        </p>
        <div className="flex gap-[40px]">
          <button
            onClick={close}
            className="w-[100px] p-[10px] bg-white text-secondary  rounded-4xl border border-accent hover:bg-accent hover:text-white"
          >
            Cancel
          </button>
          <button
            onClick={deleteProduct}
            className="w-[100px] p-[10px] bg-white text-secondary rounded-4xl border border-accent hover:bg-accent hover:text-white"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminProductPage() {
  const [products, setProducts] = useState([]);
  const [isDeleteConfirmVisible, setIsDeleteConfirmVisible] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) {
      axios
        .get(import.meta.env.VITE_API_URL + "/api/products")
        .then((response) => {
          console.log(response.data);
          setProducts(response.data);
          setIsLoading(false);
        });
    }
  }, [isLoading]);

  return (
    <div className="w-full min-h-full bg-primary/40 p-4 sm:p-6">
      {isDeleteConfirmVisible && (
        <ProductDeleteConfirm
          refresh={() => {
            setIsLoading(true);
          }}
          productID={productToDelete}
          close={() => {
            setIsDeleteConfirmVisible(false);
          }}
        />
      )}
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

      {/* Mobile Product Cards */}
      <div className="sm:hidden flex flex-col gap-4 p-4">
        {products.map((item) => {
          return (
            <div
              key={item.productID}
              className="bg-white rounded-xl border border-secondary/10 p-4 shadow-sm"
            >
              <div className="flex gap-4 items-center font-semibold">
                <img
                  src={item.images[0]}
                  className="w-16 h-16 rounded-lg object-cover"
                />

                <div className="flex flex-col flex-1">
                  <span className="font text-secondary">
                    {item.name}
                  </span>

                  <span className="text-xs text-secondary/60">
                    ID: {item.productID}
                  </span>

                  <span className="text-sm text-secondary/70 line-through">
                    LKR {item.labelPrice}
                  </span>

                  <span className="text-sm text-secondary">
                    LKR {item.price}
                  </span>

                  <span className="text-xs text-secondary/60">
                    Stock: {item.stock}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center mt-4">
                <span className="text-xs bg-primary/40 px-3 py-1 rounded-full">
                  {item.category}
                </span>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setProductToDelete(item.productID);
                      setIsDeleteConfirmVisible(true);
                    }}
                    className="h-9 w-9 flex items-center justify-center rounded-lg border border-secondary/10 bg-white/80 shadow-sm hover:border-red-200 hover:bg-red-50 transition"
                  >
                    <RiDeleteBin5Line className="text-lg text-secondary/70 hover:text-red-600 transition" />
                  </button>

                  <button
                    onClick={() => {
                      navigate("/admin/update-product", {
                        state: item,
                      });
                    }}
                    className="h-9 w-9 flex items-center justify-center rounded-lg border border-secondary/10 bg-white/80 shadow-sm hover:border-accent/30 hover:bg-accent/10 transition"
                  >
                    <FiEdit className="text-lg text-secondary/70 hover:text-accent transition"/>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Table Card */}
      <div className="rounded-2xl border border-secondary/10 bg-white/70 backdrop-blur-xl shadow-[0_20px_60px_-35px_rgba(0,0,0,0.35)] overflow-hidden">
        {/* Scroll wrapper */}
        <div className="hidden sm:block w-full overflow-x-auto">
          {isLoading ? (
            <Loader />
          ) : (
            <table className="w-full min-w-[900px] text-left">
              <thead className="sticky top-0 z-10 bg-white/80 backdrop-blur">
                <tr className="text-xs uppercase tracking-wider text-secondary/70">
                  <th className="px-5 py-4 font-semibold">Image</th>
                  <th className="px-5 py-4 font-semibold">Product ID</th>
                  <th className="px-5 py-4 font-semibold">Product Name</th>
                  <th className="px-5 py-4 font-semibold">Price</th>
                  <th className="px-5 py-4 font-semibold">Label Price</th>
                  <th className="px-5 py-4 font-semibold">Stock</th>
                  <th className="px-5 py-4 font-semibold">Category</th>
                  <th className="px-5 py-4 font-semibold">Actions</th>
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
                        <span className="text-secondary/80">{item.stock}</span>
                      </td>

                      <td className="px-5 py-4">
                        <span className="inline-flex items-center rounded-full border border-secondary/10 bg-primary/40 px-3 py-1 text-sm text-secondary">
                          {item.category}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex flex-row gap-2">
                          <button
                            onClick={() => {
                              setProductToDelete(item.productID);
                              setIsDeleteConfirmVisible(true);
                            }}
                            type="button"
                            className="inline-flex items-center justify-center h-10 w-10 rounded-xl border border-secondary/10 bg-white/80 shadow-sm
                                     hover:border-red-200 hover:bg-red-50 transition"
                            title="Delete"
                          >
                            <RiDeleteBin5Line className="text-lg text-secondary/70 hover:text-red-600 transition" />
                          </button>

                          <button
                            onClick={() => {
                              navigate("/admin/update-product", {
                                state: item,
                              });
                            }}
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
          )}
        </div>
      </div>

      <Link
        to="/admin/add-product"
        className="fixed bottom-[30px] text-5xl hover:text-accent"
      >
        <CiCirclePlus />
      </Link>


    </div>
  );
}
