"use client";
import React, { useState, useEffect } from 'react'

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [theme, setTheme] = useState<'dark'|'light'>('dark');

  useEffect(() => {
    // Dark theme is default - only use light if explicitly stored
    const stored = typeof window !== "undefined" ? localStorage.getItem('theme') : null;
    const t = stored === 'light' ? 'light' : 'dark';
    
    // Apply theme to document
    if (t === 'light') {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    }
    
    setTheme(t);
  }, []);

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    
    // Apply theme to document
    if (next === 'light') {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    }
    
    localStorage.setItem('theme', next);
    setTheme(next);
  };

  return (
    <>
      <button 
        aria-label="Toggle theme" 
        onClick={toggle} 
        className="fixed z-50 right-4 top-4 p-3 rounded-xl glass-effect hover:bg-white/[0.05] transition-all duration-200 glow-orange-hover"
      >
        {theme === 'dark' ? '🌙' : '☀️'}
      </button>
      {children}
    </>
  )
}
