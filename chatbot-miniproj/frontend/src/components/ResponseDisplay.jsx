import React from 'react'
import '../styles/ResponseDisplay.css'

const ResponseDisplay = ({ messages }) => {
	return (
		<div className='response-display'>
			{messages.map((msg, index) => (
				<div
					key={index}
					className={msg.role === 'user' ? 'user-message' : 'bot-message'}
					>
						<strong>{msg.role === 'user' ? 'You:' : 'Bot:'}</strong> {msg.content}
				</div>
			))}
		</div>
	)
}

export default ResponseDisplay