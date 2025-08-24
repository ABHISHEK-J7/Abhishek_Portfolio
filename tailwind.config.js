/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "var(--color-border)", /* subtle-definition */
        input: "var(--color-input)", /* input-border */
        ring: "var(--color-ring)", /* electric-blue */
        background: "var(--color-background)", /* deep-space-foundation */
        foreground: "var(--color-foreground)", /* white */
        surface: {
          DEFAULT: "var(--color-surface)", /* floating-element-depth */
          foreground: "var(--color-surface-foreground)", /* white */
        },
        primary: {
          DEFAULT: "var(--color-primary)", /* electric-blue */
          foreground: "var(--color-primary-foreground)", /* white */
        },
        secondary: {
          DEFAULT: "var(--color-secondary)", /* technical-achievement */
          foreground: "var(--color-secondary-foreground)", /* deep-space-foundation */
        },
        destructive: {
          DEFAULT: "var(--color-destructive)", /* problem-identification */
          foreground: "var(--color-destructive-foreground)", /* white */
        },
        muted: {
          DEFAULT: "var(--color-muted)", /* muted-surface */
          foreground: "var(--color-muted-foreground)", /* text-secondary */
        },
        accent: {
          DEFAULT: "var(--color-accent)", /* creative-vision */
          foreground: "var(--color-accent-foreground)", /* white */
        },
        popover: {
          DEFAULT: "var(--color-popover)", /* floating-element-depth */
          foreground: "var(--color-popover-foreground)", /* white */
        },
        card: {
          DEFAULT: "var(--color-card)", /* floating-element-depth */
          foreground: "var(--color-card-foreground)", /* white */
        },
        success: {
          DEFAULT: "var(--color-success)", /* technical-achievement */
          foreground: "var(--color-success-foreground)", /* deep-space-foundation */
        },
        warning: {
          DEFAULT: "var(--color-warning)", /* attention-indicator */
          foreground: "var(--color-warning-foreground)", /* deep-space-foundation */
        },
        error: {
          DEFAULT: "var(--color-error)", /* problem-identification */
          foreground: "var(--color-error-foreground)", /* white */
        },
        conversion: {
          DEFAULT: "var(--color-conversion)", /* energetic-orange */
          foreground: "var(--color-conversion-foreground)", /* white */
        },
        brand: {
          primary: "var(--color-brand-primary)", /* brand-foundation */
          secondary: "var(--color-brand-secondary)", /* elevated-surface */
        },
        trust: "var(--color-trust-builder)", /* technical-achievement */
        canvas: "var(--color-canvas)", /* pure-dark */
        text: {
          primary: "var(--color-text-primary)", /* white */
          secondary: "var(--color-text-secondary)", /* clear-hierarchy */
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'hero': ['3rem', { lineHeight: '1.1', fontWeight: '700' }],
        'display': ['2.5rem', { lineHeight: '1.2', fontWeight: '700' }],
        'heading': ['2rem', { lineHeight: '1.3', fontWeight: '600' }],
        'subheading': ['1.5rem', { lineHeight: '1.4', fontWeight: '600' }],
        'body': ['1rem', { lineHeight: '1.6', fontWeight: '400' }],
        'caption': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }],
        'small': ['0.75rem', { lineHeight: '1.4', fontWeight: '400' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        'cosmic': '12px',
        'node': '16px',
      },
      boxShadow: {
        'cosmic': '0 0 20px rgba(0, 102, 255, 0.3)',
        'talent-node': '0 8px 32px rgba(0, 102, 255, 0.15)',
        'surface': '0 4px 16px rgba(255, 255, 255, 0.05)',
        'particle': '0 0 10px rgba(0, 255, 136, 0.4)',
        'conversion': '0 0 15px rgba(255, 107, 53, 0.4)',
        'glow-sm': '0 0 10px rgba(0, 102, 255, 0.2)',
        'glow-md': '0 0 20px rgba(0, 102, 255, 0.3)',
        'glow-lg': '0 0 30px rgba(0, 102, 255, 0.4)',
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'particle': 'particle-float 4s ease-in-out infinite',
        'spin-slow': 'spin 3s linear infinite',
        'bounce-slow': 'bounce 2s infinite',
      },
      backdropBlur: {
        'cosmic': '8px',
      },
      transitionTimingFunction: {
        'cosmic': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'spatial': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
      },
      perspective: {
        '1000': '1000px',
        '1500': '1500px',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    function({ addUtilities }) {
      const newUtilities = {
        '.perspective-1000': {
          perspective: '1000px',
        },
        '.perspective-1500': {
          perspective: '1500px',
        },
        '.preserve-3d': {
          'transform-style': 'preserve-3d',
        },
        '.backface-hidden': {
          'backface-visibility': 'hidden',
        },
        '.text-gradient-primary': {
          background: 'linear-gradient(135deg, #0066FF, #00FF88)',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          'background-clip': 'text',
        },
        '.text-gradient-accent': {
          background: 'linear-gradient(135deg, #8B5CF6, #FF6B35)',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          'background-clip': 'text',
        },
        '.cosmic-backdrop': {
          'backdrop-filter': 'blur(8px)',
          background: 'rgba(26, 26, 46, 0.8)',
        },
        '.glass-effect': {
          'backdrop-filter': 'blur(12px)',
          background: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        },
      }
      addUtilities(newUtilities)
    }
  ],
}