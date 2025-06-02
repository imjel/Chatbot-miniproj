import React, { useState } from 'react';
import InputBox from './InputBox'
import ResponseDisplay from './ResponseDisplay';

export const ChatPage = () => {

	const [messages, setMessages] = useState([]); // holds message history

	const handleSend = async (userInput) => {
		const userMessage = { role: 'user', content: userInput }
		setMessages(prev => [...prev, userMessage]);
		try {
			const response = await fetch('http://localhost:5001/chats', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ message: userInput }),
			});

			if (!response.ok) {
				const errText = await response.text();
				throw new Error(`Server error: ${response.status} - ${errText}`)
			}

			const data = await response.json();
			const botMessage = {role: "assistant", content: data.reply}
			setMessages(prev => [...prev, botMessage]);
			console.log('Reply from ChatGPT:', data.reply);
		} catch (error) {
			console.error("Fetch failed:", error);
		}
		
	};
	return (
		<div>
			<h1>Chatbot</h1>
			<ResponseDisplay messages={messages} />
			<InputBox onSend={handleSend} />
		</div>
	);
};

export default ChatPage;
