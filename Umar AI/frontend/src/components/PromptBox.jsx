import React, { useState } from 'react'

export default function PromptBox({ onSend, disabled }) {
    const [text, setText] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!text.trim() || disabled) return
        onSend(text.trim())
        setText('')
    }

    const handleKeyDown = (e) => {
        // Send on Enter, new line on Shift+Enter
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSubmit(e)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex gap-3 items-end">
            <div className="flex-1">
                <textarea
                    value={text}
                    onChange={e => setText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your message... (Press Enter to send, Shift+Enter for new line)"
                    className="w-full p-4 rounded-xl bg-slate-800/60 border border-slate-700 text-white resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    rows={1}
                    style={{
                        minHeight: '56px',
                        maxHeight: '200px',
                        overflow: 'auto'
                    }}
                    disabled={disabled}
                />
            </div>
            <button
                type="submit"
                disabled={disabled || !text.trim()}
                className={`px-6 py-4 rounded-xl font-semibold transition-all ${disabled || !text.trim()
                        ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-lg'
                    }`}
            >
                {disabled ? (
                    <span>•••</span>
                ) : (
                    <span>Send 🚀</span>
                )}
            </button>
        </form>
    )
}
