// lib/db.ts
import mongoose from "mongoose";

let isConnected = false; // connection state

export const connectToDB = async () => {
  if (isConnected) {
    console.log("MongoDB already connected");
    return;
  }

  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI not found in environment variables");

  try {
    const db = await mongoose.connect(uri);
    isConnected = db.connections[0].readyState === 1;
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    throw error;
  }
};

// 👇 Alias export so existing code keeps working
export const connectToDatabase = connectToDB;
