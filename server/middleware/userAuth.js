// import handleAsyncError from "./handleAsyncError.js";
// import jwt from 'jsonwebtoken';
// import User from '../models/userModel.js';
// import HandleError from "../utils/handleError.js";

// export const verifyUserAuth=handleAsyncError(async(req , res, next)=>{
//   const {token}=req.cookies;
//   if(!token){
//     return next(new HandleError("Authentication is missing!Please login to access resource",401))
//   }
//   const decodedData=jwt.verify(token,process.env.JWT_SECRET_KEY);
//   req.user=await User.findById(decodedData.id);
//   next();
    
// })

// export const roleBasedAccess=(...roles)=>{
//   return(req, res , next)=>{
//     if(!roles.includes(req.user.role)){
//       return next(new HandleError(`Role - ${req.user.role} is not allowed to access the resource`,403))
//     }
//     next();
//   }
// }



import handleAsyncError from "./handleAsyncError.js";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import HandleError from "../utils/handleError.js";

export const verifyUserAuth = handleAsyncError(async (req, res, next) => {
  let token = req.cookies?.token;

  // Fallback: check Authorization header
  if (!token && req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new HandleError("Authentication is missing! Please login to access resource", 401)
    );
  }

  // Verify token with issuer & audience
  let decodedData;
  try {
    decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY, {
      issuer: process.env.JWT_ISSUER,
      audience: process.env.JWT_AUDIENCE,
    });
  } catch (err) {
    return next(new HandleError("Invalid or expired token", 403));
  }

  // Attach user
  req.user = await User.findById(decodedData.id);

  if (!req.user || !req.user.isActive) {
    return next(new HandleError("User not found or inactive. Please login again.", 401));
  }

  next();
});

// roleBased Access 

export const roleBasedAccess = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new HandleError(
          `Role '${req.user.role}' is not allowed to access this resource`,
          403
        )
      );
    }
    next();
  };
};
