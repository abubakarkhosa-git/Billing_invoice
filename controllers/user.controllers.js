import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

export const Signup = async (req, res) => {
  try {
    const {
      NTNCNIC,
      FBRToken,
      BusinessName,
      Province,
      Address,
      Email,
      username,
      password,
      newpassword,
    } = req.body;

    // Check required fields (FBRToken removed)
    if (
      !NTNCNIC ||
      !BusinessName ||
      !Province ||
      !Address ||
      !Email ||
      !username ||
      !password ||
      !newpassword
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check password match
    if (password !== newpassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // Check if user already exists
    const existingUser = await userModel.findOne({
      $or: [{ Email }, { username }],
    });

    if (existingUser) {
      return res.status(403).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await userModel.create({
      NTNCNIC,
      FBRToken,
      BusinessName,
      Province,
      Address,
      Email,
      username,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: user._id,
        NTNCNIC: user.NTNCNIC,
        BusinessName: user.BusinessName,
        Province: user.Province,
        Address: user.Address,
        Email: user.Email,
        username: user.username,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};




export const login = async (req, res) => {
  try {
    const { Email, username, password } = req.body;

    // Check required fields
    if ((!Email && !username) || !password) {
      return res.status(400).json({
        message: "Please provide Email or Username and Password",
      });
    }

    // Find user by Email or Username
    // const user = await userModel.findOne({
    //   $or: [{ Email: Email }, { username: username }],
    // });
const user = await userModel.findOne({
  $or: [{ Email }, { username }]
});

    if (!user) {
      return res.status(404).json({ message: "User does not exist, please signup first" });
    }

    // Validate password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    // Create JWT Token
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.SECRET_KEY,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        Email: user.Email,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};