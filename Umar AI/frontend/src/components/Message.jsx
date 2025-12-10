import React from 'react'

export default function Message({ role, content }) {
    const cls = role === 'user' ? 'message user' : 'message assistant'
    const label = role === 'user' ? 'You' : 'Umar AI'

    return (
        <div className={cls}>
            <div className="bubble">
                <div className="text-xs font-semibold mb-2 opacity-70">
                    {label}
                </div>
                <div className="whitespace-pre-wrap">
                    {content}
                </div>
            </div>
        </div>
    )
}
