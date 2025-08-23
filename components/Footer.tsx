import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-elevx-navy/50 border-t border-white/4 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-elevx-teal to-elevx-orange flex items-center justify-center text-black font-bold">
                E
              </div>
              <span className="text-xl font-bold">ElevX</span>
            </div>
            <p className="text-elevx-muted mb-4 max-w-md">
              Hyper-personalized, AI-powered micro-lessons for real behavioral change.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-elevx-muted hover:text-elevx-teal transition-colors" aria-label="Twitter">
                🐦
              </a>
              <a href="#" className="text-elevx-muted hover:text-elevx-teal transition-colors" aria-label="LinkedIn">
                💼
              </a>
              <a href="#" className="text-elevx-muted hover:text-elevx-teal transition-colors" aria-label="GitHub">
                📚
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/courses" className="text-elevx-muted hover:text-elevx-teal transition-colors">
                  Courses
                </Link>
              </li>
              <li>
                <Link href="/assessment" className="text-elevx-muted hover:text-elevx-teal transition-colors">
                  Assessment
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-elevx-muted hover:text-elevx-teal transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-elevx-muted hover:text-elevx-teal transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold mb-4">Stay Updated</h3>
            <p className="text-elevx-muted text-sm mb-4">
              Get the latest insights on personalized learning.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-3 py-2 rounded-md bg-white/5 border border-white/10 text-sm focus:outline-none focus:border-elevx-teal/50"
              />
              <button className="px-4 py-2 bg-elevx-teal text-black rounded-md text-sm font-medium hover:bg-elevx-teal/90 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/4 mt-8 pt-8 text-center text-elevx-muted text-sm">
          <p>&copy; 2024 ElevX. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
