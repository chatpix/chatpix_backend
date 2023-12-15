import request from "supertest";
import { app } from "../src/index";
import mongoose from "mongoose";

beforeAll(async () => {
  // Set up: Establish the MongoDB connection before running tests
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI environment variable is not defined/set");
  }

  await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
  // Teardown: Close the MongoDB connection after all tests have completed
  await mongoose.connection.close();
});

// Unit test for testing initial route ("/")
describe("GET /", () => {
  it('responds with "Welcome to ts with node app"', async () => {
    const response = await request(app).get("/");

    expect(response.status).toBe(200);
    expect(response.text).toBe("Welcome to ts with node app");
  });
});
