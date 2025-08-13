/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'haru-blue': {
          500: '#56BBE2', // Main color
          600: '#4AA8D1',
        },
      },
    },
  },
  plugins: [],
};
