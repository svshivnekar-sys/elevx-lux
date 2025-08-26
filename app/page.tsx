import React from 'react'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import Button from '../components/Button'
import Card from '../components/Card'
import ScrollAnimation from '../components/ScrollAnimation'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-1 pt-20">
        {/* 1. Hero Section - Two Column Layout */}
        <section className="hero-section py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
              {/* Left Column - ICP Identification */}
              <div className="lg:col-span-2">
                <h1 className="text-5xl lg:text-6xl font-extrabold mb-8 text-text-headings leading-tight">
                  Are you working hard but still feeling stuck?
                </h1>
                
                {/* Checklist Items */}
                <div className="space-y-6 mb-8">
                  <div className="checklist-item group cursor-pointer">
                                <div className="flex items-start gap-4 p-4 rounded-2xl border border-border-subtle hover:border-primary-accent/20 transition-all duration-300 hover:bg-secondary-bg/5">
              <div className="w-6 h-6 rounded-full bg-primary-accent/20 flex items-center justify-center mt-1">
                <span className="text-primary-accent text-sm font-bold">1</span>
              </div>
                      <div className="flex-1">
                        <p className="text-xl font-semibold text-text-headings mb-2">
                          Do you learn randomly without direction?
                        </p>
                        <p className="text-text-muted opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          Discover a personalized roadmap built for your life and time.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="checklist-item group cursor-pointer">
                                <div className="flex items-start gap-4 p-4 rounded-2xl border border-border-subtle hover:border-primary-accent/20 transition-all duration-300 hover:bg-secondary-bg/5">
              <div className="w-6 h-6 rounded-full bg-primary-accent/20 flex items-center justify-center mt-1">
                <span className="text-primary-accent text-sm font-bold">2</span>
              </div>
                      <div className="flex-1">
                        <p className="text-xl font-semibold text-text-headings mb-2">
                          Struggling to make time for growth?
                        </p>
                        <p className="text-text-muted opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          Get 10-minute lessons designed for your busy schedule.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="checklist-item group cursor-pointer">
                                <div className="flex items-start gap-4 p-4 rounded-2xl border border-border-subtle hover:border-primary-accent/20 transition-all duration-300 hover:bg-secondary-bg/5">
              <div className="w-6 h-6 rounded-full bg-primary-accent/20 flex items-center justify-center mt-1">
                <span className="text-primary-accent text-sm font-bold">3</span>
              </div>
                      <div className="flex-1">
                        <p className="text-xl font-semibold text-text-headings mb-2">
                          Unclear about your strengths vs blind spots?
                        </p>
                        <p className="text-text-muted opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          Get instant clarity with evidence-backed assessment.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right Column - Video Card */}
              <div className="lg:col-span-1">
                <Card className="p-6">
                  <div className="relative mb-4">
                    <div className="w-full h-48 bg-gradient-to-br from-primary-accent/20 to-secondary-accent/20 rounded-xl flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-black/20"></div>
                      <button 
                        className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-200 z-10"
                        aria-label="Play introduction video"
                      >
                        <span className="text-primary-accent text-2xl ml-1">▶</span>
                      </button>
                      <div className="absolute inset-0 border-2 border-primary-accent/30 rounded-xl animate-pulse"></div>
                    </div>
                  </div>
                  
                  <p className="text-text-muted text-sm mb-6 text-center">
                    ElevX — Personalised life-skills training for busy professionals.
                  </p>
                  
                                  <Button variant="primary" size="lg" className="w-full shadow-glow-primary-hover">
                  Take the Free Assessment
                </Button>
                </Card>
              </div>
            </div>
          </div>
        </section>
        
        {/* 2. How ElevX Works - Treasure Hunt Zigzag */}
        <section className="py-24 bg-primary-bg-secondary">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 text-text-headings">How ElevX Works</h2>
              <p className="text-text-muted text-lg">Your journey to transformation in 4 simple steps</p>
            </div>
            
            <div className="relative">
              {/* Zigzag Path Line */}
                              <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary-accent/50 via-secondary-accent/50 to-primary-accent/50"></div>
              
              <div className="space-y-12 lg:space-y-0">
                {/* Step 1 - Assessment */}
                <ScrollAnimation animationType="slide-up" delay={100}>
                  <div className="treasure-step lg:grid lg:grid-cols-2 lg:gap-12 items-center">
                    <div className="lg:order-1">
                      <Card variant="accent" className="relative overflow-hidden">
                        <div className="absolute top-4 right-4">
                                          <div className="w-8 h-8 bg-gradient-primary-accent rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">🔍</span>
                </div>
                        </div>
                        <h3 className="text-2xl font-bold mb-3 text-text-headings">Assessment</h3>
                        <p className="text-text-muted mb-4">Start with clarity: 5 minutes, evidence-backed.</p>
                        <Button variant="outline" size="sm">Try sample assessment</Button>
                      </Card>
                    </div>
                    <div className="lg:order-2 lg:text-right">
                                      <div className="w-16 h-16 bg-gradient-primary-accent rounded-full flex items-center justify-center mx-auto lg:mx-0 mb-4">
                  <span className="text-white text-2xl">1</span>
                </div>
                    </div>
                  </div>
                </ScrollAnimation>
                
                {/* Step 2 - Personalized Learning Journey */}
                <ScrollAnimation animationType="slide-up" delay={300}>
                  <div className="treasure-step lg:grid lg:grid-cols-2 lg:gap-12 items-center">
                    <div className="lg:order-2">
                                      <div className="w-16 h-16 bg-gradient-secondary-accent rounded-full flex items-center justify-center mx-auto lg:mx-0 mb-4">
                  <span className="text-white text-2xl">2</span>
                </div>
                    </div>
                    <div className="lg:order-1">
                      <Card variant="accent" className="relative overflow-hidden">
                        <div className="absolute top-4 right-4">
                                          <div className="w-8 h-8 bg-gradient-secondary-accent rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">🗺️</span>
                </div>
                        </div>
                        <h3 className="text-2xl font-bold mb-3 text-text-headings">Personalized Learning Journey</h3>
                        <p className="text-text-muted mb-4">21-day path tailored to your weakest & strongest skills.</p>
                        <Button variant="outline" size="sm">Try sample assessment</Button>
                      </Card>
                    </div>
                  </div>
                </ScrollAnimation>
                
                {/* Step 3 - Regular Assessments */}
                <ScrollAnimation animationType="slide-up" delay={500}>
                  <div className="treasure-step lg:grid lg:grid-cols-2 lg:gap-12 items-center">
                    <div className="lg:order-1">
                      <Card variant="accent" className="relative overflow-hidden">
                        <div className="absolute top-4 right-4">
                                          <div className="w-8 h-8 bg-gradient-primary-accent rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">📊</span>
                </div>
                        </div>
                        <h3 className="text-2xl font-bold mb-3 text-text-headings">Regular Assessments</h3>
                        <p className="text-text-muted mb-4">Progress checks that adapt your plan.</p>
                        <Button variant="outline" size="sm">Try sample assessment</Button>
                      </Card>
                    </div>
                    <div className="lg:order-2 lg:text-right">
                                      <div className="w-16 h-16 bg-gradient-primary-accent rounded-full flex items-center justify-center mx-auto lg:mx-0 mb-4">
                  <span className="text-white text-2xl">3</span>
                </div>
                    </div>
                  </div>
                </ScrollAnimation>
                
                {/* Step 4 - Free Rewards */}
                <ScrollAnimation animationType="slide-up" delay={700}>
                  <div className="treasure-step lg:grid lg:grid-cols-2 lg:gap-12 items-center">
                    <div className="lg:order-2">
                                      <div className="w-16 h-16 bg-gradient-secondary-accent rounded-full flex items-center justify-center mx-auto lg:mx-0 mb-4">
                  <span className="text-white text-2xl">4</span>
                </div>
                    </div>
                    <div className="lg:order-1">
                      <Card variant="accent" className="relative overflow-hidden">
                        <div className="absolute top-4 right-4">
                                          <div className="w-8 h-8 bg-gradient-secondary-accent rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">🎁</span>
                </div>
                        </div>
                        <h3 className="text-2xl font-bold mb-3 text-text-headings">Free Rewards</h3>
                        <p className="text-text-muted mb-4">Complete milestones → unlock real incentives.</p>
                        <Button variant="outline" size="sm">Try sample assessment</Button>
                      </Card>
                    </div>
                  </div>
                </ScrollAnimation>
              </div>
            </div>
          </div>
        </section>
        
        {/* 3. Why ElevX Is Better - Stacking Card Sequence */}
        <section className="py-24">
          <div className="container mx-auto px-4">
          <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 text-text-headings">Why ElevX beats the rest</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {/* Card 1 */}
              <ScrollAnimation animationType="fade-in" delay={100}>
                <Card className="stacking-card text-center p-6 hover:border-primary-accent/40 transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-primary-accent rounded-xl mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white text-xl">🎯</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-text-headings">Hyper-Personalized</h3>
                  <p className="text-text-muted">Built for your priorities, not a syllabus.</p>
                </Card>
              </ScrollAnimation>
              
              {/* Card 2 */}
              <ScrollAnimation animationType="fade-in" delay={200}>
                <Card className="stacking-card text-center p-6 hover:border-secondary-accent/40 transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-secondary-accent rounded-xl mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white text-xl">⚡</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-text-headings">Implementation-Based</h3>
                  <p className="text-text-muted">Learn → do → change. Action every day.</p>
                </Card>
              </ScrollAnimation>
              
              {/* Card 3 */}
              <ScrollAnimation animationType="fade-in" delay={300}>
                <Card className="stacking-card text-center p-6 hover:border-primary-accent/40 transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-primary-accent rounded-xl mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white text-xl">⏱️</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-text-headings">No-Fluff Micro-Learning</h3>
                  <p className="text-text-muted">10 minutes. Focused. Applied.</p>
                </Card>
              </ScrollAnimation>
              
              {/* Card 4 */}
              <ScrollAnimation animationType="fade-in" delay={400}>
                <Card className="stacking-card text-center p-6 hover:border-secondary-accent/40 transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-secondary-accent rounded-xl mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white text-xl">🤖</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-text-headings">AI-Powered</h3>
                  <p className="text-text-muted">Adaptive nudges and path optimization.</p>
                </Card>
              </ScrollAnimation>
              
              {/* Card 5 */}
              <ScrollAnimation animationType="fade-in" delay={500}>
                <Card className="stacking-card text-center p-6 hover:border-primary-accent/40 transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-primary-accent rounded-xl mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white text-xl">🌟</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-text-headings">Life-Skills Enhancing</h3>
                  <p className="text-text-muted">Skills that help at work and in life.</p>
                </Card>
              </ScrollAnimation>
            </div>
            
            <div className="text-center mt-12">
                              <Button variant="primary" size="lg" className="shadow-glow-primary-hover mb-4">
                  Start Your Free Assessment
              </Button>
              <p className="text-text-muted text-sm">Takes 5 minutes. Immediate personalized plan.</p>
            </div>
          </div>
        </section>
        
        {/* 4. Benefits & Incentives */}
        <section className="py-24 bg-primary-bg-secondary">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4 text-text-headings">What you get with ElevX</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
              <div className="benefit-tile p-6 rounded-2xl border border-border-subtle hover:border-primary-accent/20 transition-all duration-300 hover:bg-secondary-bg/5 group">
                <h3 className="text-lg font-semibold mb-2 text-text-headings">Instant clarity on strengths & blind spots</h3>
                <p className="text-text-muted text-sm mb-3">Get evidence-backed insights in minutes</p>
                <Button variant="outline" size="sm">Unlock this by taking the assessment</Button>
              </div>
              
              <div className="benefit-tile p-6 rounded-2xl border border-border-subtle hover:border-secondary-accent/20 transition-all duration-300 hover:bg-secondary-bg/5 group">
                <h3 className="text-lg font-semibold mb-2 text-text-headings">21-day personalized action path</h3>
                <p className="text-text-muted text-sm mb-3">Tailored to your specific goals and schedule</p>
                <Button variant="outline" size="sm">Unlock this by taking the assessment</Button>
              </div>
              
              <div className="benefit-tile p-6 rounded-2xl border border-border-subtle hover:border-primary-accent/20 transition-all duration-300 hover:bg-secondary-bg/5 group">
                <h3 className="text-lg font-semibold mb-2 text-text-headings">10-minute lessons — built for busy days</h3>
                <p className="text-text-muted text-sm mb-3">Micro-learning that fits your lifestyle</p>
                <Button variant="outline" size="sm">Unlock this by taking the assessment</Button>
              </div>
              
              <div className="benefit-tile p-6 rounded-2xl border border-border-subtle hover:border-secondary-accent/20 transition-all duration-300 hover:bg-secondary-bg/5 group">
                <h3 className="text-lg font-semibold mb-2 text-text-headings">Progress tracking & measurable wins</h3>
                <p className="text-text-muted text-sm mb-3">See your growth with clear metrics</p>
                <Button variant="outline" size="sm">Unlock this by taking the assessment</Button>
              </div>
              
              <div className="benefit-tile p-6 rounded-2xl border border-border-subtle hover:border-primary-accent/20 transition-all duration-300 hover:bg-secondary-bg/5 group">
                <h3 className="text-lg font-semibold mb-2 text-text-headings">Earn real rewards for milestones</h3>
                <p className="text-text-muted text-sm mb-3">Get incentives for your achievements</p>
                <Button variant="outline" size="sm">Unlock this by taking the assessment</Button>
              </div>
              
              <div className="benefit-tile p-6 rounded-2xl border border-border-subtle hover:border-secondary-accent/20 transition-all duration-300 hover:bg-secondary-bg/5 group">
                <h3 className="text-lg font-semibold mb-2 text-text-headings">Lifetime techniques for real-world impact</h3>
                <p className="text-text-muted text-sm mb-3">Skills that last beyond the program</p>
                <Button variant="outline" size="sm">Unlock this by taking the assessment</Button>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-lg font-bold text-text-headings">Growth that pays you back.</p>
            </div>
          </div>
        </section>
        
        {/* 5. Testimonials - Success Stories */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 text-text-headings">Real Stories. Real Change.</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
              {/* Testimonial 1 */}
              <Card className="testimonial-card p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-primary-accent rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold">S</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-headings">Sarah Chen</h4>
                    <p className="text-text-muted text-sm">Product Manager</p>
                  </div>
                </div>
                <p className="text-text-muted mb-4">"ElevX helped me identify my communication blind spots. I'm now more confident in presentations and team meetings."</p>
                <div className="inline-block bg-primary-accent/10 text-primary-accent text-xs px-2 py-1 rounded-full">
                  +27% confidence
                </div>
              </Card>
              
              {/* Testimonial 2 */}
              <Card className="testimonial-card p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-secondary-accent rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold">M</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-headings">Mike Rodriguez</h4>
                    <p className="text-text-muted text-sm">Software Engineer</p>
                  </div>
                </div>
                <p className="text-text-muted mb-4">"The 10-minute lessons fit perfectly into my busy schedule. I've learned more in 3 weeks than in months of random courses."</p>
                <div className="inline-block bg-secondary-accent/10 text-secondary-accent text-xs px-2 py-1 rounded-full">
                  +40% productivity
                </div>
              </Card>
              
              {/* Testimonial 3 */}
              <Card className="testimonial-card p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-primary-accent rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold">A</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-headings">Alex Thompson</h4>
                    <p className="text-text-muted text-sm">Marketing Director</p>
                  </div>
                </div>
                <p className="text-text-muted mb-4">"The personalized approach made all the difference. I finally have a clear roadmap for my career growth."</p>
                <div className="inline-block bg-primary-accent/10 text-primary-accent text-xs px-2 py-1 rounded-full">
                  +35% clarity
                </div>
              </Card>
            </div>
            
            <div className="text-center">
              <Button variant="primary" size="lg" className="shadow-glow-primary-hover">
                See more transformations — Take the Free Assessment
              </Button>
            </div>
          </div>
        </section>
        
        {/* 6. Final Conversion - Full-width CTA */}
        <section className="py-24 bg-primary-bg">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-text-headings">
              Your future self is waiting. Why wait another year?
            </h2>
            <p className="text-text-muted text-lg mb-8 max-w-2xl mx-auto">
              No cost. 5 minutes. A roadmap to the next version of you.
            </p>
            
            <Button variant="primary" size="lg" className="shadow-glow-primary-hover mb-4">
              Take the Free Assessment Now →
            </Button>
            
            <p className="text-text-muted text-sm">
              We respect your privacy — no spam. Assessment is free.
            </p>
          </div>
        </section>
      </main>
      
      <Footer />
      
      {/* Floating CTA - Sticky bottom-right */}
      <div className="fixed bottom-6 right-6 z-50 opacity-60 hover:opacity-100 transition-opacity duration-300 floating-cta">
        <Button variant="primary" size="lg" className="shadow-glow-primary-hover shadow-lg">
          Take Assessment
        </Button>
      </div>
    </div>
  )
}
