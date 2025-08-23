"use client";
import React from 'react';
import Link from 'next/link';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import Button from '../../components/Button';
import Card from '../../components/Card';
import AuthGuard from '../../components/AuthGuard';

interface DashboardContentProps {
  user?: {
    id: string;
    email: string;
    created_at: string;
  };
}

function DashboardContent({ user }: DashboardContentProps) {
  const handleSignOut = async () => {
    try {
      const { supabase } = await import('../../lib/supabaseClient');
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-1 pt-20">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto">
            {/* Welcome Banner */}
            <div className="mb-8 p-6 bg-gradient-to-r from-primary-accent/10 to-secondary-accent/10 border border-primary-accent/20 rounded-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold mb-2 text-text-headings">
                    Welcome, {user?.email || 'User'}!
                  </h1>
                  <p className="text-text-muted">
                    Your personalized learning dashboard
                  </p>
                </div>
                <Button variant="outline" onClick={handleSignOut} className="hidden md:flex">
                  Sign Out
                </Button>
              </div>
            </div>

            {/* Dashboard Sections */}
            <div className="space-y-8">
              {/* My Journeys Section */}
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-text-headings">My Journeys</h2>
                  <Link href="/assessment">
                    <Button variant="primary" size="sm">
                      Take Assessment
                    </Button>
                  </Link>
                </div>
                
                {/* Empty State for Journeys */}
                <Card className="p-8 text-center">
                  <div className="max-w-md mx-auto">
                    <div className="w-16 h-16 bg-gradient-primary-accent rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white text-2xl">🎯</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-text-headings">
                      Ready to Start Your Journey?
                    </h3>
                    <p className="text-text-muted mb-6">
                      Your personalized Foundation Journey will appear here after you take the assessment.
                    </p>
                    <Button variant="primary" className="shadow-glow-primary-hover">
                      Take Free Assessment
                    </Button>
                  </div>
                </Card>
              </section>

              {/* Progress Section */}
              <section>
                <h2 className="text-2xl font-bold text-text-headings mb-6">Progress</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <div className="p-6 text-center">
                      <div className="w-12 h-12 bg-gradient-secondary-accent rounded-xl flex items-center justify-center mx-auto mb-4">
                        <span className="text-white text-xl">📊</span>
                      </div>
                      <h3 className="font-semibold mb-1 text-text-headings">Assessment</h3>
                      <p className="text-2xl font-bold text-primary-accent mb-1">0%</p>
                      <p className="text-text-muted text-sm">Not started</p>
                    </div>
                  </Card>

                  <Card>
                    <div className="p-6 text-center">
                      <div className="w-12 h-12 bg-gradient-primary-accent rounded-xl flex items-center justify-center mx-auto mb-4">
                        <span className="text-white text-xl">📚</span>
                      </div>
                      <h3 className="font-semibold mb-1 text-text-headings">Lessons</h3>
                      <p className="text-2xl font-bold text-secondary-accent mb-1">0</p>
                      <p className="text-text-muted text-sm">Completed</p>
                    </div>
                  </Card>

                  <Card>
                    <div className="p-6 text-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary-accent to-secondary-accent rounded-xl flex items-center justify-center mx-auto mb-4">
                        <span className="text-white text-xl">🏆</span>
                      </div>
                      <h3 className="font-semibold mb-1 text-text-headings">Milestones</h3>
                      <p className="text-2xl font-bold text-status-success mb-1">0</p>
                      <p className="text-text-muted text-sm">Achieved</p>
                    </div>
                  </Card>
                </div>
              </section>

              {/* Settings Section */}
              <section>
                <h2 className="text-2xl font-bold text-text-headings mb-6">Settings</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <div className="p-6">
                      <h3 className="text-lg font-semibold mb-4 text-text-headings">Account Information</h3>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-primary-accent rounded-full flex items-center justify-center">
                            <span className="text-white font-bold">
                              {user?.email?.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-text-headings">{user?.email}</p>
                            <p className="text-text-muted text-sm">
                              Member since {new Date(user?.created_at || '').toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>

                  <Card>
                    <div className="p-6">
                      <h3 className="text-lg font-semibold mb-4 text-text-headings">Quick Actions</h3>
                      <div className="space-y-3">
                        <Button variant="secondary" size="sm" className="w-full justify-start">
                          📧 Update Email Preferences
                        </Button>
                        <Button variant="secondary" size="sm" className="w-full justify-start">
                          🔔 Notification Settings
                        </Button>
                        <Button variant="outline" size="sm" className="w-full justify-start text-status-error border-status-error/20 hover:bg-status-error/5">
                          🗑️ Delete Account
                        </Button>
                      </div>
                    </div>
                  </Card>
                </div>
              </section>
            </div>

            {/* Mobile Sign Out Button */}
            <div className="mt-8 md:hidden">
              <Button variant="outline" onClick={handleSignOut} className="w-full">
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default function DashboardPage() {
  return (
    <AuthGuard>
      <DashboardContent />
    </AuthGuard>
  );
}
