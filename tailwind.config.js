/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      boxShadow: ({ theme }) => ({
        'fat-xs': `2px 2px 0 0 ${theme.colors.stone[900]}`,
        fat: `8px 8px 0 0 ${theme.colors.stone[900]}`,
      }),
    },
  },
  plugins: [],
}
