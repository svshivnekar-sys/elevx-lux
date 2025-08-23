import React from 'react'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import Button from '../components/Button'
import Card from '../components/Card'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-1 pt-20">
        <div className="container mx-auto px-4 py-24">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-6">ElevX</h1>
            <p className="text-xl text-elevx-muted mb-8">Hyper-personalized micro-learning</p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" size="lg">
                Take Assessment
              </Button>
              <Button variant="outline" size="lg">
                Explore Courses
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <h3 className="text-lg font-semibold mb-2">Personalized Journey</h3>
              <p className="text-elevx-muted">AI-powered learning paths tailored to your goals and progress.</p>
            </Card>
            
            <Card>
              <h3 className="text-lg font-semibold mb-2">Implementation Focus</h3>
              <p className="text-elevx-muted">Practical lessons designed for real-world application and behavioral change.</p>
            </Card>
            
            <Card>
              <h3 className="text-lg font-semibold mb-2">Measurable Outcomes</h3>
              <p className="text-elevx-muted">Track your progress with clear metrics and achievement milestones.</p>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
