import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green:   '#0F2F2B',
          ivory:   '#F6F4EE',
          gold:    '#B89A5D',
          gray:    '#D9D9D9',
          charcoal:'#1A1A1A',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body:    ['var(--font-body)',    'Inter',   'sans-serif'],
      },
      fontSize: {
        /*
         * TYPE SCALE — calibrated to match Asset Homes + user spec:
         *   Paragraphs → 20px  |  Nav/UI → 16px
         *   Hero h1 → up to 72px (via clamp in components)
         *   Section h2 → ~36-42px  |  Card h3 → 20-22px
         */

        // ── Hero display (72px) — only for main hero heading ───────────────
        'display':    ['72px',    { lineHeight: '0.95', letterSpacing: '-0.025em' }],

        // ── Section headings (36px) — "FEATURED PROJECTS", "TALES OF TRUST"
        // Asset Homes uses ~36-40px for section titles
        'section':    ['36px',    { lineHeight: '1.05', letterSpacing: '-0.015em' }],

        // ── Card / content headings (22px) — project names, blog titles
        // Keeps cards proportional at any column width
        'heading':    ['22px',    { lineHeight: '1.3',  letterSpacing: '-0.01em'  }],

        // ── Section paragraph text (20px) — user requirement ───────────────
        'body':       ['20px',    { lineHeight: '1.75' }],

        // ── Navigation & UI elements (16px) — user requirement ─────────────
        'ui':         ['16px',    { lineHeight: '1.5'  }],

        // ── Secondary UI (14px) — dropdown items, secondary links ──────────
        'ui-sm':      ['14px',    { lineHeight: '1.5'  }],

        // ── Meta / badge labels (13px) — category pills, eyebrows, CTAs ───
        'label':      ['13px',    { lineHeight: '1.4',  letterSpacing: '0.06em'  }],

        // ── Micro text (11px) — copyright, tiny overlays ─────────────
        'micro':      ['11px',    { lineHeight: '1.3',  letterSpacing: '0.12em'  }],
      },
      letterSpacing: {
        widest2: '0.25em',
        widest3: '0.3em',
      },
      transitionTimingFunction: {
        luxury: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition:  '200% center' },
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.8s ease forwards',
        'fade-in': 'fadeIn 1s ease forwards',
        shimmer:   'shimmer 2.5s linear infinite',
      },
    },
  },
  plugins: [],
}

export default config
