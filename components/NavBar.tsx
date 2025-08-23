"use client";
import Link from "next/link";
import { useState } from "react";

export default function NavBar({ user }: { user?: any }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full backdrop-blur-md bg-opacity-5 border-b border-white/4 fixed top-0 z-40">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Link href="/">
          <div className="flex items-center gap-3 cursor-pointer">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-elevx-teal to-elevx-orange flex items-center justify-center text-black font-bold">
              E
            </div>
            <span className="sr-only">ElevX homepage</span>
          </div>
        </Link>
        
        <nav className="hidden md:flex gap-6 items-center">
          <Link href="/courses">
            <span className="hover:text-elevx-teal transition-colors">Courses</span>
          </Link>
          <Link href="/assessment">
            <span className="hover:text-elevx-teal transition-colors">Assessment</span>
          </Link>
          <Link href="/pricing">
            <span className="hover:text-elevx-teal transition-colors">Pricing</span>
          </Link>
        </nav>
        
        <div className="flex items-center gap-3">
          <Link href="/assessment">
            <button className="btn-primary">Take Assessment</button>
          </Link>
          {user ? (
            <Link href="/dashboard">
              <button className="px-4 py-2 rounded-md border border-elevx-teal/20 hover:border-elevx-teal/40 transition-colors">
                Dashboard
              </button>
            </Link>
          ) : (
            <Link href="/login">
              <button className="px-4 py-2 rounded-md border border-elevx-teal/20 hover:border-elevx-teal/40 transition-colors">
                Login
              </button>
            </Link>
          )}
          <button 
            className="md:hidden p-2 rounded-md hover:bg-white/5 transition-colors" 
            onClick={() => setOpen(true)} 
            aria-label="Open menu"
          >
            ☰
          </button>
        </div>
      </div>
      
      {/* Mobile sheet */}
      {open && (
        <div className="fixed inset-0 bg-black/50 md:hidden" role="dialog" aria-modal="true">
          <div className="bg-elevx-navy p-6 h-full">
            <div className="flex justify-between items-center mb-6">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-elevx-teal to-elevx-orange flex items-center justify-center text-black font-bold">
                E
              </div>
              <button 
                onClick={() => setOpen(false)} 
                aria-label="Close menu"
                className="p-2 rounded-md hover:bg-white/5 transition-colors"
              >
                ✕
              </button>
            </div>
            <nav className="flex flex-col gap-4">
              <Link href="/courses" onClick={() => setOpen(false)}>
                <span className="block py-2 hover:text-elevx-teal transition-colors">Courses</span>
              </Link>
              <Link href="/assessment" onClick={() => setOpen(false)}>
                <span className="block py-2 hover:text-elevx-teal transition-colors">Assessment</span>
              </Link>
              <Link href="/pricing" onClick={() => setOpen(false)}>
                <span className="block py-2 hover:text-elevx-teal transition-colors">Pricing</span>
              </Link>
              <Link href="/login" onClick={() => setOpen(false)}>
                <span className="block py-2 hover:text-elevx-teal transition-colors">Login</span>
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
