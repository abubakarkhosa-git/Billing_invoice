import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import crypto from 'crypto'
import jwt from "jsonwebtoken"
import { sendPasswordResetEmail } from "../utils/nodemailer.js";
import { getUserByConditions } from "../service/user.service.js";

export const Signup = async (req, res) => {
  try {
    const {
      NTNCNIC,
      FBRToken,
      BusinessName,
      Province,
      Address,
       email,
      username,
      password,
      newpassword,
    } = req.body;

    if (
      !NTNCNIC ||
      !BusinessName ||
      !Province ||
      !Address ||
      !email ||
      !username ||
      !password ||
      !newpassword
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password !== newpassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    
    const existingUser = await userModel.findOne({
      $or: [{  email }, { username }],
    });

    if (existingUser) {
      return res.status(403).json({ message: "User already exists" });
    }

 
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

   
    const user = await userModel.create({
      NTNCNIC,
      FBRToken,
      BusinessName,
      Province,
      Address,
       email,
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
        email: user.email,
        username: user.username,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};



export const login = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    // ✅ Validation
    if (!email || !username || !password) {
      return res.status(400).json({
        message: "Please provide Email, Username, and Password",
      });
    }

    // ✅ Check both email and username together
    const user = await getUserByConditions({ email, username });

    if (!user) {
      return res.status(404).json({
        message: "Invalid email or username — user not found",
      });
    }

    // ✅ Check password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    // ✅ JWT token
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.SECRET_KEY,
      { expiresIn: "7d" }
    );

    // ✅ Success
    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};









export const forgotpassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(403).json({ message: "User not found" }); // ✅ added return
    }

    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour

    user.resetPasswordToken = resetToken;
    user.resetPasswordTokenExpireAt = resetTokenExpiresAt;

    await user.save();

    await sendPasswordResetEmail(email, resetToken);

    return res.status(201).json({ message: "Password reset link sent to your email" }); // ✅ fixed
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" }); // ✅ fixed
  }
};



export const resetpassword=async(req,res)=>{
  try {
    const{token}= req.params;
    const{newpassword}=req.body

    const user=await userModel.findOne({
      resetPasswordToken: token,
      resetPasswordTokenExpireAt: {$gt: Date.now()}
    })
       if (!user) {
      return res.status(400).json({ message: "Invalid or expired reset token" });
    }

    const hashedPassword=await bcrypt.hash(newpassword, 10)
     user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpireAt = undefined;

    await user.save();
   return res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error during password reset" });
  }
}


export const changepassword=async(req,res)=>{
  try {
    const {oldpassword, newpassword}=req.body
    const userId=req.user.id
    const user=await userModel.findById(userId)
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
     const isMatch = await bcrypt.compare(oldpassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Old password is incorrect" });
    }

    user.password = await bcrypt.hash(newpassword, 10);
    await user.save();

    return res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error while changing password" });
  }
};
 