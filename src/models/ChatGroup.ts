import mongoose from "mongoose";

const ChatGroupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 3,
      max: 30,
    },

    groupImage: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHasOwVIHrrcy0JLp9sGwHHuB_TTvTObC0v_yr3qeP8w&s",
    },

    messages: {
      type: [
        {
          senderId: {
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

          isSent: {
            type: Boolean,
            default: false,
          },
        },
      ],
    },

    users: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    },
  },
  { timestamps: true }
);

export const ChatGroup = mongoose.model("ChatGroup", ChatGroupSchema);
