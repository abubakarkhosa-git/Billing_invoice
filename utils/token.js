import jwt from "jsonwebtoken";
import { config } from "../config/index.js";

// async function generateToken(payload) {
//   const secretKey = config.secrets.JWT_SECRET; // ✅ correct key
//   const token = jwt.sign(payload, secretKey, {
//     expiresIn: config.secrets.jwtTokenExp, // ✅ same expiry config
//   });
//   return token;
// }

// async function generateRefreshToken(payload) {
//   const secretKey = config.secrets.JWT_SECRET; // ✅ same key
//   const token = jwt.sign(payload, secretKey, {
//     expiresIn: config.secrets.jwtRefreshExp,
//   });
//   return token;
// }

  async function generateToken(payload, role) {


    const secretKey = role === 'admin' ? config.secrets.jwtSecretKeyAdmin : config.secrets.jwtSecretKeyUser;
    const token = jwt.sign(payload, secretKey, { expiresIn: config.secrets.jwtTokenExp });
    return token;
  }
  
  async function generateRefreshToken(payload, role) {
    console.log(config.secrets.jwtSecretKey,"test")

    const secretKey = role === 'admin' ? config.secrets.jwtSecretKeyAdmin : config.secrets.jwtSecretKeyUser;
    const token = jwt.sign(payload, secretKey, { expiresIn: config.secrets.jwtRefreshExp });
    return token;
  }

  async function verifyJwtToken(token, role) {
    const secretKey = role === 'admin' ? config.secrets.jwtSecretKeyAdmin : config.secrets.jwtSecretKeyUser;
    return jwt.verify(token, secretKey);
  }

export { generateToken, generateRefreshToken , verifyJwtToken};
