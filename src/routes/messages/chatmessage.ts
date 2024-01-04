import createMessage, {
  getUserConversations,
} from "../../controllers/chats/chats";
import express from "express";

export const chatMessageRoute = (router: express.Router) => {
  // Create a new message
  router.post("/chatmessages/create", createMessage);

  // Get users chats by his id
  router.get("/chatmessages/getchats/:userId", getUserConversations);
};
