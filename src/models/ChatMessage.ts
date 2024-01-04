import mongoose from "mongoose";
const chatMessageSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  messageType: {
    type: String,
    enum: ["text", "audio", "video", "image", "document"], // Add more as needed
    required: true,
  },

  documentName: {
    type: String,
  },

  documentSize: {
    type: String,
  },

  documentExtension: {
    type: String,
  },

  content: {
    type: String,
    required: true,
  },

  timestamp: {
    type: Date,
    default: Date.now,
  },

  isReceived: {
    type: Boolean,
    default: false,
  },

  isRead: {
    type: Boolean,
    default: false,
  },

  isSent: {
    type: Boolean,
    default: false,
  },

  conversationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Conversation",
  },
});

export const ChatMessage = mongoose.model("ChatMessage", chatMessageSchema);
