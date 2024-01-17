import axios from "axios";
import SMS from "../../models/SMS";
import { Request, Response } from "express";

export const sendSMSToSingleUser = async (req: Request, res: Response) => {
  try {
    const { number } = req.body;

    const message = `Your verification pin for ChatPix is 
    ${Math.floor(1000 + Math.random() * 9000)}`;

    const response = await axios.post(`${process.env.EGOSMSURL}`, {
      method: process.env.EGOSMSMETHOD,
      userdata: {
        username: process.env.EGOSMSUSERNAME,
        password: process.env.EGOSMSPASSWORD,
      },
      msgdata: [
        {
          number,
          message,
          senderid: process.env.EGOSMSSENDERID,
        },
      ],
    });
    console.log(response.data);
    const dbsms = new SMS({
      phone_number: number,
      MsgFollowUpUniqueCode: response.data.MsgFollowUpUniqueCode,
      message,
      otp: message.match(/\d{4}$/).toString(), // extract pin at the end
    });
    const saveddbsms = await dbsms.save();
    return res.status(200).json(saveddbsms);
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

export const verifyOTPFromUser = async (req: Request, res: Response) => {
  try {
    const { otp, phone_number } = req.body;
    console.log(otp, phone_number);
    const availableOtp = await SMS.findOne({
      phone_number: `+${phone_number}`,
      otp,
    });
    if (!availableOtp) {
      return res.status(404).json("OTP not available hence invalid!");
    }
    return res.status(200).json("Successfully verified OTP!");
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};
