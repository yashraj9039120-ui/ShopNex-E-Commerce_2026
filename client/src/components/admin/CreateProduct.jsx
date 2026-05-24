import React, { useEffect, useState } from "react";
import Navbar from "../../components/home/Navbar";
import Footer from "../../components/home/Footer";
import PageTitle from "../../service/page/PageTitle";
import { useDispatch, useSelector } from "react-redux";
import { createProduct, removeErrors, removeSuccess } from "../../redux/admin/adminSlice";
import { toast } from "react-toastify";
import {
  Upload,
  Image as ImageIcon,
  X,
  Plus,
  DollarSign,
  Package,
  FileText,
  Tag,
  Loader,
} from "react-feather";

function CreateProduct() {
  const { success, loading, error } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);

  const categories = ["Glass", "Shirt", "Mobile", "Dress", "TV", "Pant", "Jacket","Laptop","Fruits"];

  const createProductSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("stock", stock);
    image.forEach((img) => {
      myForm.append("image", img);
    });
    dispatch(createProduct(myForm));
  };

  const createProductImage = (e) => {
    const files = Array.from(e.target.files);
    handleFiles(files);
  };

  const handleFiles = (files) => {
    setImage([]);
    setImagePreview([]);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagePreview((old) => [...old, reader.result]);
          setImage((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  useEffect(() => {
    if (error) {
      toast.error(error, { position: "top-center", autoClose: 3000 });
      dispatch(removeErrors());
    }
    if (success) {
      toast.success(" Product Created Successfully!", { position: "top-center", autoClose: 3000 });
      setName("");
      setPrice("");
      setDescription("");
      setCategory("");
      setStock("");
      setImage([]);
      setImagePreview([]);
      dispatch(removeSuccess());
    }
  }, [dispatch, error, success]);

  return (
    <>
    
     < Navbar  />
   
     
      <PageTitle title="Create Product" />

      <main className="min-h-screen flex items-start justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4">
        <section className="create-product-container w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <h1 className="form-title text-3xl font-bold text-center text-indigo-700 mb-8">
            Add New Product
          </h1>

          <form onSubmit={createProductSubmit} encType="multipart/form-data" className="product-form space-y-6">
            {/* Product Name */}
            <div>
              <label className="block text-gray-700 font-medium mb-2 flex items-center">
                <Tag className="mr-2 text-indigo-600" size={18} /> Product Name
              </label>
              <input
                type="text"
                required
                placeholder="Enter product name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-input w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 transition"
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-gray-700 font-medium mb-2 flex items-center">
                <DollarSign className="mr-2 text-indigo-600" size={18} /> Price (₹)
              </label>
              <input
                type="number"
                required
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="form-input w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 transition"
              />
            </div>

            {/* Stock */}
            <div>
              <label className="block text-gray-700 font-medium mb-2 flex items-center">
                <Package className="mr-2 text-indigo-600" size={18} /> Stock Quantity
              </label>
              <input
                type="number"
                required
                placeholder="Enter stock quantity"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="form-input w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 transition"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-gray-700 font-medium mb-2 flex items-center">
                <FileText className="mr-2 text-indigo-600" size={18} /> Category
              </label>
              <select
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="form-select w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 bg-white transition"
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat.toLowerCase()}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="block text-gray-700 font-medium mb-2 flex items-center">
                <FileText className="mr-2 text-indigo-600" size={18} /> Description
              </label>
              <textarea
                rows={5}
                required
                placeholder="Enter product description..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="form-input w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 transition resize-none"
              />
            </div>

            {/* Image Upload */}
            <div className="file-input-container">
              <label className="block text-gray-700 font-medium mb-2 flex items-center">
                <ImageIcon className="mr-2 text-indigo-600" size={18} /> Product Images
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                className="form-input-file block w-full border border-gray-300 rounded-lg cursor-pointer p-2 focus:ring-2 focus:ring-indigo-400"
                onChange={createProductImage}
              />

              {imagePreview.length > 0 && (
                <div className="image-preview-container mt-4 flex gap-3 overflow-x-auto">
                  {imagePreview.map((img, idx) => (
                    <div
                      key={idx}
                      className="relative w-24 h-24 rounded-lg shadow-md border border-gray-200 overflow-hidden group"
                    >
                      <img
                        src={img}
                        alt={`Preview ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setImagePreview(imagePreview.filter((_, i) => i !== idx));
                          setImage(image.filter((_, i) => i !== idx));
                        }}
                        className="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="submit-btn w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-semibold rounded-lg shadow-md transition flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader className="animate-spin" size={20} />
                  Creating Product...
                </>
              ) : (
                <>
                  <Plus size={20} />
                  Create Product
                </>
              )}
            </button>
          </form>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default CreateProduct;
