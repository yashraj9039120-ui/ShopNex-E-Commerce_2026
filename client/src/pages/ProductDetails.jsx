// import React, { useEffect, useState } from 'react';
// import '../pageStyles/ProductDetails.css'
// import PageTitle from '../components/PageTitle';
// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';
// import Rating from '../components/Rating';
// import { useDispatch, useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import { createReview, getProductDetails, removeErrors, removeSuccess } from '../features/products/productSlice';
// import { toast } from 'react-toastify';
// import Loader from '../shared/Loader';
// import { addItemsToCart, removeMessage } from '../features/cart/cartSlice';

// function ProductDetails() {
//         const [userRating,setUserRating]=useState(0);
//         const [comment ,setComment]=useState("")
//         const [quantity,setQuantity]=useState(1);
//         const [selectedImage,setSelectedImage]=useState("");
//         const handleRatingChange=(newRating)=>{
//             setUserRating(newRating) 
//         }
//        const {loading,error,product,reviewSuccess,reviewLoading}= useSelector((state)=>state.product);
       
//        const {loading:cartLoading,error:cartError,success,message,cartItems}=useSelector((state)=>state.cart);

       
//        const dispatch=useDispatch();
//        const {id}=useParams();
//        useEffect(()=>{
//         if(id){
//             dispatch(getProductDetails(id));
//         }
//         return ()=>{
//             dispatch(removeErrors())
//         }
//        },[dispatch,id])

//          useEffect(()=>{
//            if(error){
//              toast.error(error.message,{position:'top-center',autoClose:3000});
//              dispatch(removeErrors())
//            }
//            if(cartError){
//             toast.error(cartError,{position:'top-center',autoClose:3000});
//           }
//          },[dispatch,error,cartError])

//          useEffect(()=>{
//             if(success){
//               toast.success(message,{position:'top-center',autoClose:3000});
//               dispatch(removeMessage())
//             }
//           },[dispatch,success,message])

//        const decreaseQuantity=()=>{
//         if(quantity<=1){
//             toast.error('Quantity cannot be less than 1',{position:'top-center',autoClose:3000})
//             dispatch(removeErrors())
//             return;
//         }
//         setQuantity(qty=>qty-1)
//        }
//        const increaseQuantity=()=>{
//         if(product.stock<=quantity){
//             toast.error('Cannot exceed available Stock!',{position:'top-center',autoClose:3000})
//             dispatch(removeErrors())
//             return;
//         }
//         setQuantity(qty=>qty+1)
//        } 

//        const addToCart=()=>{
//         dispatch(addItemsToCart({id,quantity}))
//        }

//        const handleReviewSubmit=(e)=>{
//         e.preventDefault();
//         if(!userRating){
//             toast.error('Please Select a rating',{position:'top-center',autoClose:3000});
//             return
//         }
//         dispatch(createReview({
//             rating:userRating,
//             comment,
//             productId:id
//         }))
//        }
//        useEffect(()=>{
//         if(reviewSuccess){
//             toast.success('Review Submitted Successfully',{position:'top-center',autoClose:3000});
//             setUserRating(0);
//             setComment("");
//             dispatch(removeSuccess())
//             dispatch(getProductDetails(id))
//         }
//        },[reviewSuccess,id,dispatch])
//  useEffect(()=>{
// if(product  && product.image && product.image.length>0){
// setSelectedImage(product.image[0].url)
// }
//  },[product])
//        if(loading){
//         return(
//             <>
//             <Navbar/>
//             <Loader/>
//             <Footer/>
//             </>
//         )
//      }
//      if(error || !product){
//         return(
//             <>
// <PageTitle title="Product Details"/>
//             <Navbar/>
//             <Footer/>
//             </>
//         )
//      }
//   return (
//     <>
//     <PageTitle title={`${product.name} - Details`}/>
//     <Navbar/>
//     <div className="product-details-container">
//         <div className="product-detail-container">
//             <div className="product-image-container">
//                 <img src={selectedImage} alt={product.name} className='product-detail-image' />
//                 {product.image.length>1 && (<div className="product-thumbnails">
//                 { product.image.map((img,index)=>(
//             <img src={img.url} alt={`Thumbnail ${index+1}`} className='thumbnail-image' onClick={()=>setSelectedImage(img.url)}/>
//                 ))  }
//                 </div>)}
//             </div>

//             <div className="product-info">
//                 <h2>{product.name}</h2>
//                 <p className="product-description">{product.description}</p>
//                 <p className="product-price">Price :  {product.price}/-</p>

//                 <div className="product-rating">
//                     <Rating
//                     value={product.ratings}
//                     disabled={true}
//                     />
//                     <span className="productCardSpan">  ( {product.numOfReviews} {product.numOfReviews===1?"Review":"Reviews"} )</span>
//                 </div>

//                 <div className="stock-status">
//                     <span className={product.stock>0?`in-stock`:'out-of-stock'}>
//                     {product.stock>0?`In Stock (${product.stock} available)`:'Out of Stock'}
//                     </span>
//                 </div>

//             { product.stock>0 && (<>  <div className="quantity-controls">
//                     <span className="quantity-label">Quantity:</span>
//                     <button className="quantity-button" onClick={decreaseQuantity}>-</button>
//                     <input type="text" value={quantity} className='quantity-value' readOnly/>
//                     <button className="quantity-button" onClick={increaseQuantity}>+</button>
//                 </div>
//                 <button className="add-to-cart-btn" onClick={addToCart} disabled={cartLoading}>{cartLoading?'Adding':'Add to Cart'}</button>
//                 </>)}

//                 <form className="review-form" onSubmit={handleReviewSubmit}>
//                     <h3>Write a Review</h3>
//                     <Rating
//                     value={0}
//                     disabled={false}
//                     onRatingChange={handleRatingChange}
//                     />
//                     <textarea placeholder="Write your review here.." className="review-input" value={comment} onChange={(e)=>setComment(e.target.value)} required></textarea>
//                     <button className="submit-review-btn" disabled={reviewLoading}>{reviewLoading?'Submitting....':'Submit Review'}</button>
//                 </form>
//             </div>
//         </div>

//         <div className="reviews-container">
//             <h3>Customer Reviews</h3>
//          {product.reviews && product.reviews.length>0?  (<div className="reviews-section">
//                 {product.reviews.map((review,index)=>(
//                     <div className="review-item" key={index}>
//                     <div className="review-header">
//                         <Rating value={review.rating} disabled={true}/>
//                     </div>
//                     <p className="review-comment">{review.comment}</p>
//                     <p className="review-name">By : {review.name}</p>
//                 </div>
//                 ))}
//             </div>):(
//                 <p className="no-reviews">No reviews yet. Be the first to review this product!</p>
//             )}
//         </div>
//     </div>
//     <Footer/>
//     </>
//   )
// }

// export default ProductDetails


// import React, { useEffect, useState } from "react";
// import PageTitle from "../service/page/PageTitle";
// import Navbar from "../components/home/Navbar";
// import Footer from "../components/home/Footer";
// import Rating from "../components/user/Rating";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import {
//   createReview,
//   getProductDetails,
//   removeErrors,
//   removeSuccess,
// } from "../redux/products/productSlice";
// import { toast } from "react-toastify";
// import Loader from "../shared/Loader";
// import { addItemsToCart, removeMessage } from "../redux/cart/cartSlice";

// function ProductDetails() {
//   const [userRating, setUserRating] = useState(0);
//   const [comment, setComment] = useState("");
//   const [quantity, setQuantity] = useState(1);
//   const [selectedImage, setSelectedImage] = useState("");

//   const {
//     loading,
//     error,
//     product,
//     reviewSuccess,
//     reviewLoading,
//   } = useSelector((state) => state.product);

//   const {
//     loading: cartLoading,
//     error: cartError,
//     success,
//     message,
//   } = useSelector((state) => state.cart);

//   const dispatch = useDispatch();
//   const { id } = useParams();

//   useEffect(() => {
//     if (id) {
//       dispatch(getProductDetails(id));
//     }
//     return () => dispatch(removeErrors());
//   }, [dispatch, id]);

//   useEffect(() => {
//     if (error) {
//       toast.error(error.message, { position: "top-center", autoClose: 3000 });
//       dispatch(removeErrors());
//     }
//     if (cartError) {
//       toast.error(cartError, { position: "top-center", autoClose: 3000 });
//     }
//   }, [dispatch, error, cartError]);

//   useEffect(() => {
//     if (success) {
//       toast.success(message, { position: "top-center", autoClose: 3000 });
//       dispatch(removeMessage());
//     }
//   }, [dispatch, success, message]);

//   useEffect(() => {
//     if (reviewSuccess) {
//       toast.success("Review Submitted Successfully", {
//         position: "top-center",
//         autoClose: 3000,
//       });
//       setUserRating(0);
//       setComment("");
//       dispatch(removeSuccess());
//       dispatch(getProductDetails(id));
//     }
//   }, [reviewSuccess, id, dispatch]);

//   useEffect(() => {
//     if (product?.image?.length > 0) {
//       setSelectedImage(product.image[0].url);
//     }
//   }, [product]);

//   const decreaseQuantity = () => {
//     if (quantity <= 1) {
//       toast.error("Quantity cannot be less than 1", {
//         position: "top-center",
//         autoClose: 3000,
//       });
//       return;
//     }
//     setQuantity((qty) => qty - 1);
//   };

//   const increaseQuantity = () => {
//     if (product.stock <= quantity) {
//       toast.error("Cannot exceed available Stock!", {
//         position: "top-center",
//         autoClose: 3000,
//       });
//       return;
//     }
//     setQuantity((qty) => qty + 1);
//   };

//   const addToCart = () => {
//     dispatch(addItemsToCart({ id, quantity }));
//   };

//   const handleReviewSubmit = (e) => {
//     e.preventDefault();
//     if (!userRating) {
//       toast.error("Please Select a rating", { position: "top-center", autoClose: 3000 });
//       return;
//     }
//     dispatch(createReview({ rating: userRating, comment, productId: id }));
//   };

//   if (loading) {
//     return (
//       <>
//         <Navbar />
//         <Loader />
//         <Footer />
//       </>
//     );
//   }

//   if (error || !product) {
//     return (
//       <>
//         <PageTitle title="Product Details" />
//         <Navbar />
//         <Footer />
//       </>
//     );
//   }

//   return (
//     <>
//       <PageTitle title={`${product.name} - Details`} />
//       <Navbar />

//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-12 pt-8">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
//           {/* Left: Images */}
//           <section>
//             <div className="border rounded-2xl overflow-hidden shadow-lg">
//               <img
//                 src={selectedImage}
//                 alt={product.name}
//                 className="w-full h-96 object-cover"
//                 loading="lazy"
//               />
//             </div>

//             {product.image.length > 1 && (
//               <div className="mt-4 flex space-x-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
//                 {product.image.map((img, idx) => (
//                   <button
//                     key={idx}
//                     onClick={() => setSelectedImage(img.url)}
//                     className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
//                       selectedImage === img.url ? "border-indigo-600" : "border-gray-300"
//                     } focus:outline-none focus:ring-2 focus:ring-indigo-400`}
//                     aria-label={`Select image ${idx + 1}`}
//                   >
//                     <img
//                       src={img.url}
//                       alt={`Thumbnail ${idx + 1}`}
//                       className="w-full h-full object-cover"
//                       loading="lazy"
//                     />
//                   </button>
//                 ))}
//               </div>
//             )}
//           </section>

//           {/* Right: Info and Actions */}
//           <section className="flex flex-col">
//             <h2 className="text-3xl font-bold text-gray-900">{product.name}</h2>

//             <p className="mt-4 text-gray-600 text-justify">{product.description}</p>

//             <p className="mt-6 text-2xl text-indigo-600 font-extrabold">
//               ₹{product.price} /-
//             </p>

//             {/* Rating */}
//             <div className="mt-4 flex items-center space-x-2">
//               <Rating value={product.ratings} disabled={true} />
//               <span className="text-gray-600 text-sm">
//                 ({product.numOfReviews}{" "}
//                 {product.numOfReviews === 1 ? "Review" : "Reviews"})
//               </span>
//             </div>

//             {/* Stock Status */}
//             <p
//               className={`mt-4 font-semibold ${
//                 product.stock > 0 ? "text-green-600" : "text-red-600"
//               }`}
//               aria-live="polite"
//             >
//               {product.stock > 0
//                 ? `In Stock (${product.stock} available)`
//                 : "Out of Stock"}
//             </p>

//             {/* Quantity Controls & Add to Cart */}
//             {product.stock > 0 && (
//               <>
//                 <div className="mt-6 flex items-center space-x-4">
//                   <span className="font-semibold">Quantity:</span>
//                   <div className="flex items-center border rounded-lg overflow-hidden">
//                     <button
//                       type="button"
//                       onClick={decreaseQuantity}
//                       className="px-3 py-1 text-xl font-bold text-indigo-600 hover:bg-indigo-100 transition"
//                       aria-label="Decrease quantity"
//                     >
//                       −
//                     </button>
//                     <input
//                       type="text"
//                       value={quantity}
//                       readOnly
//                       className="w-12 text-center border-l border-r border-gray-300 focus:outline-none"
//                       aria-live="polite"
//                       aria-label="Selected quantity"
//                     />
//                     <button
//                       type="button"
//                       onClick={increaseQuantity}
//                       className="px-3 py-1 text-xl font-bold text-indigo-600 hover:bg-indigo-100 transition"
//                       aria-label="Increase quantity"
//                     >
//                       +
//                     </button>
//                   </div>
//                 </div>

//                 <button
//                   className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition focus:outline-none focus:ring-4 focus:ring-indigo-400"
//                   onClick={addToCart}
//                   disabled={cartLoading}
//                 >
//                   {cartLoading ? "Adding..." : "Add to Cart"}
//                 </button>
//               </>
//             )}

//             {/* Review Form */}
//             <form className="mt-10 space-y-6" onSubmit={handleReviewSubmit}>
//               <h3 className="text-xl font-semibold">Write a Review</h3>
//               <Rating
//                 value={userRating}
//                 disabled={false}
//                 onRatingChange={setUserRating}
//               />
//               <textarea
//                 placeholder="Write your review here..."
//                 className="w-full rounded-lg border border-gray-300 p-4 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400"
//                 value={comment}
//                 onChange={(e) => setComment(e.target.value)}
//                 required
//                 rows={5}
//                 aria-label="Review comment"
//               />
//               <button
//                 type="submit"
//                 disabled={reviewLoading}
//                 className="bg-indigo-600 text-white py-3 rounded-lg font-semibold w-full hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-400 transition"
//               >
//                 {reviewLoading ? "Submitting..." : "Submit Review"}
//               </button>
//             </form>
//           </section>
//         </div>

//         {/* Customer Reviews */}
//         <section className="mt-16 max-w-3xl mx-auto">
//           <h3 className="text-2xl font-bold mb-6">Customer Reviews</h3>
//           {product.reviews && product.reviews.length > 0 ? (
//             <div className="space-y-8">
//               {product.reviews.map((review, index) => (
//                 <article
//                   key={index}
//                   className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm"
//                 >
//                   <div className="flex items-center mb-4">
//                     <Rating value={review.rating} disabled={true} />
//                   </div>
//                   <p className="text-gray-700 mb-2">{review.comment}</p>
//                   <p className="text-sm text-gray-500 font-semibold">
//                     — {review.name}
//                   </p>
//                 </article>
//               ))}
//             </div>
//           ) : (
//             <p className="text-center text-gray-500">
//               No reviews yet. Be the first to review this product!
//             </p>
//           )}
//         </section>
//       </main>

//       <Footer />
//     </>
//   );
// }

// export default ProductDetails;



import React, { useEffect, useState } from "react";
import PageTitle from "../service/page/PageTitle";
import Navbar from "../components/home/Navbar";
import Footer from "../components/home/Footer";
import Rating from "../components/user/Rating";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  createReview,
  getProductDetails,
  removeErrors,
  removeSuccess,
} from "../redux/products/productSlice";
import { toast } from "react-toastify";
import Loader from "../shared/Loader";
import { addItemsToCart, removeMessage } from "../redux/cart/cartSlice";

function ProductDetails() {
  const [userRating, setUserRating] = useState(0);
  const [comment, setComment] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState("");

  const { loading, error, product, reviewSuccess, reviewLoading } = useSelector(
    (state) => state.product
  );
  const { loading: cartLoading, error: cartError, success, message } = useSelector(
    (state) => state.cart
  );

  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (id) dispatch(getProductDetails(id));
    return () => dispatch(removeErrors());
  }, [dispatch, id]);

  useEffect(() => {
    if (error) toast.error(error.message, { position: "top-center", autoClose: 3000 });
    if (cartError) toast.error(cartError, { position: "top-center", autoClose: 3000 });
  }, [error, cartError]);

  useEffect(() => {
    if (success) {
      toast.success(message, { position: "top-center", autoClose: 3000 });
      dispatch(removeMessage());
    }
  }, [success, message, dispatch]);

  useEffect(() => {
    if (reviewSuccess) {
      toast.success("Review Submitted Successfully", { position: "top-center", autoClose: 3000 });
      setUserRating(0);
      setComment("");
      dispatch(removeSuccess());
      dispatch(getProductDetails(id));
    }
  }, [reviewSuccess, id, dispatch]);

  useEffect(() => {
    if (product?.image?.length > 0) setSelectedImage(product.image[0].url);
  }, [product]);

  const decreaseQuantity = () =>
    quantity > 1 ? setQuantity((qty) => qty - 1) : toast.error("Quantity cannot be less than 1");
  const increaseQuantity = () =>
    product.stock > quantity
      ? setQuantity((qty) => qty + 1)
      : toast.error("Cannot exceed available Stock!");
  const addToCart = () => dispatch(addItemsToCart({ id, quantity }));
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!userRating) return toast.error("Please Select a rating");
    dispatch(createReview({ rating: userRating, comment, productId: id }));
  };

  if (loading) return <><Navbar /><Loader /><Footer /></>;
  if (error || !product) return <><PageTitle title="Product Details" /><Navbar /><Footer /></>;

  return (
    <>
      <PageTitle title={`${product.name} - Details`} />
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-12 space-y-12">

        {/* Product Section */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">

          {/* Images */}
          <section className="flex-1">
            <div className="border rounded-3xl overflow-hidden shadow-xl">
              <img src={selectedImage} alt={product.name} className="w-full h-96 object-cover" loading="lazy" />
            </div>

            {/* Thumbnails */}
            {product.image.length > 1 && (
              <div className="mt-4 flex space-x-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
                {product.image.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img.url)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === img.url
                        ? "border-indigo-600 scale-110 shadow-lg"
                        : "border-gray-300 hover:border-indigo-400"
                    }`}
                  >
                    <img src={img.url} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" loading="lazy" />
                  </button>
                ))}
              </div>
            )}
          </section>

          {/* Product Info */}
          <section className="flex-1 flex flex-col gap-4">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">{product.name}</h1>
            <p className="text-gray-600 text-justify">{product.description}</p>
            <p className="text-2xl lg:text-3xl font-extrabold text-indigo-600">₹{product.price} /-</p>

            <div className="flex items-center gap-3 mt-2">
              <Rating value={product.ratings} disabled />
              <span className="text-gray-600 text-sm">({product.numOfReviews} Reviews)</span>
            </div>

            <p className={`mt-2 font-semibold ${product.stock > 0 ? "text-green-600" : "text-red-600"}`}>
              {product.stock > 0 ? `In Stock (${product.stock})` : "Out of Stock"}
            </p>

            {/* Quantity & Add to Cart */}
            {product.stock > 0 && (
              <>
                <div className="flex items-center gap-4 mt-4">
                  <span className="font-semibold">Quantity:</span>
                  <div className="flex items-center border rounded-lg overflow-hidden">
                    <button onClick={decreaseQuantity} className="px-3 py-1 text-xl font-bold text-indigo-600 hover:bg-indigo-100 transition">−</button>
                    <input type="text" value={quantity} readOnly className="w-12 text-center border-l border-r border-gray-300 focus:outline-none" />
                    <button onClick={increaseQuantity} className="px-3 py-1 text-xl font-bold text-indigo-600 hover:bg-indigo-100 transition">+</button>
                  </div>
                </div>
                <button onClick={addToCart} disabled={cartLoading} className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition shadow-lg hover:shadow-xl focus:ring-4 focus:ring-indigo-400">
                  {cartLoading ? "Adding..." : "Add to Cart"}
                </button>
              </>
            )}

            {/* Review Form */}
            <form onSubmit={handleReviewSubmit} className="mt-8 space-y-4">
              <h2 className="text-xl font-semibold">Write a Review</h2>
              <Rating value={userRating} onRatingChange={setUserRating} />
              <textarea
                placeholder="Write your review..."
                className="w-full p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 resize-none"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
                rows={4}
              />
              <button type="submit" disabled={reviewLoading} className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition shadow hover:shadow-lg focus:ring-4 focus:ring-indigo-400">
                {reviewLoading ? "Submitting..." : "Submit Review"}
              </button>
            </form>
          </section>
        </div>

        {/* Customer Reviews */}
        <section className="space-y-8 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold">Customer Reviews</h2>
          {product.reviews && product.reviews.length > 0 ? (
            <div className="space-y-6">
              {product.reviews.map((review, idx) => (
                <div key={idx} className="border rounded-2xl p-6 bg-white shadow-md hover:shadow-xl transition">
                  <div className="flex items-center mb-2">
                    <Rating value={review.rating} disabled />
                  </div>
                  <p className="text-gray-700 mb-2">{review.comment}</p>
                  <p className="text-sm text-gray-500 font-semibold">— {review.name}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No reviews yet. Be the first to review!</p>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}

export default ProductDetails;
