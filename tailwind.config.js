/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.html", "./**/*.templ", "./**/*.go"],
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
        primary: 'var(--primary)',
        'primary-hover': 'var(--primary-hover)',

        secondary: 'var(--secondary)',
        'secondary-hover': 'var(--secondary-hover)',

        contrast: 'var(--contrast)',
        border: 'var(--border)',
        borderlite: 'var(--border-secondary)',
        accent: 'var(--accent)',
        'accent-hover': 'var(--accent-hover)',
        success: 'var(--success)',
        'success-hover': 'var(--success-hover)',
        info: 'var(--info)',
        'info-hover': 'var(--info-hover)',
        error: 'var(--error)',
        'error-hover': 'var(--error-hover)',
        default: 'var(--text-default)',
        heading: 'var(--text-heading)',
        muted: 'var(--text-muted)',
        button: 'var(--text-button)',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      transitionDuration: {
        2000: "2000ms",
        3000: "3000ms",
        4000: "4000ms",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require('@tailwindcss/typography')],
}

