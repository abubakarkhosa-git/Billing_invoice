import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import UserModel from '../models/user.model.js'; 
import { verifyJwtToken } from '../utils/token.js';

dotenv.config();

export const isAuthorized = async (req, res, next) => {
  try {
    const bearer = req.headers.authorization; 

    if (!bearer || !bearer.startsWith('Bearer ')) {
      return res.status(401).json({
        status: false,
        message: 'Missing or invalid Bearer token',
      });
    }
    const token = bearer.split(' ')[1];
    const decodedToken = jwt.decode(token);
    if (!decodedToken || !decodedToken.role) {
      return res.status(401).json({
        status: false,
        message: 'Invalid token structure',
      });
    }
    const decodeUser = await verifyJwtToken(token, decodedToken.role);
    if (!decodeUser) {
      return res.status(401).json({
        status: false,
        message: 'Token verification failed',
      });
    }
    const email = decodeUser?.email;
    if (!email) {
      return res.status(401).json({
        status: false,
        message: 'Email not found in token',
      });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        status: false,
        message: 'User not found',
      });
    }
    req.userId = new mongoose.Types.ObjectId(user._id);
    req.user = user;
    req.userRole = user.role;

    next();
  } catch (error) {
    console.error('Authorization Error:', error);
    return res.status(500).json({
      status: false,
      message: 'Internal server error during authorization',
      error: error.message,
    });
  }
};


// import jwt from "jsonwebtoken";
// import dotenv from "dotenv";
// dotenv.config();

// export const isAuthorized = async (req, res, next) => {
//   try {
//     const bearer = req.headers.authorization;
//     if (!bearer || !bearer.startsWith("Bearer ")) {
//       return res.status(403).json({ message: "Invalid or missing token" });
//     }

//     const token = bearer.split(" ")[1];
//     // ✅ verify using the same secret used during token generation
//     const decoded = jwt.verify(token, process.env.JWT_SECRET_USER);

//     req.user = decoded;
//     next();
//   } catch (error) {
//     console.error("Auth error:", error.message);

//     if (error.name === "TokenExpiredError") {
//       return res.status(401).json({ message: "Token expired" });
//     }

//     if (error.name === "JsonWebTokenError") {
//       return res.status(401).json({ message: "Invalid token signature" });
//     }

//     return res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
//   }
// };
