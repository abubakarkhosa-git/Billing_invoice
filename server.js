import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/db.js';
import userRoutes from "./routes/user.Routes.js"

const app = express();

dotenv.config();
const PORT = process.env.PORT || 5000;


app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());


app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log("Server is Connected successfully");
});
