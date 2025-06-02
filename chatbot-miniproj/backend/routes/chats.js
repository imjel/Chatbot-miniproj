import express from "express";
import axios from "axios";

const router = express.Router();

let messages = [
	{role: "system", content: "You are an assistant."},
];

router.post("/", async (req, res) => {
	console.log("chat route called");

	const { message } = req.body;

	if (!message) {
		return res.status(400).json({ error: "message required" });
	}

	// saving user's prompt to context
	messages.push( {role: "user", content: message});

	try {
		const response = await axios.post( "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

	// saving chatbot reply to context 
    const chatBotMessage = response.data.choices[0].message;
	messages.push(chatBotMessage);

    res.json({ reply: chatBotMessage.content });
  } catch (error) {
    console.error("OpenAI API error:", error.response?.data || error.message);
    res.status(500).json({ error: "OpenAI API failed" });
  }
});

export default router;