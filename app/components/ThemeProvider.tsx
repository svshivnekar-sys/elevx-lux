"use client";
import React, { useState, useEffect } from 'react'

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [theme, setTheme] = useState<'dark'|'light'>('dark');

  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem('theme') : null;
    const t = stored === 'light' ? 'light' : 'dark';
    document.documentElement.classList.toggle('dark', t === 'dark');
    setTheme(t);
  }, []);

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.classList.toggle('dark', next === 'dark');
    localStorage.setItem('theme', next);
    setTheme(next);
  };

  return (
    <>
      <button 
        aria-label="Toggle theme" 
        onClick={toggle} 
        className="fixed z-50 right-4 top-4 p-2 rounded-md bg-opacity-20 hover:bg-opacity-30 transition-all"
      >
        {theme === 'dark' ? '🌙' : '☀️'}
      </button>
      {children}
    </>
  )
}
