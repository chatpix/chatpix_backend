// controllers/chatGroupController.ts
import { Request, Response } from "express";
import { ChatGroup } from "../../models/ChatGroup";
import User from "../../models/User";

export const createChatGroup = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, users } = req.body;

    const existingUsers = await User.find({ _id: { $in: users } });
    if (existingUsers.length !== users.length) {
      res.status(400).json({ message: "Invalid user ID(s)" });
      return;
    }

    const newGroup = new ChatGroup({
      name,
      users,
      messages: [],
    });

    await newGroup.save();

    res.status(201).json(newGroup);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Find a users groups by his id
export const getGroupsByUserId = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.params.userId;

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // Fetch groups with populated user and all fields in messages
    const groups = await ChatGroup.find({ users: userId })
      .populate({
        path: "users",
      })
      .populate({
        path: "messages.senderId",
      });

    res.status(200).json(groups);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Create new group message

export const createMessageInGroup = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      groupId,
      senderId,
      messageType,
      documentName,
      documentSize,
      documentExtension,
      content,
      isSent,
    } = req.body;

    // Check if the group exists
    const group = await ChatGroup.findById(groupId);
    if (!group) {
      res.status(404).json({ message: "Group not found" });
      return;
    }

    // Check if the sender exists
    const sender = await User.findById(senderId);
    if (!sender) {
      res.status(404).json({ message: "Sender not found" });
      return;
    }

    // Create a new message
    const newMessage = {
      senderId,
      messageType,
      documentName,
      documentSize,
      documentExtension,
      content,
      isSent,
    };

    // Add the new message to the group's messages array
    group.messages.push(newMessage);

    // Save the updated group with the new message
    await group.save();

    res.status(201).json(group);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update group members by pushing in new ids for new members
export const updateGroupMembers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { groupId, newUsers } = req.body;

    // Check if the group exists
    const group = await ChatGroup.findById(groupId);
    if (!group) {
      res.status(404).json({ message: "Group not found" });
      return;
    }

    // Check if the new users exist
    const existingUsers = await User.find({ _id: { $in: newUsers } });
    if (existingUsers.length !== newUsers.length) {
      res.status(400).json({ message: "Invalid user ID(s)" });
      return;
    }

    // Add the new user IDs to the existing ones in the group
    group.users = group.users.concat(newUsers);

    // Save the updated group
    await group.save();

    res.status(200).json(group);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
