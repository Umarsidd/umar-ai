import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import Message from './Message'
import PromptBox from './PromptBox'

export default function ChatWindow() {
    const [messages, setMessages] = useState([
        { id: 'sys1', role: 'system', content: 'You are Umar AI, a helpful and intelligent assistant created to help users with their questions and tasks.' }
    ])
    const [loading, setLoading] = useState(false)
    const messagesRef = useRef(null)

    useEffect(() => {
        if (messagesRef.current) {
            messagesRef.current.scrollTo({
                top: messagesRef.current.scrollHeight,
                behavior: 'smooth'
            })
        }
    }, [messages, loading])

    const sendMessage = async (text) => {
        if (!text || !text.trim()) return

        const userMsg = { id: Date.now().toString(), role: 'user', content: text.trim() }
        setMessages(prev => [...prev, userMsg])

        setLoading(true)
        try {
            // Get backend URL from env or use default
            const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4001'

            // Prepare messages for API (include system message and conversation history)
            const apiMessages = messages.concat(userMsg)

            const res = await axios.post(`${backendUrl}/api/chat`, {
                messages: apiMessages
            })

            const assistantText = res.data.reply || 'No response received.'
            const assistantMsg = {
                id: Date.now().toString() + '-assistant',
                role: 'assistant',
                content: assistantText
            }
            setMessages(prev => [...prev, assistantMsg])
        } catch (err) {
            console.error('Error contacting AI:', err)

            let errorContent = '⚠️ Sorry, I encountered an error.'

            // Check if we got a response from the backend
            if (err.response?.data) {
                const errorData = err.response.data

                if (errorData.error === 'OpenAI API not configured') {
                    // Show detailed setup instructions
                    errorContent = `🔑 **OpenAI API Key Required**

${errorData.detail}

**Quick Setup:**
${errorData.instructions?.join('\n') || ''}

Once you save the .env file with your API key, the backend will automatically restart!`
                } else if (errorData.error === 'Invalid API key') {
                    errorContent = `❌ **Invalid API Key**

${errorData.detail}

Please double-check:
1. Your API key starts with "sk-"
2. You copied the entire key (no extra spaces)
3. The key is active on your OpenAI account

Visit https://platform.openai.com/api-keys to verify or create a new key.`
                } else if (errorData.error === 'Insufficient quota') {
                    errorContent = `💳 **Out of Credits**

${errorData.detail}

Your OpenAI account needs credits to continue. Add credits at:
https://platform.openai.com/account/billing`
                } else if (errorData.error === 'Rate limit exceeded') {
                    errorContent = `⏱️ **Too Many Requests**

${errorData.detail}

Please wait a moment and try again.`
                } else {
                    // Generic error with details
                    errorContent = `⚠️ **Error: ${errorData.error}**

${errorData.detail || 'An unexpected error occurred.'}`
                }
            } else if (err.code === 'ERR_NETWORK' || err.message.includes('Network Error')) {
                // Network error - backend is not running
                errorContent = `🔌 **Cannot Connect to Backend**

The backend server is not responding. Please check:

1. ✅ Backend is running: \`npm run dev\` in backend folder
2. ✅ Backend URL is correct: ${import.meta.env.VITE_BACKEND_URL || 'http://localhost:4001'}
3. ✅ No firewall blocking the connection

To start the backend:
\`\`\`
cd backend
npm run dev
\`\`\``
            } else {
                // Unknown error
                errorContent = `⚠️ **Unexpected Error**

${err.message || 'An unknown error occurred.'}

Please check the browser console for more details.`
            }

            const errorMsg = {
                id: 'error-' + Date.now(),
                role: 'assistant',
                content: errorContent
            }
            setMessages(prev => [...prev, errorMsg])
        } finally {
            setLoading(false)
        }
    }

    // Filter out system messages from display
    const displayMessages = messages.filter(m => m.role !== 'system')

    return (
        <div className="chat-main">
            <div className="messages" ref={messagesRef}>
                {displayMessages.length === 0 && (
                    <div className="text-center mt-20">
                        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                            Welcome to Umar AI
                        </h2>
                        <p className="text-gray-400 text-lg">
                            How can I assist you today?
                        </p>
                    </div>
                )}

                {displayMessages.map(m => (
                    <Message key={m.id} role={m.role} content={m.content} />
                ))}

                {loading && (
                    <div className="message assistant">
                        <div className="bubble">
                            <div className="typing-indicator">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="prompt">
                <PromptBox onSend={sendMessage} disabled={loading} />
            </div>
        </div>
    )
}
