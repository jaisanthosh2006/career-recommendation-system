import React, { useState } from 'react';
import './ThemeToggle.css';

function ThemeToggle() {
  const [dark, setDark] = useState(true);

  const toggle = () => {
    setDark(!dark);
    document.documentElement.setAttribute('data-theme', dark ? 'light' : 'dark');
  };

  return (
    <button className="theme-toggle" onClick={toggle} aria-label="Toggle theme">
      {dark ? '☀️' : '🌙'}
    </button>
  );
}

export default ThemeToggle;
