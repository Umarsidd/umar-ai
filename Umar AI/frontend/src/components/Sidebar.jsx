import React from 'react'

export default function Sidebar({ user, onLogout }) {
    const handleNewChat = () => {
        window.location.reload();
    };

    return (
        <aside className="sidebar">
            <div>
                <h1 className="text-2xl font-bold mb-2 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                    Umar AI
                </h1>
                <p className="text-xs text-gray-400 mb-6">Your intelligent assistant</p>

                {user && (
                    <div className="user-info mb-4 p-3 rounded-lg bg-slate-800/50">
                        <p className="text-sm font-semibold text-indigo-300">👤 {user.username}</p>
                        <p className="text-xs text-gray-400 mt-1">{user.email}</p>
                    </div>
                )}

                <button
                    onClick={handleNewChat}
                    className="w-full px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium mb-4 hover:from-indigo-700 hover:to-purple-700 transition-all"
                >
                    + New Chat
                </button>

                <div className="text-sm space-y-3">
                    <div className="p-3 rounded-lg bg-slate-800/50 hover:bg-slate-800/70 cursor-pointer transition-all">
                        <p className="font-medium text-indigo-300">💬 Chat History</p>
                        <p className="text-xs text-gray-400 mt-1">Coming soon...</p>
                    </div>

                    <div className="p-3 rounded-lg bg-slate-800/50 hover:bg-slate-800/70 cursor-pointer transition-all">
                        <p className="font-medium text-purple-300">⚙️ Settings</p>
                        <p className="text-xs text-gray-400 mt-1">Customize your AI</p>
                    </div>
                </div>
            </div>

            <div className="mt-auto">
                {onLogout && (
                    <button
                        onClick={onLogout}
                        className="w-full px-4 py-2 mb-4 bg-red-600/20 text-red-400 rounded-lg font-medium hover:bg-red-600/30 transition-all border border-red-600/30"
                    >
                        🚪 Logout
                    </button>
                )}

                <footer className="pt-6 border-t border-gray-700/50">
                    <p className="text-xs text-gray-500 text-center">
                        Built with ❤️ by <span className="text-indigo-400 font-semibold">Umar</span>
                    </p>
                    <p className="text-xs text-gray-600 text-center mt-2">
                        Powered by OpenAI
                    </p>
                </footer>
            </div>
        </aside>
    )
}
