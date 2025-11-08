/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./libs/dashboard/src/**/*.{js,jsx,ts,tsx}",
    "./libs/dashboard/.storybook/preview.{js,ts}",
    "./libs/dashboard/.storybook/*.{js,ts}",
    "./libs/dashboard/src/**/*.stories.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    preflight: true,
  },
}

