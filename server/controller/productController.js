import Product from "../models/productModel.js";
import HandleError from "../utils/handleError.js";
import handleAsyncError from "../middleware/handleAsyncError.js";
import APIFunctionality from "../utils/apiFunctionality.js";
import { v2 as cloudinary } from "cloudinary";

// ====================== CREATE PRODUCT ======================
export const createProducts = handleAsyncError(async (req, res, next) => {
  let image = [];
  if (typeof req.body.image === "string") {
    image.push(req.body.image);
  } else {
    image = req.body.image;
  }

  const imageLinks = [];
  for (let i = 0; i < image.length; i++) {
    const result = await cloudinary.uploader.upload(image[i], {
      folder: "products",
    });
    imageLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.image = imageLinks;
  req.body.user = req.user.id;

  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});

// ====================== GET ALL PRODUCTS (FIXED) ======================
export const getAllProducts = handleAsyncError(async (req, res, next) => {
  const resultsPerPage = 8;

  const apiFeatures = new APIFunctionality(Product.find(), req.query)
    .search()
    .filter();

  // Get total count
  const filteredQuery = apiFeatures.query.clone();
  const productCount = await filteredQuery.countDocuments();

  // Apply pagination
  apiFeatures.pagination(resultsPerPage);
  const products = await apiFeatures.query;

  res.status(200).json({
    success: true,
    products: products || [],
    productCount,
    resultsPerPage,
    totalPages: Math.ceil(productCount / resultsPerPage),
    currentPage: Number(req.query.page) || 1,
  });
});

// ====================== UPDATE PRODUCT ======================
export const updateProduct = handleAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new HandleError("Product Not Found", 404));
  }

  let images = [];
  if (typeof req.body.image === "string") {
    images.push(req.body.image);
  } else if (Array.isArray(req.body.image)) {
    images = req.body.image;
  }

  if (images.length > 0) {
    // Delete old images
    for (let i = 0; i < product.image.length; i++) {
      await cloudinary.uploader.destroy(product.image[i].public_id);
    }

    const imageLinks = [];
    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.uploader.upload(images[i], {
        folder: "products",
      });
      imageLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }
    req.body.image = imageLinks;
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

// ====================== DELETE PRODUCT ======================
export const deleteProduct = handleAsyncError(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) {
    return next(new HandleError("Product Not Found", 404));
  }

  for (let i = 0; i < product.image.length; i++) {
    await cloudinary.uploader.destroy(product.image[i].public_id);
  }

  res.status(200).json({
    success: true,
    message: "Product Deleted successfully",
  });
});

// ====================== GET SINGLE PRODUCT ======================
export const getSingleProduct = handleAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new HandleError("Product Not Found", 404));
  }
  res.status(200).json({
    success: true,
    product,
  });
});

// ====================== REVIEWS ======================
export const createReviewForProduct = handleAsyncError(async (req, res, next) => {
  const { rating, comment, productId } = req.body;
  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);
  if (!product) {
    return next(new HandleError("Product not found", 400));
  }

  const reviewExists = product.reviews.find(
    (rev) => rev.user.toString() === req.user.id.toString()
  );

  if (reviewExists) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user.id.toString()) {
        rev.rating = rating;
        rev.comment = comment;
      }
    });
  } else {
    product.reviews.push(review);
  }

  product.numOfReviews = product.reviews.length;
  let sum = 0;
  product.reviews.forEach((rev) => sum += rev.rating);
  product.ratings = product.reviews.length > 0 ? sum / product.reviews.length : 0;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    product,
  });
});

export const getProductReviews = handleAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.id);
  if (!product) {
    return next(new HandleError("Product not found", 400));
  }
  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

export const deleteReview = handleAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);
  if (!product) {
    return next(new HandleError("Product not found", 400));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let sum = 0;
  reviews.forEach((rev) => sum += rev.rating);

  const ratings = reviews.length > 0 ? sum / reviews.length : 0;
  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    { reviews, ratings, numOfReviews },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    success: true,
    message: "Review Deleted Successfully",
  });
});

export const getAdminProducts = handleAsyncError(async (req, res, next) => {
  const products = await Product.find();
  res.status(200).json({
    success: true,
    products,
  });
});