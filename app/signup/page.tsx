"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import Button from '../../components/Button';

export default function SignupPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to login page since magic link handles both signup and login
    router.push('/login');
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-1 pt-20">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center">
            <div className="card p-8">
              <div className="mb-6">
                <div className="w-16 h-16 bg-gradient-primary-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">📧</span>
                </div>
                <h1 className="text-2xl font-bold mb-2 text-text-headings">
                  Redirecting to Login
                </h1>
                <p className="text-text-muted">
                  Magic link authentication handles both signup and login automatically.
                </p>
              </div>
              
              <div className="space-y-4">
                <p className="text-sm text-text-muted">
                  If you're not redirected automatically, click the button below.
                </p>
                
                <Link href="/login">
                  <Button variant="primary" className="w-full">
                    Go to Login
                  </Button>
                </Link>
                
                <div className="pt-4 border-t border-white/[0.05]">
                  <p className="text-xs text-text-muted">
                    Already have an account?{' '}
                    <Link href="/login" className="text-primary-accent hover:text-primary-accent/80">
                      Sign in here
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}


