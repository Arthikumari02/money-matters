/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./libs/ui/src/**/*.{js,jsx,ts,tsx}",
    "./libs/dashboard/src/**/*.{js,jsx,ts,tsx}",
    "./libs/dashboard/.storybook/**/*.{js,ts,jsx,tsx,mdx}",
    "./.storybook/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
