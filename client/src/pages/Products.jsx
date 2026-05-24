import React, { useEffect, useState } from "react";
import PageTitle from "../service/page/PageTitle";
import Navbar from "../components/home/Navbar";
import Footer from "../components/home/Footer";
import { useDispatch, useSelector } from "react-redux";
import Product from "../components/product/Product";
import { getProduct, removeErrors } from "../redux/products/productSlice";
import Loader from "../shared/Loader";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import NoProducts from "../components/product/NoProducts";
import Pagination from "../service/page/Pagination";

function Products() {
  const { loading, error, products, resultsPerPage, productCount } = useSelector(
    (state) => state.product
  );

  const dispatch = useDispatch();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const keyword = searchParams.get("keyword");
  const category = searchParams.get("category");
  const pageFromURL = parseInt(searchParams.get("page"), 10) || 1;

  const [currentPage, setCurrentPage] = useState(pageFromURL);
  const navigate = useNavigate();

  const categories = ["laptop", "mobile", "tv", "fruits", "glass"];

  useEffect(() => {
    dispatch(getProduct({ keyword, page: currentPage, category }));
  }, [dispatch, keyword, currentPage, category]);

  useEffect(() => {
    if (error) {
      toast.error(error.message, { position: "top-center", autoClose: 3000 });
      dispatch(removeErrors());
    }
  }, [dispatch, error]);

  const handlePageChange = (page) => {
    if (page !== currentPage) {
      setCurrentPage(page);
      const newSearchParams = new URLSearchParams(location.search);
      if (page === 1) {
        newSearchParams.delete("page");
      } else {
        newSearchParams.set("page", page);
      }
      navigate(`?${newSearchParams.toString()}`);
    }
  };

  const handleCategoryClick = (cat) => {
    const newSearchParams = new URLSearchParams(location.search);
    newSearchParams.set("category", cat);
    newSearchParams.delete("page");
    navigate(`?${newSearchParams.toString()}`);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <PageTitle title="All Products" />
          <Navbar />

          {/* Layout */}
          <div className="flex flex-col md:flex-row items-start gap-6 p-5 mt-24">
            
            {/* Sidebar Filter */}
            <div className="w-full md:w-64 bg-white rounded-lg shadow-md p-5">
              <h3 className="text-lg font-semibold text-indigo-700 mb-4">
                CATEGORIES
              </h3>
              <ul className="space-y-2">
                {categories.map((cat) => (
                  <li
                    key={cat}
                    onClick={() => handleCategoryClick(cat)}
                    className={`px-3 py-2 rounded-md cursor-pointer text-sm uppercase transition-colors duration-300 ${
                      category?.toLowerCase() === cat.toLowerCase()
                        ? "bg-indigo-600 text-white font-semibold"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {cat}
                  </li>
                ))}
              </ul>
            </div>

            {/* Products Section */}
            <div className="flex-1 flex flex-col gap-6">
              {products.length > 0 ? (
                <div className="flex flex-wrap gap-6 justify-center">
                  {products.map((product) => (
                    <Product key={product._id} product={product} />
                  ))}
                </div>
              ) : (
                <NoProducts keyword={keyword} />
              )}

              {/* Pagination */}
              {productCount > resultsPerPage && (
                <div className="flex justify-center mt-6">
                  <Pagination
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                  />
                </div>
              )}
            </div>
          </div>

          <Footer />
        </>
      )}
    </>
  );
}

export default Products;


