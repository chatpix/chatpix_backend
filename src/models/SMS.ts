const mongoose = require("mongoose");

const SMSSchema = new mongoose.Schema(
  {
    phone_number: {
      type: String,
    },

    otp: {
      type: String,
    },

    message: {
      type: String,
      required: true,
    },

    MsgFollowUpUniqueCode: {
      type: String,
      reuired: true,
    },
  },
  { timestamps: true }
);

const SMS = mongoose.model("SMS", SMSSchema);
export default SMS;
