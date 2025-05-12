import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GoogleLoginButton from '../components/GoogleLoginButton';

export default function HomePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // ✅ Auto-redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  // ✅ Called from GoogleLoginButton when login succeeds
  const handleLogin = (data) => {
    console.log("Logged in user:", data);
    setUser(data);
    localStorage.setItem('user', JSON.stringify(data));
    navigate('/dashboard'); // Force redirect
  };

  const pageStyle = {
    backgroundColor: '#000000',
    color: '#ffffff',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Segoe UI, sans-serif',
  };

  const cardStyle = {
    backgroundColor: '#121212',
    padding: '3rem',
    borderRadius: '12px',
    boxShadow: '0 0 20px rgba(255,255,255,0.05)',
    textAlign: 'center',
    width: '90%',
    maxWidth: '400px',
  };

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
          Welcome to <span style={{ color: '#4caf50' }}>Swift CRM</span>
        </h1>

        <p style={{ marginBottom: '1.5rem' }}>
          Sign in with your Google account to continue.
        </p>

        <GoogleLoginButton onLogin={handleLogin} />
      </div>
    </div>
  );
}
