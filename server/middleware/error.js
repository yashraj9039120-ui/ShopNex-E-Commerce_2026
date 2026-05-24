import HandleError from "../utils/handleError.js";

const errorMiddleware = (err, req, res, next) => {
  // Default values
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // Mongoose: invalid ObjectId
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid ${err.path}: ${err.value}`;
    err = new HandleError(message, 404);
  }

  // Mongoose: duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate field value: ${Object.keys(err.keyValue)}. Please use another value.`;
    err = new HandleError(message, 400);
  }

  // Mongoose: validation error
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((val) => val.message);
    err = new HandleError(messages.join(", "), 400);
  }

  // JWT errors
  if (err.name === "JsonWebTokenError") {
    err = new HandleError("Invalid token. Please login again.", 401);
  }

  if (err.name === "TokenExpiredError") {
    err = new HandleError("Token expired. Please login again.", 401);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
    details: err.details || null, // optional extra info
  });
};

export default errorMiddleware;
