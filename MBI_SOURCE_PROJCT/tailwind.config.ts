import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {

      /* ============================================
         BACKGROUND IMAGES
         ============================================ */
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',

        /* Neuromorphic surface gradients */
        'neu-raised': 'linear-gradient(145deg, var(--neu-bg-primary), var(--neu-bg-secondary))',
        'neu-inset':  'linear-gradient(145deg, var(--neu-bg-secondary), var(--neu-bg-primary))',

        /* Brand gradients */
        'neu-primary-gradient': 'linear-gradient(135deg, var(--neu-primary), var(--neu-primary-dark))',
        'neu-success-gradient': 'linear-gradient(135deg, #10b981, #059669)',
        'neu-warning-gradient': 'linear-gradient(135deg, #f59e0b, #d97706)',
        'neu-error-gradient':   'linear-gradient(135deg, #ef4444, #dc2626)',
        'neu-info-gradient':    'linear-gradient(135deg, var(--neu-info), var(--neu-info-dark))',

        /* Progress bar */
        'neu-progress': 'linear-gradient(90deg, var(--neu-primary), hsl(190, 90%, 60%))',
      },

      /* ============================================
         BORDER RADIUS
         ============================================ */
      borderRadius: {
        lg:   'var(--radius)',
        md:   'calc(var(--radius) - 2px)',
        sm:   'calc(var(--radius) - 4px)',
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },

      /* ============================================
         COLORS — Shadcn/ui tokens + Neuromorphic
         ============================================ */
      colors: {
        /* --- Shadcn/ui semantic tokens --- */
        background:  'hsl(var(--background))',
        foreground:  'hsl(var(--foreground))',
        card: {
          DEFAULT:    'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT:    'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT:    'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT:    'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT:    'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT:    'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT:    'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input:  'hsl(var(--input))',
        ring:   'hsl(var(--ring))',

        /* --- Chart tokens --- */
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },

        /* --- Neuromorphic surface tokens --- */
        neu: {
          'bg-primary':   'var(--neu-bg-primary)',
          'bg-secondary': 'var(--neu-bg-secondary)',
          'shadow-dark':  'var(--neu-shadow-dark)',
          'shadow-light': 'var(--neu-shadow-light)',
          primary:        'var(--neu-primary)',
          'primary-dark': 'var(--neu-primary-dark)',
          success:        'var(--neu-success)',
          'success-dark': 'var(--neu-success-dark)',
          warning:        'var(--neu-warning)',
          'warning-dark': 'var(--neu-warning-dark)',
          error:          'var(--neu-error)',
          'error-dark':   'var(--neu-error-dark)',
          info:           'var(--neu-info)',
          'info-dark':    'var(--neu-info-dark)',
        },
      },

      /* ============================================
         BOX SHADOWS — Neuromorphic presets
         ============================================ */
      boxShadow: {
        'neu-raised':    '8px 8px 16px var(--neu-shadow-dark), -8px -8px 16px var(--neu-shadow-light)',
        'neu-raised-sm': '4px 4px 8px var(--neu-shadow-dark), -4px -4px 8px var(--neu-shadow-light)',
        'neu-raised-lg': '12px 12px 24px var(--neu-shadow-dark), -12px -12px 24px var(--neu-shadow-light)',
        'neu-inset':     'inset 4px 4px 8px var(--neu-shadow-dark), inset -4px -4px 8px var(--neu-shadow-light)',
        'neu-inset-sm':  'inset 2px 2px 4px var(--neu-shadow-dark), inset -2px -2px 4px var(--neu-shadow-light)',
        'neu-pressed':   'inset 2px 2px 4px var(--neu-shadow-dark), inset -2px -2px 4px var(--neu-shadow-light)',
        'neu-focus':     '0 0 0 3px var(--neu-primary)',
      },

      /* ============================================
         KEYFRAMES
         ============================================ */
      keyframes: {
        /* Radix accordion */
        'accordion-down': {
          from: { height: '0' },
          to:   { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to:   { height: '0' },
        },

        /* Toast */
        'neu-toast-in': {
          from: { transform: 'translateX(100%)', opacity: '0' },
          to:   { transform: 'translateX(0)',    opacity: '1' },
        },
        'neu-toast-out': {
          from: { transform: 'translateX(0)',    opacity: '1' },
          to:   { transform: 'translateX(100%)', opacity: '0' },
        },

        /* Loading shimmer */
        'neu-shimmer': {
          from: { transform: 'translateX(-100%)' },
          to:   { transform: 'translateX(100%)' },
        },

        /* Skeleton */
        'neu-skeleton': {
          from: { backgroundPosition: '200% 0' },
          to:   { backgroundPosition: '-200% 0' },
        },

        /* Chart bar */
        'neu-grow-up': {
          from: { transform: 'scaleY(0)' },
          to:   { transform: 'scaleY(1)' },
        },

        /* Scroll / marquee */
        scroll: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },

        /* Bounce subtle */
        'bounce-subtle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-8px)' },
        },

        /* Gradient shift */
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%':      { backgroundPosition: '100% 50%' },
        },

        /* Fade in */
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },

        /* Scale in (modal) */
        'scale-in': {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to:   { opacity: '1', transform: 'scale(1)' },
        },

        /* Slow spin */
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to:   { transform: 'rotate(360deg)' },
        },

        /* Float */
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-10px)' },
        },

        /* Pulse glow */
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(0, 170, 230, 0.4)' },
          '50%':      { boxShadow: '0 0 20px 8px rgba(0, 170, 230, 0)' },
        },
      },

      /* ============================================
         ANIMATION UTILITIES
         ============================================ */
      animation: {
        /* Radix */
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up':   'accordion-up 0.2s ease-out',

        /* Neuromorphic */
        'neu-toast-in':    'neu-toast-in 0.3s ease-out forwards',
        'neu-toast-out':   'neu-toast-out 0.3s ease-in forwards',
        'neu-shimmer':     'neu-shimmer 1.5s infinite',
        'neu-skeleton':    'neu-skeleton 1.5s infinite',
        'neu-chart-bar':   'neu-grow-up 0.8s ease-out',

        /* General */
        'bounce-subtle':   'bounce-subtle 2s ease-in-out infinite',
        'gradient':        'gradient 6s ease infinite',
        'scroll':          'scroll 30s linear infinite',
        'fade-in':         'fade-in 0.3s ease-out',
        'scale-in':        'scale-in 0.3s ease-out',
        'spin-slow':       'spin-slow 3s linear infinite',
        'float':           'float 3s ease-in-out infinite',
        'pulse-glow':      'pulse-glow 2s ease-in-out infinite',
      },

      /* ============================================
         TRANSITION DURATIONS
         ============================================ */
      transitionDuration: {
        fast:   'var(--transition-fast)',
        normal: 'var(--transition-normal)',
        slow:   'var(--transition-slow)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;