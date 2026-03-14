import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import mediaUpload from "../../utils/mediaUpload";
import toast from "react-hot-toast";
import axios from "axios";

export default function UpdateProductPage() {
  const location = useLocation();
  const [productId, setProductId] = useState(location.state.productID);
  const [name, setName] = useState(location.state.name);
  const [altNames, setAltNames] = useState(location.state.altNames.join(","));
  const [description, setDescription] = useState(location.state.description);
  const [images, setImages] = useState([]);
  const [price, setPrice] = useState(location.state.price);
  const [labelPrice, setLabelPrice] = useState(location.state.labelPrice);
  const [category, setCategory] = useState(location.state.category);
  const [stock, setStock] = useState(location.state.stock);
  
  const navigate = useNavigate()

  async function updateProduct(){
    const token = localStorage.getItem("token");
    if(token == null){
      navigate("/login");
      return
    }
    
    const promises = []
    for(let i=0; i<images.length; i++){
      
      promises[i] = mediaUpload(images[i])

    }
    try{
      let urls =  await Promise.all(promises)

      if(urls.length == 0){
        urls = location.state.images
      }
      
      const alternativeNames = altNames.split(",")
      
      const product = {
        productID : productId,
        name : name,
        altNames : alternativeNames,
        description : description,
        images : urls,
        price : price,
        labelPrice : labelPrice,
        category : category,
        stock : stock
      }

      await axios.put(import.meta.env.VITE_API_URL + "/api/products/"+productId, product,{
        headers : {
          Authorization : "Bearer " +token
        }
      })
      toast.success("Product updated successfully")
      navigate("/admin/products")  
    
    }catch{
      toast.error("An error occured")
    }
  }

  return (
    <div className="w-full min-h-full flex justify-center items-center bg-primary px-4 py-10">
      <div className="w-full max-w-3xl">
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-secondary">
            Update Product
          </h1>
          <p className="mt-1 text-sm text-secondary/70">
            Change the product details below in your catalog.
          </p>
        </div>

        {/* Card */}
        <div className="bg-primary/60 border border-accent/30 rounded-2xl shadow-[0_20px_60px_-30px_rgba(0,0,0,0.35)] overflow-hidden">
          {/* Top accent bar */}
          <div className="h-1.5 w-full bg-accent" />

          <div className="p-5 sm:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {/* Product ID */}
              <div className="sm:col-span-1">
                <label className="block text-sm font-medium text-secondary mb-1">
                  Product ID
                </label>
                <input
                  disabled
                  value={productId}
                  onChange={(e) => {
                    setProductId(e.target.value);
                  }}
                  placeholder="e.g. PRD-0001"
                  className="w-full rounded-xl border border-secondary/15 bg-white/70 px-3.5 py-2.5 text-secondary placeholder:text-secondary/40 outline-none
                             focus:ring-2 focus:ring-accent/35 focus:border-accent/40 transition"
                />
              </div>

              {/* Name */}
              <div className="sm:col-span-1">
                <label className="block text-sm font-medium text-secondary mb-1">
                  Product Name
                </label>
                <input
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  placeholder="e.g. Rose Glow Cream"
                  className="w-full rounded-xl border border-secondary/15 bg-white/70 px-3.5 py-2.5 text-secondary placeholder:text-secondary/40 outline-none
                             focus:ring-2 focus:ring-accent/35 focus:border-accent/40 transition"
                />
              </div>

              {/* Alt Names */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-secondary mb-1">
                  Alternative Names
                </label>
                <input
                  value={altNames}
                  onChange={(e) => {
                    setAltNames(e.target.value);
                  }}
                  placeholder="Separate names with commas (e.g. Glow Cream, Rose Cream)"
                  className="w-full rounded-xl border border-secondary/15 bg-white/70 px-3.5 py-2.5 text-secondary placeholder:text-secondary/40 outline-none
                             focus:ring-2 focus:ring-accent/35 focus:border-accent/40 transition"
                />
              </div>

              {/* Description */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-secondary mb-1">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  placeholder="Write a short, clear description about the product..."
                  rows={4}
                  className="w-full resize-none rounded-xl border border-secondary/15 bg-white/70 px-3.5 py-2.5 text-secondary placeholder:text-secondary/40 outline-none
                             focus:ring-2 focus:ring-accent/35 focus:border-accent/40 transition"
                />
              </div>

              {/* Images */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-secondary mb-1">
                  Images
                </label>

                <div className="rounded-xl border border-secondary/15 bg-white/60 p-4">
                  <input
                    type="file"
                    onChange={(e) => {
                      setImages(e.target.files);
                    }}
                    multiple
                    className="block w-full text-sm text-secondary file:mr-4 file:rounded-lg file:border-0
                               file:bg-accent file:px-4 file:py-2 file:text-primary file:font-medium
                               hover:file:opacity-90 transition"
                  />
                  <p className="mt-2 text-xs text-secondary/60">
                    Upload one or more images (JPG/PNG recommended).
                  </p>
                </div>
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-medium text-secondary mb-1">
                  Price
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary/45 text-sm">
                    LKR
                  </span>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => {
                      setPrice(e.target.value);
                    }}
                    className="w-full rounded-xl border border-secondary/15 bg-white/70 pl-10 pr-3.5 py-2.5 text-secondary outline-none
                               focus:ring-2 focus:ring-accent/35 focus:border-accent/40 transition"
                  />
                </div>
              </div>

              {/* Label Price */}
              <div>
                <label className="block text-sm font-medium text-secondary mb-1">
                  Labelled Price
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary/45 text-sm">
                    LKR
                  </span>
                  <input
                    type="number"
                    value={labelPrice}
                    onChange={(e) => {
                      setLabelPrice(e.target.value);
                    }}
                    className="w-full rounded-xl border border-secondary/15 bg-white/70 pl-10 pr-3.5 py-2.5 text-secondary outline-none
                               focus:ring-2 focus:ring-accent/35 focus:border-accent/40 transition"
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-secondary mb-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                  }}
                  className="w-full rounded-xl border border-secondary/15 bg-white/70 px-3.5 py-2.5 text-secondary outline-none
                             focus:ring-2 focus:ring-accent/35 focus:border-accent/40 transition"
                >
                  <option value="Cream">Cream</option>
                  <option value="Lotion">Lotion</option>
                  <option value="Serum">Serum</option>
                  <option value="Makeup">Makeup</option>
                  <option value="Skincare">Skincare</option>
                  <option value="Gloss">Gloss</option>
                  <option value="Powder">Powder</option>
                  <option value="Eye">Eye</option>
                </select>
              </div>

              {/* Stock */}
              <div>
                <label className="block text-sm font-medium text-secondary mb-1">
                  Stock
                </label>
                <input
                  type="number"
                  value={stock}
                  onChange={(e) => {
                    setStock(e.target.value);
                  }}
                  className="w-full rounded-xl border border-secondary/15 bg-white/70 px-3.5 py-2.5 text-secondary outline-none
                             focus:ring-2 focus:ring-accent/35 focus:border-accent/40 transition"
                />
              </div>
            </div>
            {/* Footer */}
            <div className="mt-6 flex justify-end gap-[20px]">
              <button onClick={updateProduct}
                type="button"
                className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-primary
               shadow-sm hover:opacity-95 active:opacity-90 transition"
              >
                Save Product
              </button>

              <button onClick={()=>navigate("/admin/products")}
                type="button"
                className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-primary
               shadow-sm hover:opacity-95 active:opacity-90 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
