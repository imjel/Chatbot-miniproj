import { useState } from 'react'
import './App.css'
import ChatPage from './components/ChatPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
	<ChatPage />
    </>
  )
}

export default App
