import express from "express";
import User from "../../models/User";

export const registerUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { phone_number } = req.body;
    const availableUser = await User.findOne({ phone_number });
    if (availableUser) {
      return res.status(200).json({
        message: "User already available, navigate to home and fetch messages",
        availableUser,
      });
    }
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    return res.status(200).json({
      message: "User saved successfully",
      savedUser,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};
