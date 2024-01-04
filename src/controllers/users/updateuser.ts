import express from "express";
import User from "../../models/User";

export const updateUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { name } = req.body;
    const { userId } = req.params;
    const user = User.findById(userId);
    console.log(req.body, "req.body");
    if (!user) {
      return res.status(404).json("User not found!");
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: { name },
      },
      { new: true }
    );
    return res.status(200).json(updatedUser);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};
