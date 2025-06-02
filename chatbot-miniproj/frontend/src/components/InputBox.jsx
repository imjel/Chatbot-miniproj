import React, { useState } from 'react';
import '../styles/InputBox.css';

const InputBox = ({ onSend }) => {

	const [prompt, setPrompt] = useState('');

	const handleSubmit = (e) => {
		if (e.key === 'Enter') {
			submitPrompt();
		}
	};

	const submitPrompt = () => {
		if (prompt.trim() === '') return; // if prompt is empty

		if (onSend) {
			onSend(prompt);
		} 
		setPrompt('');
	}

	return (
		<div className='input-container'>
			<input
				className="user-input"
				type="text"
				value={prompt}
				onChange={(e) => setPrompt(e.target.value)}
				onKeyDown={handleSubmit}
				placeholder="Type your query here!"
			>
			</input>
			<button className='submit-btn' onClick={submitPrompt}>Submit</button>
		</div>
	);
};

export default InputBox