/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: {
          primary: 'var(--background-primary)',
          secondary: 'var(--background-secondary)',
        },
        text: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
        },
        border: {
          default: 'var(--border-color)',
        },
        button: {
          background: 'var(--button-background)',
          hover: 'var(--button-hover)',
        }
      },
      backgroundColor: {
        card: 'var(--card-background)',
        hover: 'var(--hover-background)',
        input: 'var(--input-background)',
      }
    },
  },
  plugins: [],
}