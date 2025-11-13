/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx,mdx}",
    "./.storybook/**/*.{js,jsx,ts,tsx,mdx}",
    "../../**/*.{js,jsx,ts,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#1570EF",
          blueHover: "#175CD3",
          red: "#D92D20",
          redHover: "#B42318",
        },
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: true,
  },
};
