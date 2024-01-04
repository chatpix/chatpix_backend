import mongoose from "mongoose";

const UserModel = new mongoose.Schema(
  {
    phone_number: {
      type: String,
      required: true,
    },

    profile_image: {
      type: String,
    },

    full_name: {
      type: String,
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserModel);

export default User;
