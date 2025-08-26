import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-secondary-bg border-t border-border-subtle mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-primary-accent flex items-center justify-center text-white font-bold shadow-glow-primary">
                E
              </div>
              <span className="text-xl font-bold gradient-text">ElevX</span>
            </div>
            <p className="text-text-muted mb-4 max-w-md">
              Hyper-personalized, AI-powered micro-lessons for real behavioral change.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-text-muted hover:text-secondary-accent transition-colors duration-200" aria-label="Twitter">
                🐦
              </a>
              <a href="#" className="text-text-muted hover:text-secondary-accent transition-colors duration-200" aria-label="LinkedIn">
                💼
              </a>
              <a href="#" className="text-text-muted hover:text-secondary-accent transition-colors duration-200" aria-label="GitHub">
                📚
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4 text-text-headings">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/courses" className="text-text-muted hover:text-secondary-accent transition-colors duration-200">
                  Courses
                </Link>
              </li>
              <li>
                <Link href="/assessment" className="text-text-muted hover:text-secondary-accent transition-colors duration-200">
                  Assessment
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-text-muted hover:text-secondary-accent transition-colors duration-200">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-text-muted hover:text-secondary-accent transition-colors duration-200">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold mb-4 text-text-headings">Stay Updated</h3>
            <p className="text-text-muted text-sm mb-4">
              Get the latest insights on personalized learning.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-3 py-2 rounded-xl bg-secondary-bg border border-border-subtle text-sm text-text-body focus:outline-none focus:border-secondary-accent focus:ring-1 focus:ring-secondary-accent/20 transition-all duration-200"
              />
              <button className="px-4 py-2 bg-gradient-primary-accent text-white rounded-xl text-sm font-medium shadow-glow-primary hover:shadow-glow-primary-hover hover:-translate-y-0.5 transition-all duration-200">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-border-subtle mt-8 pt-8 text-center text-text-muted text-sm">
          <p>&copy; 2024 ElevX. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
