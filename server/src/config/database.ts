import { MongoClient } from "mongodb";
import mongoose from "mongoose";

import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGO_DB_URI || "";
export const client = new MongoClient(uri);
export const database = client.db("jobreel");

export const connectDb = async () => {
  try {
    console.log(process.env.MONGO_DB_URI);
    
    await mongoose.connect(process.env.MONGO_DB_URI as string);
    console.log("MongoDB connected successfully");
  } catch (error) {
    //@ts-ignore
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};
