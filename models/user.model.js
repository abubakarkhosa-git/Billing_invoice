import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    NTNCNIC: {
      type: Number,
      required: true,
      unique: true,
    },

    FBRToken: {
      type: String,
      default: null,
    },

    BusinessName: {
      type: String,
      required: true,
    },

    Province: {
      type: String,
      enum: [
        "Punjab",
        "Sindh",
        "KPK",
        "Balochistan",
        "Gilgit Baltistan",
        "Azad Kashmir",
      ],
      required: true,
    },

    Address: {
      type: String,
      required: true,
    },

    Email: {
      type: String,
      required: true,
      unique: true,
    },

    username: {
      type: String,
      required: true,
      unique: true
     
    },

    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
