import type { Config } from "tailwindcss";

const config: Omit<Config, "content"> = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["var(--font-montserrat)"],
      },
    },
  },
  plugins: [],
};

export default config;
