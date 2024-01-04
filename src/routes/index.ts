import express from "express";
import { registerUserRoute } from "./auth/registeruser";
import { userRoute } from "./users/updateuser";
import { chatMessageRoute } from "./messages/chatmessage";
import { chatgroupRoutes } from "./chatgroup/chatgroupRoutes";
const router = express.Router();

export default (): express.Router => {
  // AUTH(REGISTER)
  registerUserRoute(router);

  // USERS
  userRoute(router);

  // CHAT MESSAGES
  chatMessageRoute(router);

  // GROUP CHATS
  chatgroupRoutes(router);

  return router;
};
