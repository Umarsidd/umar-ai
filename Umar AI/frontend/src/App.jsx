import React, { useState, useEffect } from 'react'
import ChatWindow from './components/ChatWindow'
import Sidebar from './components/Sidebar'
import Login from './components/Login'
import Register from './components/Register'

export default function App() {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [authView, setAuthView] = useState('login'); // 'login' or 'register'
    const [loading, setLoading] = useState(true);

    // Check if user is logged in on mount
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (storedToken && storedUser) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const handleLogin = (userData, authToken) => {
        setUser(userData);
        setToken(authToken);
    };

    const handleRegister = (userData, authToken) => {
        setUser(userData);
        setToken(authToken);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        setToken(null);
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Loading...</p>
            </div>
        );
    }

    // Show auth screens if not logged in
    if (!user || !token) {
        if (authView === 'register') {
            return (
                <Register
                    onRegister={handleRegister}
                    onSwitchToLogin={() => setAuthView('login')}
                />
            );
        }
        return (
            <Login
                onLogin={handleLogin}
                onSwitchToRegister={() => setAuthView('register')}
            />
        );
    }

    // Show main app if logged in
    return (
        <div className="container">
            <div className="chat-area">
                <Sidebar user={user} onLogout={handleLogout} />
                <ChatWindow token={token} />
            </div>
        </div>
    )
}
