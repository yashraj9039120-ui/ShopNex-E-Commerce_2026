import mongoose from "mongoose";
import { connectMongoDatabase } from "./config/db.js";
import Product from "./models/productModel.js";

const sampleProducts = [
  {
    name: "Wireless Headphones",
    description: "Premium noise cancelling wireless headphones",
    price: 2999,
    image: [{ public_id: "headphones", url: "https://via.placeholder.com/500x500?text=Headphones" }],
    category: "Electronics",
    stock: 45,
    user: "67f8a1b2c3d4e5f678901234"
  },
  {
    name: "Smart Watch Pro",
    description: "Advanced fitness tracking smartwatch",
    price: 4499,
    image: [{ public_id: "smartwatch", url: "https://via.placeholder.com/500x500?text=SmartWatch" }],
    category: "Wearables",
    stock: 32,
    user: "67f8a1b2c3d4e5f678901234"
  },
  {
    name: "Laptop Backpack",
    description: "Waterproof laptop backpack",
    price: 899,
    image: [{ public_id: "backpack", url: "https://via.placeholder.com/500x500?text=Backpack" }],
    category: "Fashion",
    stock: 78,
    user: "67f8a1b2c3d4e5f678901234"
  }
];

const seedData = async () => {
  try {
    await connectMongoDatabase();
    await Product.deleteMany({});
    const created = await Product.insertMany(sampleProducts);
    console.log(`✅ ${created.length} Products seeded successfully!`);
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error.message);
    process.exit(1);
  }
};

seedData();