import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const isAuthorized = async (req, res, next) => {
  try {
    const bearer = req.headers.authorization;
    if (!bearer || !bearer.startsWith("Bearer ")) {
      return res.status(403).json({ message: "Invalid or missing token" });
    }

    const token = bearer.split(" ")[1];
    // ✅ verify using the same secret used during token generation
    const decoded = jwt.verify(token, process.env.JWT_SECRET_USER);

    req.user = decoded;
    next();
  } catch (error) {
    console.error("Auth error:", error.message);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token signature" });
    }

    return res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
  }
};
