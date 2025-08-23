import React from 'react'

export default function Home() {
  return (
    <main className="min-h-screen bg-elevx-navy text-elevx-text">
      <div className="container mx-auto px-4 py-24">
        <div className="bg-elevx-navy text-elevx-text p-8 rounded-xl">
          <h1 className="text-4xl font-bold mb-4">ElevX</h1>
          <p className="text-xl text-elevx-muted mb-6">Hyper-personalized micro-learning</p>
          <div className="space-y-4">
            <button className="btn-primary">Tailwind Test Button</button>
            <div className="card">
              <h2 className="text-lg font-semibold mb-2">Theme Test</h2>
              <p className="text-elevx-muted">Click the theme toggle in the top-right corner to test dark/light mode.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
