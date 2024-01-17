import {
  sendSMSToSingleUser,
  verifyOTPFromUser,
} from "../../controllers/SMS/sms";
import express from "express";

export const smsRoute = (router: express.Router) => {
  // SEND SMS TO SINGLE USER
  router.post("/sms/singleuser/sendsinglesms", sendSMSToSingleUser);

  // VERIFY SMS/otp
  router.post("/sms/singleuser/verify/verifyotp", verifyOTPFromUser);
};
