import jwt from "jsonwebtoken";
import { config } from "../config/index.js";

async function generateToken(payload) {
  const secretKey = config.secrets.JWT_SECRET; // ✅ correct key
  const token = jwt.sign(payload, secretKey, {
    expiresIn: config.secrets.jwtTokenExp, // ✅ same expiry config
  });
  return token;
}

async function generateRefreshToken(payload) {
  const secretKey = config.secrets.JWT_SECRET; // ✅ same key
  const token = jwt.sign(payload, secretKey, {
    expiresIn: config.secrets.jwtRefreshExp,
  });
  return token;
}

export { generateToken, generateRefreshToken };
