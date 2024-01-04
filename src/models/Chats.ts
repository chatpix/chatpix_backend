const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  content: {
    type: String,
    required: true,
  },

  messageType: {
    type: String,
    enum: ["text", "audio", "video", "image", "document"], // Add more as needed
    required: true,
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
    default: true,
  },

  timestamp: { type: Date, default: Date.now },
});

const chatSchema = new mongoose.Schema({
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],
  messages: [messageSchema],
});

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;
