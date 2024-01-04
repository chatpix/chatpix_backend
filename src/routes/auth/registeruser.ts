import { registerUser } from "../../controllers/auth/registeruser";
import express from "express";

export const registerUserRoute = (router: express.Router) => {
  // Register new user
  router.post("/auth/register", registerUser);
};
