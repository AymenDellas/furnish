/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        luxury: ["luxury", "sans-serif"], // 'luxury' is the custom font family name
        poppins: ["poppins", "sans-serif"],
      },
      colors: {
        mainBackground: "#fffcfc", // Previously "primary"
        textColor: "#1E1E1E",
        accentHighlight: "#E5E1DA", // Previously "primaryContent"
        secondaryBackground: "#ffefd0",
        themeAccent: "#89A8B2", // Previously "theme"
        buttonBackground: "#264653", // Previously "actions"
      },
    },
  },
  plugins: [],
};
