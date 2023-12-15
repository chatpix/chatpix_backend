"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
// Import express and initialise a new express app
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
exports.app = app;
// Import mongoose, morgan, cors, helmet, dotenv, ... and initialise them
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
dotenv_1.default.config();
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)("common"));
app.use((0, helmet_1.default)());
// MONGDB DATABASE CONNECTION
// Incase the env variable MONGO_URI is not set, return error :(
if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI environment variable is not defined");
}
// If the DB connection url is available in .env file, use mongoose
// to connect to mongodb
mongoose_1.default
    .connect(process.env.MONGO_URI)
    .then(() => {
    console.log("MongoDB connected to the backend successfully");
})
    .catch((err) => console.log(err));
app.get("/", async (req, res) => {
    res.send("Welcome to ts with node app");
});
// Start express server
const PORT = process.env.PORT || 8900;
app.listen(PORT, () => {
    console.log(`Backend server is running at port ${PORT}`);
});
//# sourceMappingURL=index.js.map