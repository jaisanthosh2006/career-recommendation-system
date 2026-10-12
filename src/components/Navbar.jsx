import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import ThemeToggle from './ThemeToggle';
import { Bell, Flame, Award, Cpu, Stethoscope, User, LogOut, ChevronDown, Check, Zap } from 'lucide-react';
import './Navbar.css';

export default function Navbar({ onLogout, onOpenAIWidget }) {
  const { activeDomain, setDomain, user, notifications, markAllNotificationsRead } = useStore();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header className="platform-navbar">
      {/* Brand & Domain Toggle */}
      <div className="navbar-left">
        <div className="platform-brand">
          <div className="brand-logo-icon">
            <Zap className="brand-icon" />
          </div>
          <div className="brand-text">
            <span className="brand-title">CAREER<span className="brand-highlight">AI</span></span>
            <span className="brand-subtitle">Intelligence Ecosystem</span>
          </div>
        </div>

        {/* Domain Switcher */}
        <div className="domain-switcher">
          <button
            className={`domain-btn ${activeDomain === 'cs' ? 'active cs' : ''}`}
            onClick={() => setDomain('cs')}
            title="Switch to Computer Science & IT Domain"
          >
            <Cpu size={16} />
            <span>Computer Science & IT</span>
            {activeDomain === 'cs' && <span className="active-dot" />}
          </button>
          
          <button
            className={`domain-btn ${activeDomain === 'medical' ? 'active medical' : ''}`}
            onClick={() => setDomain('medical')}
            title="Switch to Medical & Healthcare Domain"
          >
            <Stethoscope size={16} />
            <span>Medical & Healthcare</span>
            {activeDomain === 'medical' && <span className="active-dot" />}
          </button>
        </div>
      </div>

      {/* Right Action Items */}
      <div className="navbar-right">
        {/* Floating AI Assistant Launcher */}
        <button className="ai-assistant-btn" onClick={onOpenAIWidget}>
          <span className="ai-sparkle">✨</span>
          <span>Ask Career AI</span>
        </button>

        {/* Gamification Stats */}
        <div className="nav-stat-chip streak" title={`${user.streakDays} Day Learning Streak!`}>
          <Flame size={16} className="stat-icon-fire" />
          <span>{user.streakDays}d Streak</span>
        </div>

        <div className="nav-stat-chip xp" title={`${user.xpPoints} Experience Points`}>
          <Award size={16} className="stat-icon-xp" />
          <span>{user.xpPoints} XP</span>
        </div>

        {/* Notification Bell */}
        <div className="notification-wrapper">
          <button className="icon-nav-btn" onClick={() => setShowNotifications(!showNotifications)}>
            <Bell size={18} />
            {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
          </button>

          {showNotifications && (
            <div className="notifications-dropdown">
              <div className="notifications-header">
                <h4>Notifications</h4>
                <button onClick={markAllNotificationsRead} className="mark-read-btn">Mark read</button>
              </div>
              <div className="notifications-list">
                {notifications.map(n => (
                  <div key={n.id} className={`notification-item ${n.unread ? 'unread' : ''}`}>
                    <div className="notification-title">{n.title}</div>
                    <div className="notification-text">{n.text}</div>
                    <div className="notification-time">{n.time}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <ThemeToggle />

        {/* Profile Dropdown */}
        <div className="user-menu-wrapper">
          <button className="user-profile-trigger" onClick={() => setShowUserMenu(!showUserMenu)}>
            <div className="avatar-circle">
              {user.name.split(' ').map(n => n[0]).join('')}
            </div>
            <span className="user-name-text">{user.name}</span>
            <ChevronDown size={14} />
          </button>

          {showUserMenu && (
            <div className="user-dropdown-menu">
              <div className="user-menu-info">
                <p className="menu-user-name">{user.name}</p>
                <p className="menu-user-email">{user.email}</p>
                <span className={`domain-tag ${activeDomain}`}>
                  {activeDomain === 'cs' ? '💻 CS & IT Track' : '🏥 Medical Track'}
                </span>
              </div>
              <hr className="menu-divider" />
              <button className="user-menu-item" onClick={onLogout}>
                <LogOut size={16} />
                <span>Log Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
