import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB Connected Successfully: ${conn.connection.host}`);
  } catch (err) {
    console.log("❌ MongoDB Connection Failed:", err.message);
    process.exit(1); // Stop the server if DB connection fails
  }
};

export default connectDB;
