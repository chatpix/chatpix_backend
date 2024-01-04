import {
  createChatGroup,
  createMessageInGroup,
  getGroupsByUserId,
  updateGroupMembers,
} from "../../controllers/chatgroup/chatgroupController";
import express from "express";

export const chatgroupRoutes = (router: express.Router) => {
  // Create a new group
  router.post("/chats/groups/create", createChatGroup);

  //   Get groups of a user by userid
  router.get("/chats/groups/getusersgroups/:userId", getGroupsByUserId);

  //   Create a group message/send message
  router.post("/chats/groups/sendmessage", createMessageInGroup);

  //   Update group members by adding new ones
  router.put("/chats/groups/updatemembers", updateGroupMembers);
};
