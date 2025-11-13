// lib/db.ts
import mongoose from "mongoose";

let isConnecting = false;
let isConnected = false;

export const connectToDB = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI not found in environment variables");

  if (isConnected) {
    console.log("MongoDB already connected");
    return;
  }

  if (isConnecting) {
    console.log("MongoDB connection already in progress...");
    await waitForConnection();
    return;
  }

  try {
    console.log("hit db");
    isConnecting = true;

    const db = await mongoose.connect(uri, {
      bufferCommands: false,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });

    isConnected = db.connections[0].readyState === 1;
    isConnecting = false;

    console.log("MongoDB connected successfully");
  } catch (error) {
    isConnecting = false;
    console.error("MongoDB connection failed:", error);
    throw error;
  }
};

// Wait until mongoose connection is ready
const waitForConnection = async () => {
  while (mongoose.connection.readyState !== 1) {
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
};

// 👇 Alias for backward compatibility
export const connectToDatabase = connectToDB;
