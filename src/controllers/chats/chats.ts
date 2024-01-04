import Chat from "../../models/Chats";
import User from "../../models/User";
import { Response, Request } from "express";
// Controller function for creating a new message
const createMessage = async (req: Request, res: Response) => {
  try {
    // Extract relevant data from the request body
    const { senderId, recipientId, content, messageType } = req.body;
    console.log(senderId, recipientId, "ids");
    // Check if a chat exists between the sender and recipient
    let chat = await Chat.findOne({
      participants: { $all: [senderId, recipientId] },
    });

    // If no chat exists, create a new chat
    if (!chat) {
      // Check if both sender and recipient users exist
      const sender = await User.findById(senderId);
      const recipient = await User.findById(recipientId);

      if (!sender || !recipient) {
        console.log("user nf");
        return res.status(404).json({ message: "User not found" });
      }

      // Create a new chat with participants
      chat = await Chat.create({
        participants: [senderId, recipientId],
      });
    }

    // Create a new message
    const newMessage = {
      sender: senderId,
      content,
      messageType,
    };

    // Add the new message to the chat
    chat.messages.push(newMessage);

    // Save the updated chat with the new message
    await chat.save();

    // Return success response
    res.status(201).json({ message: "Message sent successfully", chat });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default createMessage;

// Controller function for getting a user's conversations
export const getUserConversations = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Assuming the user ID is present in the request
    const userId = req.params.userId;

    // Find all chats where the current user is a participant
    const chats = await Chat.find({ participants: userId })
      .populate("participants")
      .populate("messages.sender")
      .exec();

    // Now 'chats' contains the list of chat documents with fully populated participant and message details
    res.status(200).json({ chats });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
