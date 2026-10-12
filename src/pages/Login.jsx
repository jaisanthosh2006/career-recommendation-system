import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

export default function Login({ onLogin }) {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!form.email || !form.password) {
      setError('Please fill in all fields.');
      return;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (isSignUp && !form.name.trim()) {
      setError('Please enter your name.');
      return;
    }

    setLoading(true);

    // Simulate async auth
    setTimeout(() => {
      const user = {
        name: isSignUp ? form.name : (form.email.split('@')[0]),
        email: form.email,
      };
      localStorage.setItem('authUser', JSON.stringify(user));
      if (onLogin) onLogin(user);
      setLoading(false);
      navigate('/');
    }, 1200);
  };

  return (
    <div className="login-root">
      {/* Animated blobs */}
      <div className="login-blob blob-1" />
      <div className="login-blob blob-2" />
      <div className="login-blob blob-3" />

      <div className="login-card">
        {/* Logo / Brand */}
        <div className="login-brand">
          <div className="login-logo">🚀</div>
          <h1 className="login-title">CareerIQ</h1>
          <p className="login-subtitle">Your AI-powered career launchpad</p>
        </div>

        {/* Tab switcher */}
        <div className="login-tabs">
          <button
            className={`login-tab${!isSignUp ? ' active' : ''}`}
            onClick={() => { setIsSignUp(false); setError(''); }}
          >
            Sign In
          </button>
          <button
            className={`login-tab${isSignUp ? ' active' : ''}`}
            onClick={() => { setIsSignUp(true); setError(''); }}
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        <form className="login-form" onSubmit={handleSubmit} noValidate>
          {isSignUp && (
            <div className="login-field">
              <label htmlFor="name">Full Name</label>
              <div className="login-input-wrap">
                <span className="login-input-icon">👤</span>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={handleChange}
                  autoComplete="name"
                />
              </div>
            </div>
          )}

          <div className="login-field">
            <label htmlFor="email">Email Address</label>
            <div className="login-input-wrap">
              <span className="login-input-icon">✉️</span>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
              />
            </div>
          </div>

          <div className="login-field">
            <label htmlFor="password">Password</label>
            <div className="login-input-wrap">
              <span className="login-input-icon">🔒</span>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                autoComplete={isSignUp ? 'new-password' : 'current-password'}
              />
            </div>
          </div>

          {!isSignUp && (
            <div className="login-forgot">
              <a href="#" onClick={e => e.preventDefault()}>Forgot password?</a>
            </div>
          )}

          {error && <p className="login-error">⚠️ {error}</p>}

          <button
            type="submit"
            className={`login-submit${loading ? ' loading' : ''}`}
            disabled={loading}
          >
            {loading
              ? <span className="login-spinner" />
              : (isSignUp ? 'Create Account' : 'Sign In')}
          </button>
        </form>

        {/* Divider */}
        <div className="login-divider"><span>or continue with</span></div>

        {/* Social buttons */}
        <div className="login-socials">
          <button className="login-social-btn" onClick={() => {
            const user = { name: 'Sandy', email: 'sandy@example.com' };
            localStorage.setItem('authUser', JSON.stringify(user));
            if (onLogin) onLogin(user);
            navigate('/');
          }}>
            <svg width="18" height="18" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.2l6.8-6.8C35.8 2.4 30.2 0 24 0 14.8 0 6.9 5.4 2.9 13.3l7.9 6.1C12.6 13.1 17.9 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h12.7c-.6 3-2.3 5.5-4.8 7.2l7.6 5.9c4.4-4.1 7-10.1 7-17.1z"/>
              <path fill="#FBBC05" d="M10.8 28.6A14.8 14.8 0 0 1 9.5 24c0-1.6.3-3.2.8-4.6l-7.9-6.1A23.9 23.9 0 0 0 0 24c0 3.9.9 7.5 2.6 10.7l8.2-6.1z"/>
              <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.6-5.9c-2.1 1.4-4.9 2.2-8.3 2.2-6.1 0-11.4-3.6-13.2-8.9l-8.2 6.1C6.9 42.6 14.8 48 24 48z"/>
            </svg>
            Google
          </button>
          <button className="login-social-btn" onClick={() => {
            const user = { name: 'GitHub User', email: 'github@example.com' };
            localStorage.setItem('authUser', JSON.stringify(user));
            if (onLogin) onLogin(user);
            navigate('/');
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.4.6.1.82-.26.82-.58v-2.02c-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.21.09 1.85 1.24 1.85 1.24 1.07 1.83 2.81 1.3 3.49 1 .11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.04.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.83.57C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            GitHub
          </button>
        </div>

        <p className="login-footer-note">
          By signing in, you agree to our{' '}
          <a href="#" onClick={e => e.preventDefault()}>Terms</a> &amp;{' '}
          <a href="#" onClick={e => e.preventDefault()}>Privacy Policy</a>
        </p>
      </div>
    </div>
  );
}
