import { updateUser } from "../../controllers/users/updateuser";
import express from "express";

export const userRoute = (router: express.Router) => {
  // Update a user
  router.put("/users/update/:userId", updateUser);
};
