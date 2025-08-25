import React from 'react'
import Link from 'next/link'
import NavBar from '../../components/NavBar'
import Footer from '../../components/Footer'
import Button from '../../components/Button'
import Card from '../../components/Card'

// Mock blog data - in a real app this would come from a CMS or database
const blogPosts = [
  {
    id: 1,
    slug: "micro-learning-techniques",
    title: "5 Micro-Learning Techniques That Actually Stick",
    excerpt: "Discover evidence-based strategies for making your learning sessions more effective and memorable.",
    author: "Dr. Sarah Chen",
    date: "2024-01-15",
    readTime: "5 min read",
    category: "Learning",
    tags: ["micro-learning", "productivity", "skill development"],
    featured: true,
    image: "/api/placeholder/400/250"
  },
  {
    id: 2,
    slug: "personalized-learning-paths",
    title: "The Science Behind Personalized Learning Paths",
    excerpt: "How AI and behavioral psychology combine to create truly personalized learning experiences.",
    author: "Mike Rodriguez",
    date: "2024-01-12",
    readTime: "7 min read",
    category: "AI & Technology",
    tags: ["AI", "personalization", "psychology"],
    featured: false,
    image: "/api/placeholder/400/250"
  },
  {
    id: 3,
    slug: "assessment-to-action",
    title: "From Assessment to Action: Your 21-Day Transformation Plan",
    excerpt: "A step-by-step guide to turning your assessment results into actionable daily habits.",
    author: "Alex Thompson",
    date: "2024-01-10",
    readTime: "8 min read",
    category: "Implementation",
    tags: ["habits", "transformation", "action plan"],
    featured: true,
    image: "/api/placeholder/400/250"
  },
  {
    id: 4,
    slug: "traditional-learning-failing",
    title: "Why Traditional Learning Methods Are Failing Busy Professionals",
    excerpt: "The hidden costs of outdated learning approaches and how to break free from them.",
    author: "Dr. Sarah Chen",
    date: "2024-01-08",
    readTime: "6 min read",
    category: "Learning",
    tags: ["traditional learning", "professional development", "efficiency"],
    featured: false,
    image: "/api/placeholder/400/250"
  },
  {
    id: 5,
    slug: "confidence-progress",
    title: "Building Confidence Through Measurable Progress",
    excerpt: "How tracking small wins leads to lasting confidence and career advancement.",
    author: "Mike Rodriguez",
    date: "2024-01-05",
    readTime: "4 min read",
    category: "Mindset",
    tags: ["confidence", "progress tracking", "career growth"],
    featured: false,
    image: "/api/placeholder/400/250"
  },
  {
    id: 6,
    slug: "10-minute-rule",
    title: "The 10-Minute Rule: Maximizing Learning in Minimal Time",
    excerpt: "Proven strategies for making the most of short learning sessions throughout your day.",
    author: "Alex Thompson",
    date: "2024-01-03",
    readTime: "5 min read",
    category: "Productivity",
    tags: ["time management", "efficiency", "micro-learning"],
    featured: false,
    image: "/api/placeholder/400/250"
  }
];

const categories = [
  { name: "All", count: blogPosts.length },
  { name: "Learning", count: blogPosts.filter(post => post.category === "Learning").length },
  { name: "AI & Technology", count: blogPosts.filter(post => post.category === "AI & Technology").length },
  { name: "Implementation", count: blogPosts.filter(post => post.category === "Implementation").length },
  { name: "Mindset", count: blogPosts.filter(post => post.category === "Mindset").length },
  { name: "Productivity", count: blogPosts.filter(post => post.category === "Productivity").length }
];

export default function ResourcesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="hero-section py-16">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-5xl lg:text-6xl font-extrabold mb-6 text-text-headings leading-tight">
                Resources & Insights
              </h1>
              <p className="text-xl text-text-muted mb-8 max-w-2xl mx-auto">
                Evidence-based strategies, practical tips, and expert insights to accelerate your personal and professional growth.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="primary" size="lg" className="shadow-glow-primary-hover">
                  Take Free Assessment
                </Button>
                <Button variant="secondary" size="lg" className="shadow-glow-secondary-hover">
                  Subscribe to Newsletter
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Featured Posts */}
        <section className="py-16 bg-primary-bg-secondary">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-text-headings">Featured Articles</h2>
              <p className="text-text-muted">Our most popular and impactful content</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {blogPosts.filter(post => post.featured).map((post) => (
                <Card key={post.id} className="featured-post overflow-hidden hover:scale-[1.02] transition-transform duration-300">
                  <div className="relative">
                    <div className="w-full h-48 bg-gradient-to-br from-primary-accent/20 to-secondary-accent/20 rounded-t-xl flex items-center justify-center">
                      <span className="text-4xl">📚</span>
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className="bg-primary-accent text-white text-xs px-2 py-1 rounded-full">
                        Featured
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-3">
                      <span className="text-primary-accent text-sm font-medium">{post.category}</span>
                      <span className="text-text-muted text-sm">•</span>
                      <span className="text-text-muted text-sm">{post.readTime}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-3 text-text-headings hover:text-primary-accent transition-colors">
                      <Link href={`/resources/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h3>
                    
                    <p className="text-text-muted mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-primary-accent rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">
                            {post.author.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-text-headings">{post.author}</p>
                          <p className="text-xs text-text-muted">{new Date(post.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                      
                      <Link href={`/resources/${post.slug}`}>
                        <Button variant="outline" size="sm">
                          Read More
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* Category Filter */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {categories.map((category) => (
                <button
                  key={category.name}
                  className="px-4 py-2 rounded-xl border border-border-subtle hover:border-primary-accent/30 hover:bg-primary-accent/5 transition-all duration-200 text-text-muted hover:text-text-headings"
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </div>
        </section>
        
        {/* All Posts Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-text-headings">Latest Articles</h2>
              <p className="text-text-muted">Fresh insights and practical advice</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {blogPosts.map((post) => (
                <Card key={post.id} className="blog-post overflow-hidden hover:scale-[1.02] transition-transform duration-300">
                  <div className="relative">
                    <div className="w-full h-40 bg-gradient-to-br from-secondary-accent/20 to-primary-accent/20 rounded-t-xl flex items-center justify-center">
                      <span className="text-3xl">📖</span>
                    </div>
                    {post.featured && (
                      <div className="absolute top-4 left-4">
                        <span className="bg-primary-accent text-white text-xs px-2 py-1 rounded-full">
                          Featured
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-3">
                      <span className="text-secondary-accent text-sm font-medium">{post.category}</span>
                      <span className="text-text-muted text-sm">•</span>
                      <span className="text-text-muted text-sm">{post.readTime}</span>
                    </div>
                    
                    <h3 className="text-lg font-bold mb-3 text-text-headings hover:text-secondary-accent transition-colors line-clamp-2">
                      <Link href={`/resources/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h3>
                    
                    <p className="text-text-muted mb-4 line-clamp-3 text-sm">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-secondary-accent rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">
                            {post.author.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-text-headings">{post.author}</p>
                          <p className="text-xs text-text-muted">{new Date(post.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                      
                      <Link href={`/resources/${post.slug}`}>
                        <Button variant="outline" size="sm">
                          Read
                        </Button>
                      </Link>
                    </div>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border-subtle">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-1 bg-secondary-bg/5 rounded-full text-text-muted"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            
            {/* Load More Button */}
            <div className="text-center mt-12">
              <Button variant="secondary" size="lg" className="shadow-glow-secondary-hover">
                Load More Articles
              </Button>
            </div>
          </div>
        </section>
        
        {/* Newsletter Signup */}
        <section className="py-16 bg-primary-bg-secondary">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4 text-text-headings">Stay Updated</h2>
              <p className="text-text-muted mb-8">
                Get the latest insights on personalized learning, productivity tips, and career growth strategies delivered to your inbox.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-xl bg-secondary-bg/5 border border-border-subtle text-text-headings placeholder-text-muted focus:outline-none focus:border-primary-accent/50 focus:ring-1 focus:ring-primary-accent/20 transition-all duration-200"
                />
                                  <Button variant="primary" className="shadow-glow-primary-hover">
                    Subscribe
                  </Button>
              </div>
              
              <p className="text-xs text-text-muted mt-4">
                No spam, unsubscribe at any time. We respect your privacy.
              </p>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-primary-bg">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4 text-text-headings">
              Ready to Transform Your Learning?
            </h2>
            <p className="text-text-muted mb-8 max-w-2xl mx-auto">
              Take our free assessment to get personalized insights and a custom learning path designed just for you.
            </p>
            
                          <Button variant="primary" size="lg" className="shadow-glow-primary-hover">
                Take Free Assessment Now
              </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
}
