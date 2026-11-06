import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0b0c0b",
        panel: "#151716",
        line: "#363a36",
        muted: "#a3aaa1",
        bone: "#f1eee6",
        acid: "#d4ff5c",
      },
      fontFamily: {
        sans: ["Arial", "Helvetica", "sans-serif"],
        display: ["Arial Narrow", "Impact", "Arial Black", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
