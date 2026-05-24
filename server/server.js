import dotenv from 'dotenv';
dotenv.config();   // ← Must be at the VERY TOP

import app from './app.js';
import { connectMongoDatabase } from './config/db.js';
import {v2 as cloudinary} from 'cloudinary';

connectMongoDatabase();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME || "dummy",
    api_key: process.env.API_KEY || "dummy",
    api_secret: process.env.API_SECRET || "dummy"
});

// Handle uncaught exception errors
process.on('uncaughtException',(err)=>{
    console.log(`Error : ${err.message}`);
    console.log(`Server is shutting down due to uncaught exception errors`);
    process.exit(1);
});

const port = process.env.PORT || 5000;

// Home Route
app.get("/", (req, res) => {
  res.send("API is working 🚀");
});

const server = app.listen(port, () => {
    console.log(`✅ Server is running on PORT ${port}`);
});

process.on('unhandledRejection',(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Server is shutting down due to unhandled promise rejection`);
    server.close(() => process.exit(1));
});