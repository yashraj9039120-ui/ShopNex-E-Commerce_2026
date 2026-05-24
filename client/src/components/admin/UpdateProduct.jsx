import React, { useEffect, useState } from "react";
import Navbar from "../../components/home/Navbar";
import PageTitle from "../../service/page/PageTitle";
import Footer from "../../components/home/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getProductDetails } from "../../redux/products/productSlice";
import {
  removeErrors,
  removeSuccess,
  updateProduct,
} from "../../redux/admin/adminSlice";
import { toast } from "react-toastify";
import {
  Tag,
  DollarSign,
  Package,
  FileText,
  Image as ImageIcon,
  Upload,
  Save,
  Loader,
  X,
} from "react-feather";

function UpdateProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState([]);
  const [oldImage, setOldImage] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  const { product } = useSelector((state) => state.product);
  const { success, error, loading } = useSelector((state) => state.admin);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { updateId } = useParams();

  const categories = [
    "mobile",
    "fruits",
    "laptop",
    "shirt",
    "shoes",
    "pants",
    "glass",
    "watch",
    "cookies",
    "pomegranate",
    "socks",
    "bag",
    "mouse",
    "headphone",
    "bucket",
    "bangle",
    "ring",
    "lcd",
    "jacket",
    "tops",
  ];

  useEffect(() => {
    dispatch(getProductDetails(updateId));
  }, [dispatch, updateId]);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setDescription(product.description);
      setCategory(product.category);
      setStock(product.stock);
      setOldImage(product.image);
    }
  }, [product]);

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

  const handleImageChange = (e) => handleFiles(Array.from(e.target.files));
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(Array.from(e.dataTransfer.files));
  };

  const updateProductSubmit = (e) => {
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
    dispatch(updateProduct({ id: updateId, formData: myForm }));
  };

  useEffect(() => {
    if (success) {
      toast.success("✅ Product Updated Successfully", {
        position: "top-center",
        autoClose: 3000,
      });
      dispatch(removeSuccess());
      navigate("/admin/products");
    }
    if (error) {
      toast.error(error, {
        position: "top-center",
        autoClose: 3000,
      });
      dispatch(removeErrors());
    }
  }, [dispatch, error, success, navigate]);

  return (
    <>
      <Navbar />
      <PageTitle title="Update Product" />

      <main className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-10">
          {/* Title */}
          <h1 className="update-product-title text-center text-3xl md:text-4xl font-bold text-gray-900 mb-10">
            Update Product
          </h1>

          <form
            onSubmit={updateProductSubmit}
            encType="multipart/form-data"
            className="update-product-form space-y-8"
          >
            {/* Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="flex items-center mb-2 text-gray-700 font-medium">
                  <Tag size={18} className="mr-2 text-indigo-500" /> Product
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Enter product name"
                  className="update-product-input w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-indigo-400"
                />
              </div>

              <div>
                <label className="flex items-center mb-2 text-gray-700 font-medium">
                  <DollarSign size={18} className="mr-2 text-indigo-500" />{" "}
                  Price (₹)
                </label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                  placeholder="Enter price"
                  className="update-product-input w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-indigo-400"
                />
              </div>

              <div>
                <label className="flex items-center mb-2 text-gray-700 font-medium">
                  <Package size={18} className="mr-2 text-indigo-500" /> Stock
                </label>
                <input
                  type="number"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  required
                  placeholder="Enter stock quantity"
                  className="update-product-input w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-indigo-400"
                />
              </div>

              <div>
                <label className="flex items-center mb-2 text-gray-700 font-medium">
                  <FileText size={18} className="mr-2 text-indigo-500" />{" "}
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                  className="update-product-select w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-indigo-400"
                >
                  <option value="">Choose Category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="flex items-center mb-2 text-gray-700 font-medium">
                <FileText size={18} className="mr-2 text-indigo-500" />{" "}
                Description
              </label>
              <textarea
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                placeholder="Enter product description"
                className="update-product-textarea w-full rounded-lg border border-gray-300 p-3 resize-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            {/* File Upload */}
            <div>
              <label className="flex items-center mb-3 text-gray-700 font-medium">
                <ImageIcon size={18} className="mr-2 text-indigo-500" /> Images
              </label>
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={(e) => {
                  e.preventDefault();
                  setIsDragging(false);
                }}
                onDrop={handleDrop}
                className={`update-product-file-input flex flex-col items-center justify-center border-2 border-dashed rounded-lg h-40 cursor-pointer transition ${
                  isDragging
                    ? "border-indigo-500 bg-indigo-50"
                    : "border-gray-300 hover:border-indigo-400 hover:bg-indigo-50"
                }`}
              >
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
                <Upload size={28} className="text-gray-400 mb-2" />
                <p className="text-gray-600">Drag & drop or click to upload</p>
              </div>
            </div>

            {/* Previews */}
            {(imagePreview.length > 0 || oldImage.length > 0) && (
              <div>
                <h3 className="text-gray-700 font-semibold mb-3">
                  Image Previews
                </h3>
                <div className="update-product-preview-wrapper grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {imagePreview.map((img, i) => (
                    <div
                      key={i}
                      className="relative group rounded-lg overflow-hidden border"
                    >
                      <img
                        src={img}
                        alt="new"
                        className="update-product-preview-image w-full h-28 object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setImagePreview(imagePreview.filter((_, idx) => idx !== i));
                          setImage(image.filter((_, idx) => idx !== i));
                        }}
                        className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  ))}

                  {oldImage.map((img, i) => (
                    <div
                      key={`old-${i}`}
                      className="rounded-lg overflow-hidden border"
                    >
                      <img
                        src={img.url}
                        alt="old"
                        className="update-product-old-image w-full h-28 object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Buttons */}
            <div className="flex justify-end gap-4 pt-6">
              <button
                type="button"
                onClick={() => navigate("/admin/products")}
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="update-product-submit-btn px-6 py-3 rounded-lg bg-indigo-600 text-white font-medium shadow hover:bg-indigo-700 transition flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader className="animate-spin" size={18} /> Updating...
                  </>
                ) : (
                  <>
                    <Save size={18} /> Update Product
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default UpdateProduct;
