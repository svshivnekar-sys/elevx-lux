import React from 'react'
import Link from 'next/link'
import NavBar from '../../../components/NavBar'
import Footer from '../../../components/Footer'
import Button from '../../../components/Button'
import Card from '../../../components/Card'

// Mock blog data - in a real app this would come from a CMS or database
const blogPosts = [
  {
    slug: "micro-learning-techniques",
    title: "5 Micro-Learning Techniques That Actually Stick",
    excerpt: "Discover evidence-based strategies for making your learning sessions more effective and memorable.",
    content: `
      <p>In today's fast-paced world, traditional learning methods often fall short for busy professionals. Micro-learning has emerged as a powerful solution, but not all micro-learning approaches are created equal. Here are five evidence-based techniques that actually work.</p>
      
      <h2>1. Spaced Repetition</h2>
      <p>Spaced repetition is based on the psychological principle that we remember information better when we review it at increasing intervals. Instead of cramming, review new concepts at 1 day, 3 days, 7 days, and 14 days after initial learning.</p>
      
      <h2>2. Active Recall</h2>
      <p>Rather than passively reading or watching, actively test your knowledge. Use flashcards, self-quizzing, or explain concepts to others. This forces your brain to retrieve information, strengthening neural pathways.</p>
      
      <h2>3. Interleaving</h2>
      <p>Mix different topics or skills within a single learning session. This might feel less efficient initially, but it leads to better long-term retention and improved ability to apply knowledge flexibly.</p>
      
      <h2>4. Concrete Examples</h2>
      <p>Abstract concepts are harder to remember. Always pair new information with concrete, real-world examples. The more vivid and relevant the example, the better the retention.</p>
      
      <h2>5. Immediate Application</h2>
      <p>Apply new knowledge within 24 hours of learning it. This could be through practice exercises, real-world implementation, or teaching someone else. Immediate application cements learning.</p>
      
      <h2>Putting It All Together</h2>
      <p>The most effective micro-learning sessions combine multiple techniques. For example, learn a new concept, immediately apply it, then review it using spaced repetition with active recall.</p>
      
      <p>Remember, consistency beats intensity. Five minutes of focused, technique-driven learning daily is more effective than hours of passive study once a week.</p>
    `,
    author: "Dr. Sarah Chen",
    date: "2024-01-15",
    readTime: "5 min read",
    category: "Learning",
    tags: ["micro-learning", "productivity", "skill development"],
    featured: true,
    image: "/api/placeholder/800/400"
  },
  {
    slug: "personalized-learning-paths",
    title: "The Science Behind Personalized Learning Paths",
    excerpt: "How AI and behavioral psychology combine to create truly personalized learning experiences.",
    content: `
      <p>Personalized learning isn't just a buzzword—it's a scientifically-backed approach that can dramatically improve learning outcomes. Here's how modern technology and psychology work together to create truly individualized learning experiences.</p>
      
      <h2>The Psychology of Personalization</h2>
      <p>Every individual has unique cognitive patterns, learning preferences, and knowledge gaps. Traditional one-size-fits-all approaches ignore these differences, leading to suboptimal learning outcomes.</p>
      
      <h2>AI-Powered Assessment</h2>
      <p>Modern AI systems can analyze learning patterns, identify knowledge gaps, and predict which content will be most effective for each individual. This goes far beyond simple quizzes—it's about understanding how each person learns.</p>
      
      <h2>Adaptive Content Delivery</h2>
      <p>Based on assessment results, AI systems can dynamically adjust content difficulty, presentation style, and pacing to match individual needs. This ensures optimal cognitive load and engagement.</p>
      
      <h2>Behavioral Nudging</h2>
      <p>Using principles from behavioral psychology, personalized systems can provide timely reminders, encouragement, and motivation that resonate with each learner's specific patterns and preferences.</p>
      
      <h2>Continuous Optimization</h2>
      <p>The system learns from each interaction, continuously improving its understanding of the individual and refining the learning path accordingly.</p>
    `,
    author: "Mike Rodriguez",
    date: "2024-01-12",
    readTime: "7 min read",
    category: "AI & Technology",
    tags: ["AI", "personalization", "psychology"],
    featured: false,
    image: "/api/placeholder/800/400"
  }
];

// Mock related posts
const relatedPosts = [
  {
    slug: "traditional-learning-failing",
    title: "Why Traditional Learning Methods Are Failing Busy Professionals",
    excerpt: "The hidden costs of outdated learning approaches and how to break free from them.",
    author: "Dr. Sarah Chen",
    date: "2024-01-08",
    readTime: "6 min read",
    category: "Learning"
  },
  {
    slug: "confidence-progress",
    title: "Building Confidence Through Measurable Progress",
    excerpt: "How tracking small wins leads to lasting confidence and career advancement.",
    author: "Mike Rodriguez",
    date: "2024-01-05",
    readTime: "4 min read",
    category: "Mindset"
  }
];

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = blogPosts.find(p => p.slug === slug);
  
  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-1 pt-20">
          <div className="container mx-auto px-4 py-24 text-center">
            <h1 className="text-4xl font-bold mb-4 text-text-headings">Article Not Found</h1>
            <p className="text-text-muted mb-8">The article you're looking for doesn't exist.</p>
            <Link href="/resources">
              <Button variant="primary">Back to Resources</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-1 pt-20">
        {/* Article Header */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Breadcrumb */}
              <nav className="mb-8">
                <ol className="flex items-center space-x-2 text-sm text-text-muted">
                  <li>
                    <Link href="/" className="hover:text-primary-accent transition-colors">
                      Home
                    </Link>
                  </li>
                  <li>•</li>
                  <li>
                    <Link href="/resources" className="hover:text-primary-accent transition-colors">
                      Resources
                    </Link>
                  </li>
                  <li>•</li>
                  <li>
                    <span className="text-text-headings">{post.title}</span>
                  </li>
                </ol>
              </nav>
              
              {/* Article Meta */}
              <div className="mb-8">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-primary-accent text-sm font-medium">{post.category}</span>
                  <span className="text-text-muted text-sm">•</span>
                  <span className="text-text-muted text-sm">{post.readTime}</span>
                  <span className="text-text-muted text-sm">•</span>
                  <span className="text-text-muted text-sm">{new Date(post.date).toLocaleDateString()}</span>
                </div>
                
                <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-text-headings leading-tight">
                  {post.title}
                </h1>
                
                <p className="text-xl text-text-muted mb-8 leading-relaxed">
                  {post.excerpt}
                </p>
                
                {/* Author Info */}
                <div className="flex items-center gap-4 p-4 bg-secondary-bg/5 rounded-xl border border-border-subtle">
                  <div className="w-12 h-12 bg-gradient-primary-accent rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">
                      {post.author.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-text-headings">{post.author}</p>
                    <p className="text-sm text-text-muted">Learning Expert</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Article Content */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Featured Image */}
              <div className="mb-12">
                <div className="w-full h-64 bg-gradient-to-br from-primary-accent/20 to-secondary-accent/20 rounded-2xl flex items-center justify-center">
                  <span className="text-6xl">📚</span>
                </div>
              </div>
              
              {/* Article Body */}
              <article className="prose prose-invert prose-lg max-w-none">
                <div 
                  className="text-text-body leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </article>
              
              {/* Tags */}
              <div className="mt-12 pt-8 border-t border-border-subtle">
                <h3 className="text-lg font-semibold mb-4 text-text-headings">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-secondary-bg/5 rounded-full text-sm text-text-muted hover:bg-primary-accent/10 hover:text-primary-accent transition-colors cursor-pointer"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Related Posts */}
        <section className="py-16 bg-primary-bg-secondary">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-text-headings text-center">Related Articles</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {relatedPosts.map((relatedPost) => (
                  <Card key={relatedPost.slug} className="hover:scale-[1.02] transition-transform duration-300">
                    <div className="p-6">
                      <div className="flex items-center gap-4 mb-3">
                        <span className="text-secondary-accent text-sm font-medium">{relatedPost.category}</span>
                        <span className="text-text-muted text-sm">•</span>
                        <span className="text-text-muted text-sm">{relatedPost.readTime}</span>
                      </div>
                      
                      <h3 className="text-xl font-bold mb-3 text-text-headings hover:text-secondary-accent transition-colors">
                        {relatedPost.title}
                      </h3>
                      
                      <p className="text-text-muted mb-4">
                        {relatedPost.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-secondary-accent rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">
                              {relatedPost.author.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-text-headings">{relatedPost.author}</p>
                            <p className="text-xs text-text-muted">{new Date(relatedPost.date).toLocaleDateString()}</p>
                          </div>
                        </div>
                        
                        <Link href={`/resources/${relatedPost.slug}`}>
                          <Button variant="outline" size="sm">
                            Read
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-primary-bg">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4 text-text-headings">
              Ready to Apply What You've Learned?
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
  );
}
