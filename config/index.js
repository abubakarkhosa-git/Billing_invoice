import dotenv from "dotenv";
dotenv.config();

export const config = {
  secrets: {
    JWT_SECRET: process.env.JWT_SECRET_USER,   // ✅ Correct variable name
    jwtTokenExp: process.env.JWT_TOKEN_EXPIRE,
    jwtRefreshExp: process.env.JWT_REFRESH_EXPIRE,
  },
};
