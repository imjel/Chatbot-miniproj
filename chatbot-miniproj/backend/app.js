import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import OpenAI from "openai";
import cors from "cors";
import usersRouter from "./routes/users.js";
import chatsRouter from "./routes/chats.js";

dotenv.config(); // Load the .env file

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
})

const app = express();
const port = 5001;

// use middleware to parse json request bodies
app.use(bodyParser.json());
app.use(cors());
app.use("/users", usersRouter);
app.use("/chats", chatsRouter);


app.listen(port, () => {
   console.log(`Server is running on http://localhost:${port}`);
});
