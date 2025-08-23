"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import Button from '../../components/Button';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [supabaseClient, setSupabaseClient] = useState<any>(null);
  const router = useRouter();

  // Initialize Supabase client on mount
  useEffect(() => {
    const initSupabase = async () => {
      try {
        const { supabase } = await import('../../lib/supabaseClient');
        setSupabaseClient(supabase);
      } catch (error) {
        console.error('Failed to initialize Supabase:', error);
        setMessage({ type: 'error', text: 'Authentication service unavailable. Please try again later.' });
      }
    };
    initSupabase();
  }, []);

  // Handle magic link callback on page load
  useEffect(() => {
    if (!supabaseClient) return;

    const handleMagicLinkCallback = async () => {
      try {
        // Get the current session
        const { data: { session }, error } = await supabaseClient.auth.getSession();
        
        if (error) {
          console.error('Session error:', error);
          setMessage({ type: 'error', text: 'Invalid or expired magic link. Please try again.' });
          return;
        }

        if (session) {
          // Check if user profile exists, create if not
          const { data: profile, error: profileError } = await supabaseClient
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

          if (profileError && profileError.code === 'PGRST116') {
            // Profile doesn't exist, create one
            const { error: insertError } = await supabaseClient
              .from('profiles')
              .insert([
                {
                  id: session.user.id,
                  email: session.user.email,
                  created_at: new Date().toISOString(),
                  updated_at: new Date().toISOString(),
                }
              ]);

            if (insertError) {
              console.error('Error creating profile:', insertError);
            }
          }

          setMessage({ type: 'success', text: 'Login successful! Redirecting to dashboard...' });
          setTimeout(() => {
            router.push('/dashboard');
          }, 1500);
        }
      } catch (error) {
        console.error('Magic link callback error:', error);
        setMessage({ type: 'error', text: 'An error occurred. Please try again.' });
      }
    };

    // Check if this is a magic link callback by looking for auth parameters
    const urlParams = new URLSearchParams(window.location.search);
    const hasAuthParams = urlParams.get('access_token') || urlParams.get('error') || urlParams.get('refresh_token');
    
    if (hasAuthParams) {
      handleMagicLinkCallback();
    }
  }, [router, supabaseClient]);

  // Email validation
  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidEmail(emailRegex.test(email));
  }, [email]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!supabaseClient) {
      setMessage({ type: 'error', text: 'Authentication service is loading. Please try again.' });
      return;
    }
    
    if (!isValidEmail) {
      setMessage({ type: 'error', text: 'Please enter a valid email address.' });
      return;
    }

    setIsLoading(true);
    setMessage(null);

    try {
      const { error } = await supabaseClient.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/login`,
        },
      });

      if (error) {
        throw error;
      }

      setMessage({
        type: 'success',
        text: 'Magic link sent! Check your email (including spam folder) and click the link to sign in.'
      });
      setEmail('');
    } catch (error: any) {
      console.error('Login error:', error);
      setMessage({
        type: 'error',
        text: error.message || 'Failed to send magic link. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-1 pt-20">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-4 text-text-headings">
                Welcome Back
              </h1>
              <p className="text-text-muted">
                Sign in to continue your learning journey
              </p>
            </div>

            {/* Login Form */}
            <div className="card p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Input */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-text-headings mb-2">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 ${
                      isValidEmail && email
                        ? 'border-secondary-accent/50 focus:border-secondary-accent focus:ring-secondary-accent/20'
                        : email && !isValidEmail
                        ? 'border-status-error/50 focus:border-status-error focus:ring-status-error/20'
                        : 'border-border-subtle focus:border-primary-accent/50 focus:ring-primary-accent/20'
                    } bg-secondary-bg/5 text-text-headings placeholder-text-muted`}
                    disabled={isLoading}
                    required
                  />
                  {email && !isValidEmail && (
                    <p className="text-status-error text-sm mt-1">
                      Please enter a valid email address
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full shadow-glow-primary-hover"
                  disabled={isLoading || !isValidEmail || !email || !supabaseClient}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Sending Magic Link...
                    </div>
                  ) : (
                    'Send Magic Link'
                  )}
                </Button>

                {/* Message Display */}
                {message && (
                  <div className={`p-4 rounded-xl border ${
                    message.type === 'success'
                      ? 'bg-status-success/10 border-status-success/20 text-status-success'
                      : 'bg-status-error/10 border-status-error/20 text-status-error'
                  }`}>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">
                        {message.type === 'success' ? '✅' : '❌'}
                      </span>
                      <p className="text-sm">{message.text}</p>
                    </div>
                  </div>
                )}

                {/* Info Box */}
                <div className="p-4 bg-secondary-accent/5 border border-secondary-accent/20 rounded-xl">
                  <div className="flex items-start gap-3">
                    <span className="text-secondary-accent text-lg">💡</span>
                    <div className="text-sm text-text-muted">
                      <p className="font-medium text-text-headings mb-1">How it works:</p>
                      <ul className="space-y-1">
                        <li>• Enter your email address</li>
                        <li>• Check your inbox for a magic link</li>
                        <li>• Click the link to sign in instantly</li>
                        <li>• No password required!</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </form>
            </div>

            {/* Footer Links */}
            <div className="text-center mt-8 space-y-4">
              <p className="text-text-muted text-sm">
                Don't have an account?{' '}
                <Link href="/signup" className="text-primary-accent hover:text-primary-accent/80 transition-colors">
                  Sign up here
                </Link>
              </p>
              
              <div className="flex justify-center gap-6 text-sm">
                <Link href="/resources" className="text-text-muted hover:text-secondary-accent transition-colors">
                  Resources
                </Link>
                <Link href="/assessment" className="text-text-muted hover:text-secondary-accent transition-colors">
                  Take Assessment
                </Link>
                <Link href="/help" className="text-text-muted hover:text-secondary-accent transition-colors">
                  Help
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
