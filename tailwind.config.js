/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // NEW BRAND SYSTEM - Dark Mode Default
        'primary-bg': '#0D1117',         // Primary Background
        'secondary-bg': '#161B22',       // Secondary Background / Cards
        'primary-accent': '#FF6A3D',     // Primary Accent (Action/CTA)
        'secondary-accent': '#00D8D8',   // Secondary Accent (Links/Highlights)
        
        // Text Colors
        'text-headings': '#FFFFFF',      // Headings
        'text-body': '#C9D1D9',          // Body Text
        'text-muted': '#8B949E',         // Muted Text / Subtle Labels
        
        // Border and subtle elements
        'border-subtle': 'rgba(139, 148, 158, 0.1)', // Subtle borders
        
        // Status colors (keeping existing)
        'status-error': '#FF4D4D',
        'status-success': '#4ADE80',
        

      },
      boxShadow: {
        // NEW BRAND SYSTEM - Glow effects
        'glow-primary': '0 8px 30px rgba(255,106,61,0.15)',    // Primary accent glow
        'glow-secondary': '0 8px 30px rgba(0,216,216,0.15)',   // Secondary accent glow
        'glow-primary-hover': '0 12px 40px rgba(255,106,61,0.25)',   // Primary hover glow
        'glow-secondary-hover': '0 12px 40px rgba(0,216,216,0.25)',  // Secondary hover glow
        

      },
      backgroundImage: {
        // NEW BRAND SYSTEM - Exact Gradients
        'gradient-primary-bg': 'linear-gradient(135deg, #0D1117 0%, #161B22 100%)', // Background gradient
        'gradient-primary-accent': 'linear-gradient(135deg, #FF6A3D 0%, #FF8F66 100%)', // Gradient 1: glowing orange
        'gradient-secondary-accent': 'linear-gradient(135deg, #00D8D8 0%, #29FFE3 100%)', // Gradient 2: aqua neon glow
        'gradient-hero': 'linear-gradient(180deg, #0D1117 0%, #161B22 50%, #0D1117 100%)', // Hero section gradient
        

      }
    }
  },
  plugins: []
}
