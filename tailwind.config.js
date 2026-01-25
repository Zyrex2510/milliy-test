/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,jsx}"
    ],
    theme: {
      extend: {
        backdropBlur: {
          xs: '2px',
        },
        colors: {
          primary: '#2563eb',
        }
      },
    },
    plugins: [],
  }
  