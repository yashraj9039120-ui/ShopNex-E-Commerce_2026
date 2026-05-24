// import React, { useEffect } from "react";
// import Footer from "../components/home/Footer";
// import Navbar from "../components/home/Navbar";
// import ImageSlider from "../components/home/ImageSlider";
// import Product from "../components/product/Product";
// import PageTitle from "../service/page/PageTitle";
// import Loader from "../shared/Loader";
// import { useDispatch, useSelector } from "react-redux";
// import { getProduct, removeErrors } from "../redux/products/productSlice";
// import { toast } from "react-toastify";

// function Home() {
//   const { loading, error, products } = useSelector((state) => state.product);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(getProduct({ keyword: "" }));
//   }, [dispatch]);

//   useEffect(() => {
//     if (error) {
//       toast.error(error.message, { position: "top-center", autoClose: 3000 });
//       dispatch(removeErrors());
//     }
//   }, [dispatch, error]);

//   return (
//     <>
//       {loading ? (
//         <Loader />
//       ) : (
//         <>
//           <PageTitle title="Home Page" />
//           <Navbar />

//           <ImageSlider />

//           <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-16">
//             <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 mb-8 text-center sm:text-left">
//               Trending Now
//             </h2>

//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//               {products?.map((product, index) => (
//               <Product product={product} key={product._id || index} />
//             ))}

//             </div>
//           </main>

//           <Footer />
//         </>
//       )}
//     </>
//   );
// }

// export default Home;



import React, { useEffect } from "react";
import Footer from "../components/home/Footer";
import Navbar from "../components/home/Navbar";
import ImageSlider from "../components/home/ImageSlider";
import Product from "../components/product/Product";

import PageTitle from "../service/page/PageTitle";
import Loader from "../shared/Loader";
import { useDispatch, useSelector } from "react-redux";
import { getProduct, removeErrors } from "../redux/products/productSlice";
import { toast } from "react-toastify";

function Home() {
  const { loading, error, products } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProduct({ keyword: "" }));
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error.message, { position: "top-center", autoClose: 3000 });
      dispatch(removeErrors());
    }
  }, [dispatch, error]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <PageTitle title="Home" />
          <Navbar />

          {/* Hero Slider */}
          <section className="relative">
            <ImageSlider height="500px" />
          </section>

          {/* Featured Products */}
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 mb-8 text-center md:text-left">
              Trending Products
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
              {products?.length > 0 ? (
                products.map((product, index) => (
                  <div
                    key={product._id || index}
                    // className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
                  >
                    <Product product={product} />
                  </div>
                ))
              ) : (
                <p className="text-center col-span-full text-gray-500">
                  No products available at the moment.
                </p>
              )}
            </div>
          </main>

          {/* Additional Sections (Optional) */}
          <section className="bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">
                Best Deals & Offers
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6 overflow-hidden">
                {products?.slice(0, 8).map((product, index) => (
                  <div
                    key={product._id || index}
                    // className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-300"
                  >
                    <Product product={product} />
                  </div>
                ))}
              </div>
            </div>
          </section>

          <Footer />
        </>
      )}
    </>
  );
}

export default Home;


