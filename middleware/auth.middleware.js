// import jwt from 'jsonwebtoken';
// import dotenv from 'dotenv';
// import mongoose from 'mongoose';
// import UserModel from '../models/user.model.js'; 
// import { verifyJwtToken } from '../utils/token.js';

// dotenv.config();

// export const isAuthorized = async (req, res, next) => {
//   try {
//     const bearer = req.headers.authorization; 

//     if (!bearer || !bearer.startsWith('Bearer ')) {
//       return res.status(401).json({
//         status: false,
//         message: 'Missing or invalid Bearer token',
//       });
//     }
//     const token = bearer.split(' ')[1];
//     const decodedToken = jwt.decode(token);
//     if (!decodedToken || !decodedToken.role) {
//       return res.status(401).json({
//         status: false,
//         message: 'Invalid token structure',
//       });
//     }
//     const decodeUser = await verifyJwtToken(token, decodedToken.role);
//     if (!decodeUser) {
//       return res.status(401).json({
//         status: false,
//         message: 'Token verification failed',
//       });
//     }
//     const email = decodeUser?.email;
//     if (!email) {
//       return res.status(401).json({
//         status: false,
//         message: 'Email not found in token',
//       });
//     }

//     const user = await UserModel.findOne({ email });
//     if (!user) {
//       return res.status(404).json({
//         status: false,
//         message: 'User not found',
//       });
//     }
//     req.userId = new mongoose.Types.ObjectId(user._id);
//     req.user = user;
//     req.userRole = user.role;

//     next();
//   } catch (error) {
//     console.error('Authorization Error:', error);
//     return res.status(500).json({
//       status: false,
//       message: 'Internal server error during authorization',
//       error: error.message,
//     });
//   }
// };



import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import UserModel from '../models/user.model.js';

dotenv.config();

export const isAuthorized = async (req, res, next) => {
  try {
    const accessCookies = req.cookies.accessToken;
    if (!accessCookies) {
      return res.status(401).json({
        status: false,
        message: "Access Cookies are missing"
      })
    }
    const decodeToken = jwt.verify(accessCookies, process.env.JWT_SECRET_USER);
    if (!decodeToken) {
      return res.status(404).json({
        status: false,
        message: "Can't decode the access token"
      })
    }
    console.log(decodeToken , "decodeToken")
    const user = await UserModel.findById(decodeToken?.id);
    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User doesnot found with the provided token id"
      })
    }
    req.user = user;
    next();
  }
  catch (error) {
    return res.status(500).json({
      status: false,
      message: "Error found in verifying Jwt Token"
    })
  }
};