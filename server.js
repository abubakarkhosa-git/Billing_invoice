import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/db.js';
import userRoutes from "./routes/user.Routes.js"

const app = express();

dotenv.config();
const PORT = process.env.PORT || 5000;

// CORS should be before routes
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());

// Routes always after CORS
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log("Server is Connected successfully");
});
