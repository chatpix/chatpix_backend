// Import express and initialise a new express app
import express from "express";
const app = express();

// Import mongoose, morgan, cors, helmet, dotenv, ... and initialise them
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";

dotenv.config();
app.use(cors());
app.use(morgan("common"));
app.use(helmet());

// MONGDB DATABASE CONNECTION
// Incase the env variable MONGO_URI is not set, return error :(
if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI environment variable is not defined");
}

// If the DB connection url is available in .env file, use mongoose
// to connect to mongodb
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected to the backend successfully");
  })
  .catch((err) => console.log(err));

app.get("/", async (req: express.Request, res: express.Response) => {
  res.send("Welcome to ts with node app");
});

// Start express server
const PORT = process.env.PORT || 8900;
app.listen(PORT, () => {
  console.log(`Backend server is running at port ${PORT}`);
});

// Export instance of express app for use in other areas like unit test files
export { app };
