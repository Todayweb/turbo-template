import { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config = {
  darkMode: "class",
  safelist: ["dark"],
  content: ["./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      colors: {
        primary: "hsl(var(--primary))",
        error: "hsl(var(--error))",
        success: "hsl(var(--success))",
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;
