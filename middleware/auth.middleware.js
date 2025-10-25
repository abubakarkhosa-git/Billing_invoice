import jwt from "jsonwebtoken";

export const isAuthorized = async (req, res, next) => {
  try {
    // ✅ Correct way to access header
    const bearer = req.headers.authorization;

    if (!bearer || !bearer.startsWith("Bearer ")) {
      return res.status(403).json({ message: "Invalid or missing token" });
    }

    // ✅ Extract token
    const token = bearer.split(" ")[1];

    // ✅ Verify token properly
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(403).json({ message: "Invalid token" });
    }

    // ✅ Attach user info to request for later use
    req.user = decoded;

    // ✅ Continue to next middleware or route
    next();
  } catch (error) {
    console.error("Auth error:", error.message);
    return res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
  }
};
