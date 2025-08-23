"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [supabaseClient, setSupabaseClient] = useState<any>(null);

  // Initialize Supabase client on mount
  useEffect(() => {
    const initSupabase = async () => {
      try {
        const { supabase } = await import('../lib/supabaseClient');
        setSupabaseClient(supabase);
      } catch (error) {
        console.error('Failed to initialize Supabase:', error);
      }
    };
    initSupabase();
  }, []);

  useEffect(() => {
    if (!supabaseClient) return;

    // Get initial session
    const getSession = async () => {
      const { data: { session } } = await supabaseClient.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };

    getSession();

    // Listen for auth changes
    const { data: { subscription } } = supabaseClient.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, [supabaseClient]);

  const handleSignOut = async () => {
    if (supabaseClient) {
      await supabaseClient.auth.signOut();
    }
  };

  return (
    <header className="w-full backdrop-blur-md bg-primary-bg/80 border-b border-border-subtle fixed top-0 z-40 glass-effect">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Link href="/">
          <div className="flex items-center gap-3 cursor-pointer group">
            <div className="w-10 h-10 rounded-lg bg-gradient-primary-accent flex items-center justify-center text-white font-bold shadow-glow-primary group-hover:shadow-glow-primary-hover transition-all duration-200">
              E
            </div>
            <span className="sr-only">ElevX homepage</span>
          </div>
        </Link>
        
        <nav className="hidden md:flex gap-6 items-center">
          <Link href="/resources">
            <span className="text-text-body hover:text-secondary-accent transition-colors duration-200">Resources</span>
          </Link>
          <Link href="/services">
            <span className="text-text-body hover:text-secondary-accent transition-colors duration-200">Services</span>
          </Link>
          <Link href="/courses">
            <span className="text-text-body hover:text-secondary-accent transition-colors duration-200">Courses</span>
          </Link>
          <Link href="/assessment">
            <span className="text-text-body hover:text-secondary-accent transition-colors duration-200">Assessment</span>
          </Link>
          <Link href="/pricing">
            <span className="text-text-body hover:text-secondary-accent transition-colors duration-200">Pricing</span>
          </Link>
        </nav>
        
        <div className="flex items-center gap-3">
          <Link href="/assessment">
            <button className="bg-gradient-primary-accent text-white px-5 py-2 rounded-2xl font-semibold shadow-glow-primary hover:shadow-glow-primary-hover hover:-translate-y-0.5 transition-all duration-200">
              Take Assessment
            </button>
          </Link>
          
          {!loading && (
            <>
              {user ? (
                <div className="flex items-center gap-3">
                  <Link href="/dashboard">
                    <button className="px-4 py-2 rounded-xl border border-secondary-accent/20 hover:border-secondary-accent hover:bg-secondary-accent/5 text-text-body hover:text-secondary-accent transition-all duration-200">
                      Dashboard
                    </button>
                  </Link>
                  <button 
                    onClick={handleSignOut}
                    className="px-4 py-2 rounded-xl border border-border-subtle hover:border-text-muted hover:bg-text-muted/5 text-text-body hover:text-text-headings transition-all duration-200"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <Link href="/login">
                  <button className="px-4 py-2 rounded-xl border border-secondary-accent/20 hover:border-secondary-accent hover:bg-secondary-accent/5 text-text-body hover:text-secondary-accent transition-all duration-200">
                    Login
                  </button>
                </Link>
              )}
            </>
          )}
          
          <button 
            className="md:hidden p-2 rounded-xl hover:bg-secondary-bg text-text-body hover:text-text-headings transition-all duration-200" 
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
          <div className="bg-primary-bg p-6 h-full">
            <div className="flex justify-between items-center mb-6">
              <div className="w-8 h-8 rounded-lg bg-gradient-primary-accent flex items-center justify-center text-white font-bold shadow-glow-primary">
                E
              </div>
              <button 
                onClick={() => setOpen(false)} 
                aria-label="Close menu"
                className="p-2 rounded-xl hover:bg-secondary-bg text-text-body hover:text-text-headings transition-all duration-200"
              >
                ✕
              </button>
            </div>
            <nav className="flex flex-col gap-4">
              <Link href="/resources" onClick={() => setOpen(false)}>
                <span className="block py-2 text-text-body hover:text-secondary-accent transition-colors duration-200">Resources</span>
              </Link>
              <Link href="/services" onClick={() => setOpen(false)}>
                <span className="block py-2 text-text-body hover:text-secondary-accent transition-colors duration-200">Services</span>
              </Link>
              <Link href="/courses" onClick={() => setOpen(false)}>
                <span className="block py-2 text-text-body hover:text-secondary-accent transition-colors duration-200">Courses</span>
              </Link>
              <Link href="/assessment" onClick={() => setOpen(false)}>
                <span className="block py-2 text-text-body hover:text-secondary-accent transition-colors duration-200">Assessment</span>
              </Link>
              <Link href="/pricing" onClick={() => setOpen(false)}>
                <span className="block py-2 text-text-body hover:text-secondary-accent transition-colors duration-200">Pricing</span>
              </Link>
              
              {!loading && (
                <>
                  {user ? (
                    <>
                      <Link href="/dashboard" onClick={() => setOpen(false)}>
                        <span className="block py-2 text-text-body hover:text-secondary-accent transition-colors duration-200">Dashboard</span>
                      </Link>
                      <button 
                        onClick={() => {
                          handleSignOut();
                          setOpen(false);
                        }}
                        className="block w-full text-left py-2 text-text-body hover:text-secondary-accent transition-colors duration-200"
                      >
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <Link href="/login" onClick={() => setOpen(false)}>
                      <span className="block py-2 text-text-body hover:text-secondary-accent transition-colors duration-200">Login</span>
                    </Link>
                  )}
                </>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
