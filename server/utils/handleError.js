class HandleError extends Error {
  constructor(message, statusCode, details = null) {
    super(message);

    // Custom properties
    this.statusCode = statusCode || 500; // Default to 500 (Internal Server Error)
    this.details = details; // Optional extra info (e.g., validation errors, DB errors)

    // Keep stack trace clean (don’t include this constructor in the trace)
    Error.captureStackTrace(this, this.constructor);
  }
}

export default HandleError;
