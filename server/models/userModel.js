// import mongoose from "mongoose";
// import validator from 'validator';
// import bcryptjs from 'bcryptjs';
// import jwt from 'jsonwebtoken';
// import crypto from 'crypto';
// const userSchema=new mongoose.Schema({
//     name:{
//         type:String,
//         required:[true,"Please Enter your name"],
//         maxLength:[25,"Invalid name. Please enter a name with fewer than 25 characters"],
//         minLength:[3,"Name should contain more than 3 characters"]
//     },
//     email:{
//         type:String,
//         required:[true,"Please Enter your email"],
//         unique:true,
//         validate:[validator.isEmail,"Please enter valid email"]
//     },
//     password:{
//         type:String,
//         required:[true,"Please Enter your password"],
//         minLength:[8,"Password should be greater than 8 characters"],
//         select:false
//     },
//     avatar:{
//         public_id:{
//             type:String,
//             required:true
//         },
//         url:{
//             type:String,
//             required:true
//         }
//     },
//     role:{
//         type:String,
//         default:"user"
//     },
//     resetPasswordToken:String,
//     resetPasswordExpire:Date
// },{timestamps:true})

// // Password hashing
// userSchema.pre("save",async function(next){
//        // 1st - updating profile(name , email ,image)--hashed password will be hashed again ❌
//     // 2nd - Update password ✅
//     if(!this.isModified("password")){
//         return next();
//     }
//     this.password=await bcryptjs.hash(this.password,10);
//     next();

// })

// userSchema.methods.getJWTToken=function(){
//     return jwt.sign({id:this._id},process.env.JWT_SECRET_KEY,{
//         expiresIn:process.env.JWT_EXPIRE
//     })
// }
// userSchema.methods.verifyPassword=async function(userEnteredPassword){
//     return await bcryptjs.compare(userEnteredPassword,this.password);
// }

// // generating token
// userSchema.methods.generatePasswordResetToken=function(){
//     const resetToken=crypto.randomBytes(20).toString('hex');
//     this.resetPasswordToken=crypto.createHash("sha256").update(resetToken).digest("hex");
//     this.resetPasswordExpire=Date.now()+30*60*1000 //30minutes
//     return resetToken;
// }
// export default mongoose.model("User",userSchema);


import mongoose from "mongoose";
import validator from "validator";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const userSchema = new mongoose.Schema(
  {
    name: { // matches your controller
      type: String,
      required: [true, "Please enter your name"],
      maxlength: [25, "Name cannot exceed 25 characters"],
      minlength: [3, "Name should contain at least 3 characters"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
      validate: [validator.isEmail, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
      minlength: [8, "Password should be at least 8 characters"],
      select: false,
      validate: {
        validator: function (value) {
          return /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])/.test(value);
        },
        message:
          "Password must contain at least 1 uppercase, 1 lowercase, 1 number, and 1 special character.",
      },
    },
    avatar: { // matches your controller
      public_id: {
        type: String,
        default: "default_avatar_id",
      },
      url: {
        type: String,
        default: "https://example.com/default-avatar.png",
      },
    },
    role: {
      type: String,
      enum: ["user", "admin", "moderator"],
      default: "user",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);

//
// 🔐 Password Hashing Middleware
//
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcryptjs.hash(this.password, 10);
  next();
});

//
// 🔑 Generate JWT Token
//
userSchema.methods.getJWTToken = function () {
  return jwt.sign(
    { id: this._id },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: process.env.JWT_EXPIRE || "48h",
      issuer: process.env.JWT_ISSUER || "NeuroMarth_Backend",
      audience: process.env.JWT_AUDIENCE || "http://localhost:5173",
    }
  );
};

//
// 🔎 Verify Password
//
userSchema.methods.verifyPassword = async function (userEnteredPassword) {
  return await bcryptjs.compare(userEnteredPassword, this.password);
};

//
// 🔄 Generate Password Reset Token
//
userSchema.methods.generatePasswordResetToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetPasswordExpire =
    Date.now() + (process.env.RESET_PASSWORD_EXPIRE || 30) * 60 * 1000; // 30 min
  return resetToken;
};

//
// 🛡️ Hide Sensitive Fields in JSON
//
userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  delete user.resetPasswordToken;
  delete user.resetPasswordExpire;
  return user;
};

export default mongoose.model("User", userSchema);
