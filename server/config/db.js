import mongoose from "mongoose";
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.resolve(__dirname, 'config.env');
dotenv.config({ path: envPath });

console.log("✅ dotenv loaded from:", envPath);
console.log("MONGO_URI loaded =", !!process.env.MONGO_URI);
console.log("MONGO_URI value =", process.env.MONGO_URI ? process.env.MONGO_URI.substring(0, 60) + "..." : "undefined");

export const connectMongoDatabase = async () => {
  try {
    const uri = process.env.MONGO_URI;

    if (!uri) {
      console.error("❌ MONGO_URI is still missing!");
      process.exit(1);
    }

    console.log("✅ Trying to connect to MongoDB...");
    const conn = await mongoose.connect(uri);
    console.log(`✅ MongoDB connected successfully: ${conn.connection.host}`);
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  }
};