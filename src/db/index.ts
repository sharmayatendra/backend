import mongoose from "mongoose";

import { DB_NAME } from "../constants";

export const connectDB = async () => {
  console.log(":::", process.env.MONGODB_URI);

  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(
      `✅✅ MongoDB connected !! DB Host: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MONGODB connection error", error);
    process.exit(1);
  }
};
