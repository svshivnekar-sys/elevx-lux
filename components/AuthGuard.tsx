"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface AuthGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export default function AuthGuard({ children, fallback }: AuthGuardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { supabase } = await import('../lib/supabaseClient');
        
        // Get current session
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Auth check error:', error);
          setIsAuthenticated(false);
          setLoading(false);
          router.push('/login');
          return;
        }

        if (session?.user) {
          setIsAuthenticated(true);
          setUser(session.user);
        } else {
          setIsAuthenticated(false);
          router.push('/login');
        }
        
        setLoading(false);

        // Listen for auth state changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          async (event, session) => {
            if (event === 'SIGNED_OUT' || !session) {
              setIsAuthenticated(false);
              setUser(null);
              router.push('/login');
            } else if (event === 'SIGNED_IN' && session?.user) {
              setIsAuthenticated(true);
              setUser(session.user);
            }
          }
        );

        return () => subscription.unsubscribe();
      } catch (error) {
        console.error('Failed to initialize auth:', error);
        setIsAuthenticated(false);
        setLoading(false);
        router.push('/login');
      }
    };

    checkAuth();
  }, [router]);

  // Show loading state
  if (loading) {
    return (
      fallback || (
        <div className="min-h-screen flex items-center justify-center bg-primary-bg">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-primary-orange/30 border-t-primary-orange rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-text-muted">Loading...</p>
          </div>
        </div>
      )
    );
  }

  // If not authenticated, show nothing (redirect is happening)
  if (!isAuthenticated) {
    return null;
  }

  // Render protected content with user context
  return (
    <>
      {React.cloneElement(children as React.ReactElement<any>, { user })}
    </>
  );
}
